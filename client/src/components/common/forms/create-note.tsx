import { useForm } from "react-hook-form";
import { z } from "zod";
import { recordSchema } from "caresync/validations/record.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";


export const CreateNoteForm = ({onComplete, clientID}: {onComplete: () => void, clientID: number}) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof recordSchema>>({
        resolver: zodResolver(recordSchema),
        defaultValues: {
            title: "",
            details: "",
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof recordSchema>) => {
            return api.post(`/client/${clientID}/records`, data);
        },
        onSuccess: () => {
            toast.success("Record registered successfully");
            queryClient.invalidateQueries({ queryKey: ["Notes", clientID] });
            onComplete();
        },
        onError: () => {
            toast.error("Failed to register record");
        }
    });


    const onSubmit = (data: z.infer<typeof recordSchema>) => {
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
                name="title"
                render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create Note</Button>
        </form>
    </Form>
    )
}