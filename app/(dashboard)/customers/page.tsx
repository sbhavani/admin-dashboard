import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Download, MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const customers = [
  {
    id: 1,
    name: "AI Vision Labs",
    type: "AI Startup",
    orders: [
      { name: "MRI/Lumbar/Knee 5K studies", amount: 50000 },
      { name: "Mammo, MSK, MRI", amount: 500000 },
    ],
    status: "Active",
  },
  {
    id: 2,
    name: "MedTech Imaging",
    type: "Medical Device",
    orders: [
      { name: "CT Liver 5K Studies", amount: 100000 },
      { name: "X-Ray 500-750k cxrs", amount: 300000 },
    ],
    status: "Active",
  },
  {
    id: 3,
    name: "Neural Medical AI",
    type: "AI Startup",
    orders: [
      { name: "AI Development - All X-Rays", amount: 250000 },
      { name: "Spine MRI", amount: 250000 },
    ],
    status: "Active",
  },
  {
    id: 4,
    name: "Ultrasound Innovations",
    type: "Medical Device",
    orders: [
      { name: "Medical Device - various ultrasound data", amount: 100000 },
    ],
    status: "Active",
  },
  {
    id: 5,
    name: "DataDriven Health",
    type: "AI Startup",
    orders: [
      { name: "1,000 Neonatal Fundus", amount: 50000 },
      { name: "Blood Data", amount: 50000 },
    ],
    status: "Active",
  },
]

export default function CustomersPage() {

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        </div>
        <p className="text-muted-foreground">
          View all customers and their orders.
        </p>
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full border p-2">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="grid gap-1">
                  <CardTitle>{customer.name}</CardTitle>
                  <CardDescription>{customer.type}</CardDescription>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {customer.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset Order</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.orders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell className="text-right">
                          ${order.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download order</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
