import { FC, useState } from "react";
import { Input } from "@/components/atoms/input";
import {
FormControl,
FormItem,
FormLabel,
FormMessage,
} from "@/components/atoms/form";
import PasswordStrength from "../atoms/password-strength";
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

interface FormPasswordProps extends FormInputProps {
    strengthLabels?: string[];
}

export const FormPassword: FC<FormPasswordProps> = ({
    label,
    placeholder,
    value: propValue,
    onChange: propOnChange,
    strengthLabels,
    ...inputProps
}) => {
    const [password, setPassword] = useState<string>((propValue as string) || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (propOnChange) {
            propOnChange(e);
        }
    };
    
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
            <PasswordInput placeholder={placeholder} value={password} onChange={handleChange} {...inputProps} />    
            </FormControl>
            <div className={`overflow-hidden transition-[height] duration-300 ${password ? 'h-10' : 'h-0'}`}>
                {<PasswordStrength password={password} labels={strengthLabels} />}
            </div>
            <FormMessage />
        </FormItem>
    )
};