"use client"

import type { FormData } from "./application-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormField } from "./form-field"
import { Heart, User, Phone, FileText, CheckCircle, XCircle } from "lucide-react"

interface HealthSafetyFormProps {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  errors: Record<string, string>
}

export function HealthSafetyForm({ formData, onChange, errors }: HealthSafetyFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-space-100">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mars-500 text-white">
          <Heart className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-space-900">Health and Safety</h2>
          <p className="text-sm text-space-600">Important information for your journey</p>
        </div>
      </div>

      <FormField
        label="Health Declaration"
        description="I confirm that I am in good health and fit for space travel"
        error={errors.healthDeclaration}
      >
        <RadioGroup
          value={formData.healthDeclaration}
          onValueChange={(value) => onChange("healthDeclaration", value)}
          className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 mt-3"
        >
          <div
            className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer transition-all ${
              formData.healthDeclaration === "yes"
                ? "border-secondary bg-secondary/10"
                : "border-space-200 hover:border-space-300"
            }`}
          >
            <RadioGroupItem value="yes" id="health-yes" className="text-secondary" />
            <Label htmlFor="health-yes" className="cursor-pointer flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
              <span>Yes, I confirm</span>
            </Label>
          </div>
          <div
            className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer transition-all ${
              formData.healthDeclaration === "no"
                ? "border-mars-500 bg-mars-500/10"
                : "border-space-200 hover:border-space-300"
            }`}
          >
            <RadioGroupItem value="no" id="health-no" className="text-mars-500" />
            <Label htmlFor="health-no" className="cursor-pointer flex items-center">
              <XCircle className="h-4 w-4 mr-2 text-mars-500" />
              <span>No, I have health concerns</span>
            </Label>
          </div>
        </RadioGroup>
      </FormField>

      <div className="space-y-4 p-4 bg-space-50 rounded-lg border border-space-100">
        <h3 className="font-medium text-space-900 flex items-center">
          <User className="h-4 w-4 mr-2 text-space-500" />
          Emergency Contact Information
        </h3>

        <FormField
          label="Emergency Contact Name"
          error={errors.emergencyContactName}
          icon={<User className="h-4 w-4 text-space-400" />}
        >
          <Input
            id="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={(e) => onChange("emergencyContactName", e.target.value)}
            placeholder="Enter emergency contact name"
            className="pl-10"
          />
        </FormField>

        <FormField
          label="Emergency Contact Phone"
          error={errors.emergencyContactPhone}
          description="Format: +1 (123) 456-7890 or similar international format"
          icon={<Phone className="h-4 w-4 text-space-400" />}
        >
          <Input
            id="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={(e) => onChange("emergencyContactPhone", e.target.value)}
            placeholder="Enter emergency contact phone with country code"
            className="pl-10"
          />
        </FormField>
      </div>

      <FormField
        label="Medical Conditions"
        description="Please list any medical conditions we should be aware of"
        error={errors.medicalConditions}
        optional
        icon={<FileText className="h-4 w-4 text-space-400" />}
      >
        <div className="relative">
          <div className="absolute left-3 top-3 z-10 pointer-events-none">
            <FileText className="h-4 w-4 text-space-400" />
          </div>
          <Textarea
            id="medicalConditions"
            value={formData.medicalConditions}
            onChange={(e) => onChange("medicalConditions", e.target.value)}
            placeholder="Enter any medical conditions"
            className="min-h-[100px] pl-10"
          />
        </div>
      </FormField>
    </div>
  )
}
