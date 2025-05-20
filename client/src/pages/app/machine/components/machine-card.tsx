import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/atoms/card"
import { Button } from "@/components/atoms/button"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { MACHINES_BASE_URI } from "@/lib/constants/pages/views"
import { DateDisplay, DateTimeDisplay } from "@/components/molecules/displays/date-display"

export interface Machine {
  id: number
  name: string
  description: string
  price: number
  status: string
  location?: string
  lastMaintenance?: Date
  nextMaintenance?: Date
}

export const MachineCard = ({ machine, noActions }: { machine: Machine, noActions?: boolean }) => {
  const navigate = useNavigate()
  const { t } = useTranslation('data')

  return (
    <Card className="max-w-xs w-full">
      <CardHeader className="flex flex-col items-center gap-2 border-b">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-full">
            <span className="text-2xl">🖥️</span>
          </div>
        </div>
        <CardTitle className="text-center">{machine.name}</CardTitle>
        <CardDescription className="text-center">{machine.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            {t('price')}: ${machine.price}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('status')}: {machine.status}
          </p>
          {machine.location && (
            <p className="text-sm text-muted-foreground">
              {t('location')}: {machine.location}
            </p>
          )}
          {machine.lastMaintenance && (
            <p className="text-sm text-muted-foreground">
              {t('lastMaintenance')}
              <DateDisplay value={machine.lastMaintenance} />
            </p>
          )}
          {machine.nextMaintenance && (
            <p className="text-sm text-muted-foreground">
              {t('nextMaintenance')}
              <DateTimeDisplay value={machine.nextMaintenance} />
            </p>
          )}
        </div>
      </CardContent>
      {!noActions && (
        <CardFooter className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`${MACHINES_BASE_URI}/${machine.id}/details`)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {t('viewDetails')}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
