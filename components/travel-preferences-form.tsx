"use client"

import type { FormData } from "./application-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField } from "./form-field"
import { Briefcase, Calendar, Building2, MessageSquare } from "lucide-react"

interface TravelPreferencesFormProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Record<string, string>
}

export function TravelPreferencesForm({ formData, onChange, errors }: TravelPreferencesFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-space-100">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
          <Briefcase className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-space-900">Travel Preferences</h2>
          <p className="text-sm text-space-600">Plan your journey to Mars</p>
        </div>
      </div>

      <FormField
        label="Departure Date"
        error={errors.departureDate}
        icon={<Calendar className="h-4 w-4 text-space-400" />}
      >
        <Input
          id="departureDate"
          type="date"
          value={formData.departureDate}
          onChange={(e) => onChange("departureDate", e.target.value)}
          className="pl-10"
        />
      </FormField>

      <FormField label="Return Date" error={errors.returnDate} icon={<Calendar className="h-4 w-4 text-space-400" />}>
        <Input
          id="returnDate"
          type="date"
          value={formData.returnDate}
          onChange={(e) => onChange("returnDate", e.target.value)}
          className="pl-10"
        />
      </FormField>

      <FormField
        label="Accommodation Preference"
        error={errors.accommodation}
        icon={<Building2 className="h-4 w-4 text-space-400" />}
      >
        <div className="relative">
          <div className="absolute left-3 top-3 z-10 pointer-events-none">
            <Building2 className="h-4 w-4 text-space-400" />
          </div>
          <Select value={formData.accommodation} onValueChange={(value) => onChange("accommodation", value)}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Select accommodation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Space Hotel">Space Hotel</SelectItem>
              <SelectItem value="Martian Base">Martian Base</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FormField>

      <FormField
        label="Special Requests or Preferences"
        error={errors.specialRequests}
        optional
        icon={<MessageSquare className="h-4 w-4 text-space-400" />}
      >
        <div className="relative">
          <div className="absolute left-3 top-3 z-10 pointer-events-none">
            <MessageSquare className="h-4 w-4 text-space-400" />
          </div>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => onChange("specialRequests", e.target.value)}
            placeholder="Enter any special requests or preferences"
            className="min-h-[100px] pl-10"
          />
        </div>
      </FormField>
    </div>
  )
}
