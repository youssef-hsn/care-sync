import { Input } from "@/components/atoms/input";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/button";
import { Unlink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/tooltip";
import { Machine, MachineUsage } from "caresync/types/machine";
import { CreateMachineForm } from "../../../../components/common/forms/create-machine";


export const MachinesSection = ({onChange}: {onChange: ({meta, machines}: {meta: {total: Number}, machines: MachineUsage[]}) => void}) => {
    const [machines, setMachines] = useState<MachineUsage[]>([
        { machine: null, reason: "", amount: 0 }
    ]);
    const total = useRef(0);


    const handleMachineChange = (index: number, machine: MachineUsage) => {
        setMachines(
            machines => {
                const newMachines = [...machines];
                newMachines[index] = machine;
                return newMachines;
            }
        )
    }

    const addMachine = () => {
        setMachines(
            machines => {
                const newMachines = [...machines];
                newMachines.push({ machine: null, reason: "", amount: 0 });
                return newMachines;
            }
        )
    }

    const handleDeleteMachine = (index: number) => {
        setMachines(
            machines => {
                const newMachines = [...machines];
                newMachines.splice(index, 1);
                return newMachines;
            }
        )
    }

    useEffect(() => {
        onChange({
            meta: {total: total.current},
            machines
        });
        if (machines.filter(machine => machine.machine === null).length === 0) {
            addMachine();
        }

    }, [machines]);

    return (
        <div className="flex flex-col gap-2 mb-10">
            {machines.map((machine, index) => (
                <div className="flex flex-row gap-2 items-center justify-between" key={`machine-${index}`}>
                    <DropdownInput<Machine>
                        endpoint="/machine"
                        onSelect={(value) => handleMachineChange(index, { 
                            machine: value, 
                            reason: machines[index].reason,
                            amount: 0
                        })}
                        onClear={() => handleDeleteMachine(index)}
                        placeholder="Select Machine"
                        ItemDisplay={({ name, model, manufacturer, price }) => 
                            <div className="cursor-pointer">
                            <Tooltip>
                                <TooltipTrigger className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div>{name}</div>
                                        <div className="text-sm text-muted-foreground">${price}</div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {model} [{manufacturer}]
                                </TooltipContent>
                            </Tooltip>
                            </div>
                        }
                        CreateNewForm={CreateMachineForm}
                    />
                    <Input
                        value={machine.reason}
                        onChange={(e) => {
                            const newMachine = machines[index];
                            newMachine.reason = e.target.value;
                            setMachines(machines => {
                                const newMachines = [...machines];
                                newMachines[index] = newMachine;
                                return newMachines;
                            })
                        }}
                        placeholder="Reason"
                        type="textarea"
                        className="w-1/2"
                    />
                    {index !== (machines.length - 1) && <Button
                        variant="outline"
                        className="w-fit"
                        onClick={() => handleDeleteMachine(index)}
                    >
                        <Unlink />
                    </Button>}
                    <Input
                        disabled={!machine.machine}
                        onChange={(e) => {
                            const newMachine = machines[index];
                            newMachine.amount = Number(e.target.value);
                            setMachines(machines => {
                                const newMachines = [...machines];
                                newMachines[index] = newMachine;
                                return newMachines;
                            })
                        }}
                        placeholder="Amount"
                        type="number"
                        className="w-1/9"
                    />
                </div>)
            )}
            <div className="flex flex-row gap-2 items-center justify-end">
                <span>Total</span>
                <span className="w-1/8 text-right">{`$(${machines.reduce((acc, curr) => {
                    if (curr.machine && curr.amount) {
                        return acc + curr.amount
                    }
                    total.current = acc;
                    return acc;
                }, 0)})`}</span>
            </div>

        </div>
    )
}