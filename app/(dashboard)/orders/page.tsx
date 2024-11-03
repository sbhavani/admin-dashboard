import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

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

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>View orders summary.</CardDescription>
      </CardHeader>
      <CardContent>
          {/* Total Deal Size */}
          <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-7xl font-bold text-center">5,339</CardTitle>
                <p className="text-center text-muted-foreground">Total Deal Size (in thousands USD)</p>
              </CardHeader>
            </Card>

            {/* Monthly Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="PET" stackId="stack" fill="hsl(var(--primary))" />
                    <Bar dataKey="MRI" stackId="stack" fill="hsl(var(--secondary))" />
                    <Bar dataKey="Other" stackId="stack" fill="hsl(var(--accent))" />
                    <Bar dataKey="CT" stackId="stack" fill="hsl(var(--muted))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vendor Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Distribution</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  {vendorCounts.map((vendor) => (
                    <div key={vendor.name} className="text-center">
                      <div className="relative h-32 w-32 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 100 50">
                          <path
                            d="M 5 45 A 40 40 0 0 1 95 45"
                            fill="none"
                            stroke="hsl(var(--border))"
                            strokeWidth="10"
                          />
                          <path
                            d="M 5 45 A 40 40 0 0 1 95 45"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="10"
                            strokeDasharray={`${(vendor.value / 18) * 142} 142`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{vendor.value}</span>
                          <span className="text-sm text-muted-foreground">{vendor.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Modality Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Modality Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={modalityData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="modality" type="category" />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
      </CardContent>
    </Card>
  );
}
