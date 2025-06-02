import { useForm } from "react-hook-form";
import { z } from "zod";
import { illnessSchema } from "caresync/validations/illness.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";


export const CreateIllnessForm = ({onComplete}: {onComplete: () => void}) => {

    const form = useForm<z.infer<typeof illnessSchema>>({
        resolver: zodResolver(illnessSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof illnessSchema>) => {
            return api.post("/illness", data);
        },
    });


    const onSubmit = (data: z.infer<typeof illnessSchema>) => {
        createService(data);
        toast.success("Illness registered successfully");
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
                <Button type="submit">Create Illness</Button>
        </form>
    </Form>
    )
}