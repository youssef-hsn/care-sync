import { Button } from "@/components/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/atoms/dialog";
import { userHasAnyOf } from "@/lib/utils/access-controll";
import { useState } from "react";

export const ReportActions = ({clientID}: {clientID: number}) => {
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
                    <Button variant="outline">Create Report</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Create New Report</DialogTitle>
                    </DialogHeader>
                    <CreateReport clientID={clientID} onComplete={() => {
                        setIsDialogOpen(false);
                    }} />
                </DialogContent>
            </Dialog>
        </div>
    );
};