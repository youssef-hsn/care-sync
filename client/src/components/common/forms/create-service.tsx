import { useForm } from "react-hook-form";
import { z } from "zod";
import { createServiceSchema } from "caresync/validations/bill.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";


export const CreateServiceForm = ({onComplete}: {onComplete: () => void}) => {

    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            associateShare: 0,
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof createServiceSchema>) => {
            return api.post("/service", data);
        },
    });


    const onSubmit = (data: z.infer<typeof createServiceSchema>) => {
        createService(data);
        toast.success("Service created successfully");
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
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
                                    form.setValue("associateShare", Number(e.target.value) * 0.2);
                                }} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="associateShare"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Associate Share</FormLabel>
                            <FormControl>
                                <Input {...field} onChange={(e) => {
                                    field.onChange(Number(e.target.value));
                                }} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create Service</Button>
        </form>
            </Form>
    )
}