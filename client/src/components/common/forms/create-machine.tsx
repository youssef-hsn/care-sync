import { useForm } from "react-hook-form";
import { z } from "zod";
import { machineSchema } from "caresync/validations/machine.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";


export const CreateMachineForm = ({onComplete}: {onComplete: () => void}) => {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof machineSchema>>({
        resolver: zodResolver(machineSchema),
        defaultValues: {
            name: "",
            manufacturer: "",
            model: "",
            price: 0,
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof machineSchema>) => {
            return api.post("/machine", data);
        },
    });


    const onSubmit = (data: z.infer<typeof machineSchema>) => {
        createService(data);
        queryClient.invalidateQueries({ queryKey: ["Machines"] });
        toast.success("Machine created successfully");
        onComplete();
    }
    return (
        <Form {...form} >
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
        }} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manufacturer</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input {...field} onChange={(e) => {
                                    field.onChange(Number(e.target.value));
                                }} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create Machine</Button>
        </form>
            </Form>
    )
}