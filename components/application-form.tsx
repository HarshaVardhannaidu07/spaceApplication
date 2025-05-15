"use client"

import { useState } from "react"
import { PersonalInfoForm } from "./personal-info-form"
import { TravelPreferencesForm } from "./travel-preferences-form"
import { HealthSafetyForm } from "./health-safety-form"
import { SuccessMessage } from "./success-message"
import { StageIndicator } from "./stage-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Send } from "lucide-react"

// Define the form data structure
export type FormData = {
  // Personal Information
  fullName: string
  dateOfBirth: string
  nationality: string
  email: string
  phone: string

  // Travel Preferences
  departureDate: string
  returnDate: string
  accommodation: string
  specialRequests: string

  // Health and Safety
  healthDeclaration: string
  emergencyContactName: string
  emergencyContactPhone: string
  medicalConditions: string
}

// Initial form state
const initialFormData: FormData = {
  fullName: "",
  dateOfBirth: "",
  nationality: "",
  email: "",
  phone: "",

  departureDate: "",
  returnDate: "",
  accommodation: "",
  specialRequests: "",

  healthDeclaration: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  medicalConditions: "",
}

export default function ApplicationForm() {
  const [currentStage, setCurrentStage] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Validate stage 1
  const validateStage1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const dobDate = new Date(formData.dateOfBirth)
      if (isNaN(dobDate.getTime())) {
        newErrors.dateOfBirth = "Please enter a valid date"
      }
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (
      !/^\+?[0-9]{1,4}[ -]?($$[0-9]{1,4}$$)?[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,9}$/.test(formData.phone)
    ) {
      newErrors.phone = "Please enter a valid international phone number (e.g., +1 (123) 456-7890)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate stage 2
  const validateStage2 = () => {
    const newErrors: Record<string, string> = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required"
    } else {
      const departureDate = new Date(formData.departureDate)
      if (isNaN(departureDate.getTime())) {
        newErrors.departureDate = "Please enter a valid date"
      } else if (departureDate < today) {
        newErrors.departureDate = "Departure date must be in the future"
      }
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required"
    } else {
      const returnDate = new Date(formData.returnDate)
      const departureDate = new Date(formData.departureDate)

      if (isNaN(returnDate.getTime())) {
        newErrors.returnDate = "Please enter a valid date"
      } else if (formData.departureDate && !isNaN(departureDate.getTime()) && returnDate <= departureDate) {
        newErrors.returnDate = "Return date must be after departure date"
      }
    }

    if (!formData.accommodation) {
      newErrors.accommodation = "Please select an accommodation preference"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate stage 3
  const validateStage3 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.healthDeclaration) {
      newErrors.healthDeclaration = "Health declaration is required"
    }

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required"
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required"
    } else if (
      !/^\+?[0-9]{1,4}[ -]?($$[0-9]{1,4}$$)?[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,9}$/.test(
        formData.emergencyContactPhone,
      )
    ) {
      newErrors.emergencyContactPhone = "Please enter a valid international phone number (e.g., +1 (123) 456-7890)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next button click
  const handleNext = () => {
    let isValid = false

    switch (currentStage) {
      case 1:
        isValid = validateStage1()
        break
      case 2:
        isValid = validateStage2()
        break
      default:
        isValid = true
    }

    if (isValid) {
      setCurrentStage((prev) => prev + 1)
    }
  }

  // Handle previous button click
  const handlePrevious = () => {
    setCurrentStage((prev) => prev - 1)
  }

  // Handle form submission
  const handleSubmit = () => {
    const isValid = validateStage3()

    if (isValid) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData)
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 2000)
    }
  }

  // Reset form
  const handleReset = () => {
    setFormData(initialFormData)
    setCurrentStage(1)
    setIsSubmitted(false)
    setErrors({})
  }

  if (isSubmitted) {
    return <SuccessMessage onReset={handleReset} />
  }

  return (
    <div className="space-y-6">
      <StageIndicator currentStage={currentStage} />

      <Card className="mars-card overflow-hidden border-0">
        <CardContent className="p-6 md:p-8">
          {currentStage === 1 && <PersonalInfoForm formData={formData} onChange={handleChange} errors={errors} />}

          {currentStage === 2 && <TravelPreferencesForm formData={formData} onChange={handleChange} errors={errors} />}

          {currentStage === 3 && <HealthSafetyForm formData={formData} onChange={handleChange} errors={errors} />}

          <div className="flex justify-between mt-8">
            {currentStage > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="bg-white/80 hover:bg-white border-space-200 text-space-800 hover:text-space-900 transition-all"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : (
              <div></div> // Empty div to maintain layout
            )}

            <div>
              {currentStage < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-secondary hover:bg-secondary/90 text-white transition-all"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
