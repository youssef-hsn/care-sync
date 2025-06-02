import { useForm } from "react-hook-form";
import { z } from "zod";
import { prescriptionSchema } from "caresync/validations/prescription.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { DatePicker } from "@/components/atoms/date-input";
import { useIdentityStore } from "@/lib/stores/identity.store";


export const CreatePrescriptionForm = ({clientID, onComplete}: {clientID: number, onComplete: () => void}) => {
    const { id } = useIdentityStore()
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof prescriptionSchema>>({
        resolver: zodResolver(prescriptionSchema),
        defaultValues: {
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            status: "active",
            instructions: "",
            doctorID: id,
        },
    });

    const { mutate: createPrescription } = useMutation({
        mutationFn: (data: z.infer<typeof prescriptionSchema>) => {
            return api.post(`/client/${clientID}/prescription`, data);
        },
        onSuccess: () => {
            toast.success("Prescription created successfully");
            queryClient.invalidateQueries({ queryKey: ["Prescriptions", clientID] });
            onComplete();
        },
        onError: () => {
            toast.error("Failed to create prescription");
        }
    });


    const onSubmit = (data: z.infer<typeof prescriptionSchema>) => {
        createPrescription(data);
    form.reset();
    }
    return (
        <Form {...form} >
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
        }} className="space-y-8">
            <FormField
                control={form.control}
                name="medicationID"
                render={({ field }) => (
                        <FormItem>
                            <FormLabel>Medication</FormLabel>
                            <FormControl>
                                <DropdownInput
                                    endpoint="medications"
                                    onSelect={(value) => field.onChange(Number(value.medicationID))}
                                    ItemDisplay={(item: any) => <div>{item.medication} {item.dosage}</div>}
                                    className="w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                            <DatePicker onSelect={(date) => field.onChange(date.toISOString())} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                            <DatePicker onSelect={(date) => field.onChange(date.toISOString())} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Create Prescription</Button>
        </form>
    </Form>
    )
}