import { FC } from "react";
import { Input } from "@/components/atoms/input";
import {
FormControl,
FormItem,
FormLabel,
FormMessage,
} from "@/components/atoms/form";
import { PasswordInput } from "./password-input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label: string;
placeholder?: string;
type?: string;
}

export const FormInput: FC<FormInputProps> = ({
    label,
    placeholder,
    type = "text",
    ...inputProps
}) => {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input type={type} placeholder={placeholder} {...inputProps} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
};

export const FormPassword: FC<FormInputProps> = ({
    label,
    placeholder,
    ...inputProps
}) => {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <PasswordInput placeholder={placeholder} {...inputProps} />    
            </FormControl>
            <FormMessage />
        </FormItem>
    )
};