import { allergyCaseSchema } from "caresync/validations/allergy.schema";
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
import { CreateAllergyForm } from "./create-allergy";
import { Input } from "@/components/atoms/input";
import { DatePicker } from "@/components/atoms/date-input";


export const RegisterAllergyForm = ({onComplete, clientID}: {onComplete: () => void, clientID: number}) => {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof allergyCaseSchema>>({
        resolver: zodResolver(allergyCaseSchema),
        defaultValues: {
            allergy: "",
            reaction: "",
            severity: "mild",
            note: "",
            discoveryDate: new Date().toISOString(),
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof allergyCaseSchema>) => {
            return api.post(`/client/${clientID}/allergy`, data);
        },
        onSuccess: () => {
            toast.success("Illness registered successfully");
            queryClient.invalidateQueries({ queryKey: ["Allergies", clientID] });
            onComplete();
        },
        onError: () => {
            toast.error("Failed to register illness");
        }
    });


    const onSubmit = (data: z.infer<typeof allergyCaseSchema>) => {
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
                name="allergy"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <DropdownInput
                                className="w-full"
                                endpoint="allergy"
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
                                    return <CreateAllergyForm onComplete={onComplete} />
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Severity</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mild">Mild</SelectItem>
                                    <SelectItem value="moderate">Moderate</SelectItem>
                                    <SelectItem value="severe">Severe</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="reaction"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reaction</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="discoveryDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Discovery Date</FormLabel>
                        <FormControl>
                            <DatePicker onSelect={(date) => {
                                field.onChange(date.toISOString());
                            }} />
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