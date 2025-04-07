import React from "react";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";

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


export const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    children,
    ...inputProps
}) => {
    return (
        <LabeledInput label={label} labelFor="password" type="password" {...inputProps} >
            {children?? null}
        </LabeledInput>
    );
};
