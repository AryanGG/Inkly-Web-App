"use client"
import { File, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PrintRequest {
  id: string
  documentName: string
  pages: number
  amountPaid: string
  status: string
  timestamp: string
}

// Make mockPrintRequests a state variable that can be updated
export const initialPrintRequests: PrintRequest[] = [
  {
    id: "AC32",
    documentName: "Experiment_1A.pdf",
    pages: 8,
    amountPaid: "Rs. 16/-",
    status: "pending",
    timestamp: new Date().toISOString(),
  },
  {
    id: "BD45",
    documentName: "Assignment_Physics.pdf",
    pages: 12,
    amountPaid: "Rs. 24/-",
    status: "pending",
    timestamp: new Date().toISOString(),
  },
  {
    id: "CF78",
    documentName: "Research_Paper.pdf",
    pages: 20,
    amountPaid: "Rs. 40/-",
    status: "printed",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "DG91",
    documentName: "Lab_Report.pdf",
    pages: 5,
    amountPaid: "Rs. 10/-",
    status: "pending",
    timestamp: new Date().toISOString(),
  },
  {
    id: "EH12",
    documentName: "Lecture_Notes.pdf",
    pages: 15,
    amountPaid: "Rs. 30/-",
    status: "printed",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "FI34",
    documentName: "Project_Proposal.pdf",
    pages: 10,
    amountPaid: "Rs. 20/-",
    status: "pending",
    timestamp: new Date().toISOString(),
  },
]

interface PrintQueueProps {
  onPrintSelect: (print: PrintRequest) => void
  searchQuery: string
  filter: string
  printRequests: PrintRequest[]
}

export function PrintQueue({ onPrintSelect, searchQuery, filter, printRequests }: PrintQueueProps) {
  // Filter print requests based on search query and filter
  const filteredPrints = printRequests.filter((print) => {
    const matchesSearch =
      print.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      print.id.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "pending") return matchesSearch && print.status === "pending"
    if (filter === "printed") return matchesSearch && print.status === "printed"

    return matchesSearch
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredPrints.length > 0 ? (
        filteredPrints.map((print) => (
          <Card
            key={print.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              print.status === "printed" ? "bg-gray-50" : "bg-white"
            }`}
            onClick={() => onPrintSelect(print)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 rounded-md">
                    <File className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="truncate max-w-[150px]">
                    <p className="font-medium truncate">{print.documentName}</p>
                    <p className="text-sm text-gray-500">ID: {print.id}</p>
                  </div>
                </div>
                <Badge variant={print.status === "pending" ? "outline" : "secondary"}>
                  {print.status === "pending" ? (
                    <Clock className="w-3 h-3 mr-1" />
                  ) : (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  )}
                  {print.status === "pending" ? "Pending" : "Printed"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500">Pages</span>
                  <span className="font-medium">{print.pages}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">{print.amountPaid}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex justify-center p-8 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No print requests found</p>
        </div>
      )}
    </div>
  )
}

