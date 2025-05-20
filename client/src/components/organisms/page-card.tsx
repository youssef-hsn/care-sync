import { PlusIcon } from "lucide-react"
import { Button } from "../atoms/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/card"
import { Input } from "../atoms/input"

interface PageCardProps {
    title: string
    description: string
    buttonText: string
    buttonAction?: () => void
    onSearchBarChange?: () => void
    children?: React.ReactNode
    className?: string
}

export const PageCard = ({ title, description, buttonText, buttonAction, onSearchBarChange, children, className }: PageCardProps) => {
    return (
        <Card className={className}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row gap-2">
            <Input 
                placeholder={`Search ${title.toLowerCase()}...`}
                onChange={onSearchBarChange}
            />
            <Button onClick={buttonAction}>
              <PlusIcon /> {buttonText}
            </Button>
          </CardContent>
          {children}
        </Card>
    )
}