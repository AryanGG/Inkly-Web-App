"use client"

import type React from "react"

import { useState } from "react"
import { Search, Printer, Home } from "lucide-react"
import { PrintQueue, initialPrintRequests } from "@/components/print-queue"
import { PrintDetails } from "@/components/print-details"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the PrintRequest type
interface PrintRequest {
  id: string
  documentName: string
  pages: number
  amountPaid: string
  status: string
  timestamp: string
}

export function PrinterDashboard() {
  const [selectedPrint, setSelectedPrint] = useState<PrintRequest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [mockPrintRequests, setMockPrintRequests] = useState(initialPrintRequests)

  const handlePrintSelect = (print: PrintRequest) => {
    setSelectedPrint(print)
  }

  const handleMarkAsPrinted = (printId: string) => {
    // Update the print status in the mock data
    const updatedPrints = mockPrintRequests.map((print) =>
      print.id === printId ? { ...print, status: "printed" } : print,
    )
    setMockPrintRequests(updatedPrints)
    setSelectedPrint(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (value: string) => {
    setActiveFilter(value)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <img src="/logo.png" alt="Inkly" className="h-8" />
            </div>
          </div>
          <div className="relative w-full max-w-md mx-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search print requests..."
              className="pl-8 bg-gray-50"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_300px]">
          {/* Print Queue Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Print Queue</h1>
              <Tabs defaultValue="all" onValueChange={handleFilterChange}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="printed">Printed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <PrintQueue
              onPrintSelect={handlePrintSelect}
              searchQuery={searchQuery}
              filter={activeFilter}
              printRequests={mockPrintRequests}
            />
          </div>

          {/* Print Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Print Details</h2>
            {selectedPrint ? (
              <PrintDetails print={selectedPrint} onMarkAsPrinted={handleMarkAsPrinted} />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center bg-white rounded-lg border border-gray-200 h-[300px]">
                <Printer className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-500">Select a print request to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-16">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

