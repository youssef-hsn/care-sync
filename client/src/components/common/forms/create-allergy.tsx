import { useForm } from "react-hook-form";
import { z } from "zod";
import { allergySchema } from "caresync/validations/allergy.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const CreateAllergyForm = ({onComplete}: {onComplete: () => void}) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof allergySchema>>({
        resolver: zodResolver(allergySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const { mutate: createAllergy } = useMutation({
        mutationFn: (data: z.infer<typeof allergySchema>) => {
            return api.post("/allergy", data);
        },
    });


    const onSubmit = (data: z.infer<typeof allergySchema>) => {
        createAllergy(data);
        queryClient.invalidateQueries({ queryKey: ["Allergies"] });
        toast.success("Allergy registered successfully");
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
            <Button type="submit">Create Allergy</Button>
        </form>
    </Form>
    )
}