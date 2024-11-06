'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define colors array that can be exported and reused
// export const COLORS = {
//   turquoise: '#00F5D4',
//   purple: '#7C3AED',
//   blue: '#2563EB',
//   green: '#00DC82'
// } as const;
const COLORS = [
  '#00F5D4', // Bright turquoise
  '#00D6B4', // Medium turquoise
  '#00B894', // Dark turquoise
  '#00E676', // Bright green
  '#00C853', // Medium green
  '#00AF44'  // Dark green
]

interface MonthlyChartProps {
  data: Array<{
    month: string;
    PET: number;
    MRI: number;
    Other: number;
    CT: number;
  }>;
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Bar dataKey="PET" fill={COLORS[0]} />
            <Bar dataKey="MRI" fill={COLORS[1]} />
            <Bar dataKey="Other" fill={COLORS[2]} />
            <Bar dataKey="CT" fill={COLORS[3]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 