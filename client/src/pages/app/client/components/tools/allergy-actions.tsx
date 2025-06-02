import { Button } from "@/components/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/atoms/dialog";
import { RegisterAllergyForm } from "@/components/common/forms/register-allergy";
import { userHasAnyOf } from "@/lib/utils/access-controll";
import { useState } from "react";

export const AllergyActions = ({clientID}: {clientID: number}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    if (!userHasAnyOf(["associate"])) {
        return (
            <></>
        )
    }

    return (
        <div className="flex flex-col items-end gap-2 w-full">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Register Allergy</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Register New Allergy</DialogTitle>
                    </DialogHeader>
                    <RegisterAllergyForm clientID={clientID} onComplete={() => {
                        setIsDialogOpen(false);
                    }} />
                </DialogContent>
            </Dialog>
        </div>
    );
};