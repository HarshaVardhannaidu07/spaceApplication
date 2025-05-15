"use client"

import type { FormData } from "./application-form"
import { Input } from "@/components/ui/input"
import { FormField } from "./form-field"
import { User, Mail, Phone, Flag, Calendar } from "lucide-react"

interface PersonalInfoFormProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Record<string, string>
}

export function PersonalInfoForm({ formData, onChange, errors }: PersonalInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-space-100">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          <User className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-space-900">Personal Information</h2>
          <p className="text-sm text-space-600">Tell us about yourself</p>
        </div>
      </div>

      <FormField label="Full Name" error={errors.fullName} icon={<User className="h-4 w-4 text-space-400" />}>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="Enter your full name"
          className="pl-10"
        />
      </FormField>

      <FormField
        label="Date of Birth"
        error={errors.dateOfBirth}
        icon={<Calendar className="h-4 w-4 text-space-400" />}
      >
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => onChange("dateOfBirth", e.target.value)}
          className="pl-10"
        />
      </FormField>

      <FormField label="Nationality" error={errors.nationality} icon={<Flag className="h-4 w-4 text-space-400" />}>
        <Input
          id="nationality"
          value={formData.nationality}
          onChange={(e) => onChange("nationality", e.target.value)}
          placeholder="Enter your nationality"
          className="pl-10"
        />
      </FormField>

      <FormField
        label="Email"
        error={errors.email}
        description="Format: name@example.com"
        icon={<Mail className="h-4 w-4 text-space-400" />}
      >
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Enter your email address"
          className="pl-10"
        />
      </FormField>

      <FormField
        label="Phone"
        error={errors.phone}
        description="Format: +1 (123) 456-7890 or similar international format"
        icon={<Phone className="h-4 w-4 text-space-400" />}
      >
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Enter your phone number with country code"
          className="pl-10"
        />
      </FormField>
    </div>
  )
}
