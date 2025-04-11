interface PrintRequest {
  id: string
  documentName: string
  pages: number
  amountPaid: string
  status: "pending" | "printed"
  timestamp: string
}

