import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  children: ReactNode
  error?: string
  description?: string
  optional?: boolean
  icon?: ReactNode
}

export function FormField({ label, children, error, description, optional, icon }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")} className="text-space-700 font-medium">
          {label}
          {optional && <span className="text-space-400 ml-1 text-sm">(Optional)</span>}
        </Label>
      </div>

      {description && <p className="text-sm text-space-500">{description}</p>}

      <div className="relative">
        {icon && <div className="absolute left-3 top-3 z-10 pointer-events-none">{icon}</div>}
        {children}
      </div>

      {error && <p className="text-sm font-medium text-mars-600">{error}</p>}
    </div>
  )
}
