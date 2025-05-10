import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";

const DICEBEAR_BASE_URL = "https://api.dicebear.com/9.x/";

export interface avatarProps {
    name: string;
    dicebearURL?: string;
    size?: number;
}

const initials = (name: string) => {
  const fullName = name.split(" ")

  const firstName = fullName[0]
  if (fullName.length === 1) {
    return firstName.charAt(0).toUpperCase()
  }

  const lastName = fullName[fullName.length - 1]

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export const UserAvatar: React.FC<avatarProps> = ({name, dicebearURL, size}) => {
    return (
        <Avatar className={`${size ? `w-${size} h-${size}` : ""}`}>
          <AvatarImage src={DICEBEAR_BASE_URL + dicebearURL} />
          <AvatarFallback className="bg-accent">
            <span className={`text-[${size ? size: 16}px] font-medium`}>{initials(name)}</span>
          </AvatarFallback>
        </Avatar>
    )
}
