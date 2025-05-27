import { UserAvatar } from "@/components/molecules/user/avatar"

export const PersonCard = ({fullName, phone}: {fullName: string, phone: string}) => {

    return (
        <div className="flex items-center gap-2">
            <UserAvatar name={fullName} />
            <div className="font-small">{fullName}</div>
            <div className="text-sm text-muted-foreground">[{phone}]</div>
        </div>
    )
}