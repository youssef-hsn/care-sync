import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/atoms/card"
import { UserAvatar } from "@/components/molecules/user/avatar"
import { Client, fullName } from "caresync/types/client"
import { Button } from "@/components/atoms/button"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { CLIENTS_BASE_URI } from "@/lib/constants/pages/views"
import { useTranslation } from "react-i18next"

export const ClientCard = ({ client, noActions }: { client: Client, noActions?: boolean }) => {
  const navigate = useNavigate()
  const { t } = useTranslation('data')

  return (
    <Card className="max-w-xs w-full">
      <CardHeader className="flex flex-col items-center gap-2 border-b">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <UserAvatar name={fullName(client)} dicebearURL={client.avatar} size={20} />
          </div>
        </div>
        <CardTitle className="text-center">{fullName(client)}</CardTitle>
        <CardDescription className="text-center">{client.phone}</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            {t('bloodType')} {client.bloodType}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('birthDate')} {client.birthDate}
          </p>
        </div>
      </CardContent>
      {!noActions &&  <CardFooter className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`${CLIENTS_BASE_URI}/${client.clientID}/profile`)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          {t('viewDetails')}
        </Button>
      </CardFooter>}
    </Card>
  )
}