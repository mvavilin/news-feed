import { Button } from "@/components/ui/button"

function SideBarButton(props: any) {
  return (
    <Button variant={"link"} className="w-full flex gap-2.5 justify-start rounded-md px-4 py-2 font-normal text-slate-400 cursor-pointer hover:bg-slate-100 hover:text-inherit hover:font-medium hover:no-underline duration-150">
      {props.icon}
      {props.label}
    </Button>
  )
}

export default SideBarButton