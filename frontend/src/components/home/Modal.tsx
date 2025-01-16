import React, { useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import AuthHeader from "@/components/auth/AuthHeader"

interface ModalProps { children: React.ReactNode, title: string, active: boolean, onClose: () => void }

function Modal({ children, title, active, onClose }: ModalProps) {
  useEffect(() => { if (!active) { onClose() } }, [active, onClose])

  return (
    <div className={`${active ? "block" : "hidden"} fixed bg-black/50 top-0 right-0 left-0 bottom-0`} onClick={onClose}>
      <Card className="w-2/6 rounded-xl bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          {/*  */}
          <AuthHeader title={title} />
          {/*  */}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div >
  )
}

export default Modal