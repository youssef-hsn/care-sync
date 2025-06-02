import { Input } from "@/components/atoms/input";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { BillDetail, Service } from "caresync/types/bill";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/button";
import { TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/tooltip";
import { CreateServiceForm } from "../../../../components/common/forms/create-service";


export const ServicesSection = ({onChange, onServiceSelect}: {onServiceSelect: (value: Service) => void, onChange: ({meta, services}: {meta: {total: Number}, services: BillDetail[]}) => void}) => {
    const [services, setServices] = useState<BillDetail[]>([
        { service: null, reason: "", amount: 0 }
    ]);
    const total = useRef(0);

    const handleServiceChange = (index: number, service: BillDetail) => {
        total.current = Number(total.current) - Number(services[index].amount) + Number(service.amount);
        setServices(
            services => {
                const newServices = [...services];
                newServices[index] = service;
                return newServices;
            }
        )
        if (service.service) {
            onServiceSelect(service.service);
        }
    }

    const addService = () => {
        setServices(
            services => {
                const newServices = [...services];
                newServices.push({ service: null, reason: "", amount: 0 });
                return newServices;
            }
        )
    }

    const handleDeleteService = (index: number) => {
        total.current = Number(total.current) - Number(services[index].amount);
        setServices(
            services => {
                const newServices = [...services];
                newServices.splice(index, 1);
                return newServices;
            }
        )
    }

    useEffect(() => {
        onChange({
            meta: {total: total.current},
            services
        });
        if (services.filter(service => service.service === null).length === 0) {
            addService();
        } 
    }, [services]);

    return (
        <div className="flex flex-col gap-2 mb-10">
            {services.map((service, index) => (
                <div className="flex flex-row gap-2 items-center justify-between" key={`service-${index}`}>
                    <DropdownInput<Service>
                        endpoint="/service"
                        onSelect={(value) => handleServiceChange(index, { 
                            service: value, 
                            reason: services[index].reason, 
                            amount: value.price 
                        })}
                        onClear={() => handleDeleteService(index)}
                        placeholder="Select Service"
                        ItemDisplay={({ name, description, price }) => 
                            <div className="cursor-pointer">
                            <Tooltip>
                                <TooltipTrigger className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div>{name}</div>
                                        <div className="text-sm text-muted-foreground">${price}</div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {description}
                                </TooltipContent>
                            </Tooltip>
                            </div>
                        }
                        CreateNewForm={CreateServiceForm}
                    />
                    <Input
                        value={service.reason}
                        onChange={(e) => {
                            const newService = services[index];
                            newService.reason = e.target.value;
                            setServices(services => {
                                const newServices = [...services];
                                newServices[index] = newService;
                                return newServices;
                            })
                        }}
                        placeholder="Reason"
                        type="textarea"
                        className="w-1/2"
                    />
                    {index !== (services.length - 1) && <Button
                        variant="outline"
                        className="w-fit"
                        onClick={() => handleDeleteService(index)}
                    >
                        <TrashIcon />
                    </Button>}
                    <Input
                        value={services[index].amount}
                        onChange={(e) => {
                            total.current = Number(total.current) - Number(services[index].amount) + Number(e.target.value);
                            const newService = services[index];
                            newService.amount = Number(e.target.value);

                            setServices(services => {
                                const newServices = [...services];
                                newServices[index] = newService;
                                return newServices;
                            })
                        }}
                        placeholder="Amount"
                        type="number"
                        className="w-1/8"
                    />
                </div>)
            )}
            <div className="flex flex-row gap-2 items-center justify-end">
                <span>Total</span>
                <span className="w-1/8 text-right">{`$${total.current}`}</span>
            </div>
        </div>
    )
}