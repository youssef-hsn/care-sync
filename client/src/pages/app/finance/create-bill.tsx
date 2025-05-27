import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { billSchema } from "caresync/validations/bill.schema";
import { z } from "zod";
import { DropdownInput } from "@/components/organisms/dropdown-input";
import { Client } from "caresync/types/client";
import { Button } from "@/components/atoms/button";
import { ServicesSection } from "./components/services-section";
import { MachinesSection } from "./components/machines-sections";
import { BeneficiariesSection } from "./components/beneficiaries-section";
import { CreateClientForm } from "../../../components/common/forms/create-client";
import { PersonCard } from "./components/cards/person-card";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/atoms/dialog";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";

export default function CreateBillPage() {
    const navigate = useNavigate();
    const { t } = useTranslation("finance");

    const form = useForm<z.infer<typeof billSchema>>({
        resolver: zodResolver(billSchema),
        defaultValues: {
            appointmentID: 1,
            clientID: 0,
            total: 0,
            services: [],
        },
    });

    const { mutate: createBill } = useMutation({
        mutationFn: (data: z.infer<typeof billSchema>) => {
            return api.post("/finance/bill", data);
        },
        onSuccess: () => {
            toast.success(t('bills.created'));
            navigate("/clients/bills", { replace: true });
        },
        onError: (error: any) => {
            const m = JSON.parse(error.response.data.message);
            m.forEach((message: any) => {
                toast.error(message.message);
            }); 
        },
    });

    return (
        <Card className="m-1">
            <CardHeader>
                <CardTitle>{t('bills.createBill')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <FormField
                        control={form.control}
                        name="clientID"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('bill.client')}</FormLabel>
                            <DropdownInput<Client>
                                    endpoint="/client"
                                    onSelect={(value) => field.onChange(value.clientID)}
                                    ItemDisplay={({ firstName, lastName, phone }) => {
                                        return (
                                            <PersonCard fullName={`${firstName} ${lastName}`} phone={phone} />
                                        );
                                    } }
                                    CreateNewForm={(  ) => {
                                        return (
                                            <CreateClientForm onComplete={() => {}} />
                                        )
                                    }}
                                    className="mb-4"/>
                                    <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="services"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('bill.services')}</FormLabel>
                                <ServicesSection onChange={(e) => {
                                    form.setValue("total", Number(e.meta.total));
                                    field.onChange(e.services.filter((service) => Boolean(service.service)).map((service) => ({
                                        serviceID: service.service?.serviceID,
                                        reason: service.reason,
                                        amount: Number(service.amount),
                                    })));
                                }} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="machines"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('bill.machines')}</FormLabel>
                                <MachinesSection onChange={(e) => {
                                    field.onChange(e.machines.filter((machine) => Boolean(machine.machine)).map((machine) => ({
                                        machineID: machine.machine?.machineId,
                                        reason: machine.reason,
                                        amount: Number(machine.amount),
                                    })));
                                }} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="beneficiaries"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('bill.beneficiaries')}</FormLabel>
                                <BeneficiariesSection onChange={(e) => {
                                    field.onChange(e.beneficiaries.filter((beneficiary) => Boolean(beneficiary.user)).map((beneficiary) => ({
                                        userID: beneficiary.user?.userID,
                                        reason: beneficiary.reason,
                                        amount: Number(beneficiary.amount),
                                    })));
                                }} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('bill.status')}</FormLabel>
                                <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('bill.status')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full"
                        onClick={() => {
                            createBill({
                                ...form.getValues(),
                                total: Number(form.getValues().total),
                            });
                        }}
                    >
                        {t('bills.createBill')}
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
}