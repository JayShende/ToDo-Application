import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface inputInterface{
    desc:string
}

export function AlertDestructive(props:inputInterface) {
  return (
    <Alert variant="destructive" className="w-[350px] mt-7">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
       {props.desc}
      </AlertDescription>
    </Alert>
  )
}
