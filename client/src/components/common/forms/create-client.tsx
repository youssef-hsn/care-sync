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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";


export const CreateClientForm = ({onComplete}: {onComplete: () => void}) => {

    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            bloodType: undefined,
        },
    });

    const { mutate: createClient } = useMutation({
        mutationFn: (data: z.infer<typeof clientSchema>) => {
            return api.post("/client", { client: data });
        },
        onSuccess: () => {
            toast.success("Client created successfully");
            onComplete();
        },
        onError: (error) => {
            const m = JSON.parse(error.response.data.message);
            m.forEach((message: any) => {
                toast.error(message.path[0] + " " + message.message);
            });
        },
    });


    const onSubmit = (data: z.infer<typeof clientSchema>) => {
        createClient(data);
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
                    name="bloodType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Type</FormLabel>
                            <FormControl>
                                <Select
                                    name="bloodType"
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    value={field.value || ""}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a blood type" className="w-fit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bloodType) => (
                                            <SelectItem key={bloodType} value={bloodType}>{bloodType}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                }} type="email" required={false}/>
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
                            <FormControl
                            >
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