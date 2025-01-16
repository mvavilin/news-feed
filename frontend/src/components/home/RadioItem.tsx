import { Label } from "@radix-ui/react-label"
import { RadioGroupItem } from "@radix-ui/react-radio-group"

interface IRadioItemProps { filterPosts: string, value: string, label: string }

function RadioItem({ filterPosts, value, label }: IRadioItemProps) {
  return (
    <div className={`flex items-center rounded-sm px-2 py-1 ${filterPosts === value ? "bg-slate-100" : "iniherit"}`}>
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  )
}

export default RadioItem