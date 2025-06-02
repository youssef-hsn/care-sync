import { diagnosisSchema } from "caresync/validations/illness.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { Tooltip } from "@/components/atoms/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/atoms/tooltip";
import { TooltipProvider } from "@/components/atoms/tooltip";
import { CreateIllnessForm } from "./create-illness";


export const CreateDiagnosisForm = ({onComplete, clientID}: {onComplete: () => void, clientID: number}) => {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof diagnosisSchema>>({
        resolver: zodResolver(diagnosisSchema),
        defaultValues: {
            illnessName: "",
            status: "active"
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof diagnosisSchema>) => {
            return api.post(`/client/${clientID}/diagnosis`, data);
        },
        onSuccess: () => {
            toast.success("Illness registered successfully");
            queryClient.invalidateQueries({ queryKey: ["Illness History", clientID] });
            onComplete();
        },
        onError: () => {
            toast.error("Failed to register illness");
        }
    });


    const onSubmit = (data: z.infer<typeof diagnosisSchema>) => {
        createService(data);
    }
    return (
        <Form {...form} >
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
        }} className="space-y-8">
            <FormField
                control={form.control}
                name="illnessName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <DropdownInput
                                className="w-full"
                                endpoint="illness"
                                onSelect={(value: any) => {
                                    field.onChange(value.name);
                                }}
                                ItemDisplay={(value) => {

                                    return <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="flex flex-col gap-2">
                                                    <p>{value.name}</p>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{value.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                }}
                                CreateNewForm={({onComplete}) => {
                                    return <CreateIllnessForm onComplete={onComplete} />
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="recovered">Recovered</SelectItem>
                                    <SelectItem value="chronic">Chronic</SelectItem>
                                    <SelectItem value="under_treatment">Under Treatment</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Create Illness</Button>
        </form>
    </Form>
    )
}