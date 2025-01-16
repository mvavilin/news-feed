import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import AuthHeader from "@/components/auth/AuthHeader"
import BackButton from "@/components/auth/BackButton"

interface ICardWrapperProps { title: string, backButtonHref: string, backButtonLabel: string, backButtonLink: string, children: React.ReactNode }

function CardWrapper({ title, backButtonHref, backButtonLabel, backButtonLink, children }: ICardWrapperProps) {
  return (
    <Card className="xl:w-1/4 md:w-1/3 shadow-md">
      <CardHeader>
        <AuthHeader title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} link={backButtonLink} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper