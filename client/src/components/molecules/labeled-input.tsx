import React from "react";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { PasswordInput } from "@/components/molecules/password-input";

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    labelFor: string;
    children?: React.ReactNode;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
    label,
    labelFor,
    children,
    ...inputProps
}) => {
    return (
        <div className="grid gap-3">
            <Label htmlFor={labelFor}>{label}</Label>
            <Input id={labelFor} {...inputProps} />
            {children?? null}
        </div>
    );
};

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    children?: React.ReactNode;
}


export const LabeledPasswordInput: React.FC<PasswordInputProps> = ({
    label,
    children,
    ...inputProps
}) => {
    return (
        <div className="grid gap-3">
            <Label htmlFor={"password"}>{label}</Label>
            <PasswordInput id={"password"} {...inputProps}/>
            {children?? null}
        </div>
    );
};
