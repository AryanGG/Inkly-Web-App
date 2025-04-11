"use client"

import { useState } from "react"
import { Printer, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface PrintRequest {
  id: string
  documentName: string
  pages: number
  amountPaid: string
  status: string
  timestamp: string
}

interface PrintDetailsProps {
  print: PrintRequest
  onMarkAsPrinted: (printId: string) => void
}

export function PrintDetails({ print, onMarkAsPrinted }: PrintDetailsProps) {
  const [isPrinting, setIsPrinting] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    // Simulate printing process
    setTimeout(() => {
      setIsPrinting(false)
      setShowNotification(true)
    }, 2000)
  }

  const handleMarkAsPrinted = () => {
    onMarkAsPrinted(print.id)
    // In a real app, this would send a notification to the user
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-amber-50 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{print.documentName}</CardTitle>
          <Badge variant={print.status === "pending" ? "outline" : "secondary"}>
            {print.status === "pending" ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
            {print.status === "pending" ? "Pending" : "Printed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Print ID</p>
            <p className="font-medium">{print.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pages</p>
            <p className="font-medium">{print.pages}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount Paid</p>
            <p className="font-medium">{print.amountPaid}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Timestamp</p>
            <p className="font-medium">
              {new Date(print.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Print Options</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <span>Black & White</span>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <span>Collate: Yes</span>
            </div>
          </div>
        </div>

        {showNotification && (
          <div className="flex items-center p-2 mt-2 text-sm bg-green-50 border border-green-200 rounded-md">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>Document printed successfully!</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        {print.status === "pending" ? (
          <>
            <Button className="w-full" onClick={handlePrint} disabled={isPrinting}>
              {isPrinting ? (
                <>
                  <span className="mr-2">Printing...</span>
                  <span className="animate-spin">
                    <Printer className="w-4 h-4" />
                  </span>
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4 mr-2" />
                  Print Document
                </>
              )}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full" disabled={!showNotification}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Printed
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Mark as Printed?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will notify the user that their document has been printed and is ready for collection.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleMarkAsPrinted}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <div className="flex items-center justify-center p-2 text-sm bg-gray-50 border border-gray-200 rounded-md">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>This document has been printed</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

