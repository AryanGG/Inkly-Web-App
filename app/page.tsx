import { PrinterDashboard } from "@/components/printer-dashboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        <PrinterDashboard />
      </div>
    </ThemeProvider>
  )
}

