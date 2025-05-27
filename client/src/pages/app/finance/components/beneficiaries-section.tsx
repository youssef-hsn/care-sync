import { Input } from "@/components/atoms/input";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/button";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/tooltip";
import { User, Share } from "caresync/types/user";
import { CreateMachineForm } from "../../../../components/common/forms/create-machine";
import { CreateUserForm } from "../../../../components/common/forms/create-user";


export const BeneficiariesSection = ({onChange}: {onChange: ({meta, beneficiaries}: {meta: {total: Number}, beneficiaries: Share[]}) => void}) => {
    const [beneficiaries, setBeneficiaries] = useState<Share[]>([
        { amount: 0, reason: "" }
    ]);
    const total = useRef(0);


    const handleBeneficiaryChange = (index: number, beneficiary: Share) => {
        setBeneficiaries(
            beneficiaries => {
                const newBeneficiaries = [...beneficiaries];
                newBeneficiaries[index] = beneficiary;
                return newBeneficiaries;
            }
        )
    }

    const addBeneficiary = () => {
        setBeneficiaries(
            beneficiaries => {
                const newBeneficiaries = [...beneficiaries];
                newBeneficiaries.push({ amount: 0, reason: "" });
                return newBeneficiaries;
            }
        )
    }

    const handleDeleteBeneficiary = (index: number) => {
        setBeneficiaries(
            beneficiaries => {
                const newBeneficiaries = [...beneficiaries];
                newBeneficiaries.splice(index, 1);
                return newBeneficiaries;
            }
        )
    }

    useEffect(() => {
        onChange({
            meta: {total: total.current},
            beneficiaries
        });
        if (beneficiaries.filter(beneficiary => beneficiary.user == null).length === 0) {
            addBeneficiary();
        }
    }, [beneficiaries]);

    return (
        <div className="flex flex-col gap-2 mb-10">
            {beneficiaries.map((beneficiary, index) => (
                <div className="flex flex-row gap-2 items-center justify-between" key={`beneficiary-${index}`}>
                    <DropdownInput<User>
                        endpoint="/users"
                        onSelect={(value) => handleBeneficiaryChange(index, { 
                            user: value, 
                            reason: beneficiaries[index].reason,
                            amount: 0
                        })}
                        onClear={() => handleDeleteBeneficiary(index)}
                        placeholder="Select Beneficiary"
                        ItemDisplay={({ firstName, lastName, phone, address, city }) => 
                            <div className="cursor-pointer">
                            <Tooltip>
                                <TooltipTrigger className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div>{firstName} {lastName}</div>
                                        <div className="text-sm text-muted-foreground">[{phone}]</div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {address} [{city}]
                                </TooltipContent>
                            </Tooltip>
                            </div>
                        }
                        CreateNewForm={CreateUserForm}
                    />
                    <Input
                        value={beneficiary.amount}
                        onChange={(e) => {
                            const newBeneficiary = beneficiaries[index];
                            newBeneficiary.reason = e.target.value;
                            setBeneficiaries(beneficiaries => {
                                const newBeneficiaries = [...beneficiaries];
                                newBeneficiaries[index] = newBeneficiary;
                                return newBeneficiaries;
                            })
                        }}
                        placeholder="Reason"
                        type="textarea"
                        className="w-1/2"
                    />
                    <Input
                        disabled={!beneficiary.user}
                        onChange={(e) => {
                            const newBeneficiary = beneficiaries[index];
                            newBeneficiary.amount = Number(e.target.value);
                            setBeneficiaries(beneficiaries => {
                                const newBeneficiaries = [...beneficiaries];
                                newBeneficiaries[index] = newBeneficiary;
                                return newBeneficiaries;
                            })
                        }}
                        placeholder="Amount"
                        type="number"
                        className="w-1/9"
                    />
                    {index !== (beneficiaries.length - 1) && <Button
                        variant="outline"
                        className="w-fit"
                        onClick={() => handleDeleteBeneficiary(index)}
                    >
                        <Trash2 />
                    </Button>}
                </div>)
            )}
            <div className="flex flex-row gap-2 items-center justify-end">
                <span>Total</span>
                <span className="w-1/8 text-right">{`$(${beneficiaries.reduce((acc, curr) => {
                    if (curr.user && curr.amount) {
                        return acc + curr.amount
                    }
                    total.current = acc;
                    return acc;
                }, 0)})`}</span>
            </div>

        </div>
    )
}