'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { MonthlyChart } from "@/components/MonthlyChart";
import { ModalityChart } from "@/components/ModalityChart";
import { VendorPieChart } from "@/components/VendorPieChart";
// New data constants
const monthlyData = [
  { month: "Sep-20", PET: 200, MRI: 0, Other: 0, CT: 0 },
  { month: "Oct-20", PET: 0, MRI: 400, Other: 0, CT: 0 },
  { month: "Nov-20", PET: 0, MRI: 400, Other: 0, CT: 0 },
  { month: "May-20", PET: 250, MRI: 0, Other: 0, CT: 550 },
  { month: "Mar-20", PET: 100, MRI: 0, Other: 0, CT: 0 },
  { month: "Jun-20", PET: 200, MRI: 0, Other: 0, CT: 0 },
  { month: "Jul-20", PET: 300, MRI: 150, Other: 0, CT: 0 },
  { month: "Jan-20", PET: 0, MRI: 0, Other: 450, CT: 0 },
  { month: "Feb-20", PET: 300, MRI: 0, Other: 0, CT: 0 },
  { month: "Dec-20", PET: 100, MRI: 0, Other: 0, CT: 0 },
  { month: "Aug-20", PET: 0, MRI: 0, Other: 500, CT: 0 },
  { month: "Apr-20", PET: 0, MRI: 600, Other: 0, CT: 500 },
];

const modalityData = [
  { modality: "CT", count: 3.5 },
  { modality: "MRI", count: 3.5 },
  { modality: "DX", count: 2.5 },
  { modality: "MG", count: 2.5 },
  { modality: "Path", count: 1.5 },
  { modality: "Other", count: 1.5 },
];

const vendorCounts = [
  { name: "Google", value: 3 },
  { name: "AI Startup", value: 2 },
  { name: "Other", value: 13 },
];

// Updated color palette based on Intelpixel's brand colors
const COLORS = [
  '#00E6CA', // Primary turquoise
  '#00F5A0', // Primary green
  '#33EBD5', // Light turquoise
  '#33F7B3', // Light green
  '#00B29D', // Dark turquoise
  '#00C280'  // Dark green
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-muted-foreground">View orders summary.</p>
      
      {/* Total Deal Size */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-7xl font-bold text-center">5,339</CardTitle>
          <p className="text-center text-muted-foreground">Total Deal Size (in thousands USD)</p>
        </CardHeader>
      </Card>

      {/* Grid container for charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Distribution */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Monthly Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart 
              data={monthlyData} 
              colors={{
                PET: '#00E6CA',
                MRI: '#00F5A0',
                Other: '#33EBD5',
                CT: '#33F7B3'
              }}
            />
          </CardContent>
        </Card>

        {/* Vendor Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <VendorPieChart 
              data={vendorCounts}
            />
          </CardContent>
        </Card>

        {/* Modality Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Modality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ModalityChart 
              data={modalityData}
              colors={COLORS}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
