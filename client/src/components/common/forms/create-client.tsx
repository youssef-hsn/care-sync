import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientSchema } from "caresync/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { User } from "caresync/types/user";
import { PersonCard } from "../../../pages/app/finance/components/cards/person-card";


export const CreateClientForm = ({onComplete}: {onComplete: () => void}) => {

    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
        },
    });

    const { mutate: createService } = useMutation({
        mutationFn: (data: z.infer<typeof clientSchema>) => {
            return api.post("/client", data);
        },
    });


    const onSubmit = (data: z.infer<typeof clientSchema>) => {
        createService(data);
        toast.success("Client created successfully");
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

                <FormField
                    control={form.control}
                    name="responsibleId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Responsible</FormLabel>
                            <FormControl>
                                <DropdownInput<User>
                                    endpoint="/users"
                                    onSelect={(value: User) => {
                                        field.onChange(value.userID);
                                    }}
                                    ItemDisplay={({ firstName, lastName, phone }) => {
                                        return <PersonCard fullName={`${firstName} ${lastName}`} phone={phone} />
                                    }}
                                    className="w-3/4"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create Client</Button>
        </form>
            </Form>
    )
}