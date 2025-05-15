import ApplicationForm from "@/components/application-form"
import { StarsBackground } from "@/components/stars-background"
import { MarsLogo } from "@/components/mars-logo"

export default function Home() {
  return (
    <main className="min-h-screen bg-space-gradient py-8 px-4 md:py-12 md:px-8 relative overflow-hidden">
      <StarsBackground />

      <div className="max-w-4xl mx-auto">
      

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">Mars Colonization Program</h1>
          <p className="text-space-100 max-w-2xl mx-auto">
            Join the first wave of Mars colonists. Complete this application to begin your journey to the Red Planet.
          </p>
        </div>

        <ApplicationForm />
      </div>
    </main>
  )
}
