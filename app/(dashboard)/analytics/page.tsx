'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, Label } from 'recharts';

// Add these data constants at the top of the file
const modalityData = [
  { name: 'CT', value: 2453 },
  { name: 'MR', value: 1834 },
  { name: 'US', value: 1620 },
  { name: 'CR', value: 3212 },
  { name: 'OP', value: 945 },
  { name: 'Other', value: 534 },
]

const testData = [
  { name: 'Chest X-Ray', count: 2134 },
  { name: 'Head CT', count: 1432 },
  { name: 'Abdominal US', count: 1123 },
  { name: 'Brain MRI', count: 987 },
  { name: 'Knee MRI', count: 876 },
  { name: 'Mammogram', count: 765 },
]

const indicationData = [
  { name: 'Dyspnea (267036007)', count: 1543 },
  { name: 'Chest pain (29857009)', count: 1232 },
  { name: 'Follow-up encounter (390906007)', count: 987 },
  { name: 'Injury (417163006)', count: 876 },
  { name: 'Preoperative evaluation (398942005)', count: 654 },
  { name: 'Screening (410534003)', count: 543 },
]

// Updated color palette based on Intelpixel's website
const COLORS = [
  '#00F5D4', // Bright turquoise
  '#00D6B4', // Medium turquoise
  '#00B894', // Dark turquoise
  '#00E676', // Bright green
  '#00C853', // Medium green
  '#00AF44'  // Dark green
]

// Update the CustomTooltip component
const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{`${payload[0].name || label?.split(' (')[0] || ''}`}</p>
        <p>{`Count: ${payload[0].value}`}</p>
        {label?.includes('(') && (
          <p className="text-xs text-gray-500">{`SNOMED CT: ${label.split(' (')[1]?.replace(')', '')}`}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="flex-1">
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">View analytics for the medical imaging datasets.</p>
        </div>

        {/* Stats Cards - Single row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,598</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloaded Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts - Two columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Modality Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Modality Distribution</CardTitle>
              <CardDescription>Distribution of imaging studies by modality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modalityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#00F5D4"
                      paddingAngle={5}
                      dataKey="value"
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        name
                      }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius * 1.2;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#000"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            className="text-xs"
                          >
                            {`${name} (${value})`}
                          </text>
                        );
                      }}
                    >
                      {modalityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Test Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Test Distribution</CardTitle>
              <CardDescription>Most common imaging tests performed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={testData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Bar dataKey="count" fill="#00F5D4">
                      {testData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Indications */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Common Indications</CardTitle>
              <CardDescription>Most frequent reasons for imaging studies (SNOMED CT)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={indicationData} layout="vertical" margin={{ left: 200 }}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={200} tick={{ fontSize: 12 }} />
                    <Bar dataKey="count" fill="#00F5D4" radius={[0, 4, 4, 0]}>
                      {indicationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                    <Tooltip content={<CustomTooltip />} />
                    <Label value="Count" offset={0} position="insideBottom" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
