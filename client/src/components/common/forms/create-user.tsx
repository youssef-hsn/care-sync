import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "caresync/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";


export const CreateUserForm = ({onComplete}: {onComplete: () => void}) => {

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof userSchema>) => {
            return api.post("/users", data);
        },
    });


    const onSubmit = (data: z.infer<typeof userSchema>) => {
        createService(data);
        toast.success("User created successfully");
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
                name="firstName"
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
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} onChange={(e) => {
                                    field.onChange(e.target.value);
                                }} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create User</Button>
        </form>
            </Form>
    )
}