import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/atoms/card"
import { useTranslation } from "react-i18next"
import { DateDisplay } from "@/components/molecules/displays/date-display"

// Charity interface instead of Machine
export interface Charity {
  id: number
  name: string
  description: string
  location?: string
  founded?: Date
  totalDonations?: number
  status?: string
}

export const CharityCard = ({ charity }: { charity: Charity }) => {
  const { t } = useTranslation('data')

  return (
    <Card className="max-w-xs w-full">
      <CardHeader className="flex flex-col items-center gap-2 border-b">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-full">
            <span className="text-2xl">🤝</span>
          </div>
        </div>
        <CardTitle className="text-center">{charity.name}</CardTitle>
        <CardDescription className="text-center">{charity.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex-1">
          {charity.location && (
            <p className="text-sm text-muted-foreground">
              {t('location')}: {charity.location}
            </p>
          )}
          {charity.founded && (
            <p className="text-sm text-muted-foreground">
              {t('founded')}: <DateDisplay value={charity.founded} />
            </p>
          )}
          {typeof charity.totalDonations === 'number' && (
            <p className="text-sm text-muted-foreground">
              {t('totalDonations')}: ${charity.totalDonations}
            </p>
          )}
          {charity.status && (
            <p className="text-sm text-muted-foreground">
              {t('status')}: {charity.status}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CharityCard