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
  data: { month: string; PET: number; MRI: number; Other: number; CT: number; }[];
  colors: {
    PET: string;
    MRI: string;
    Other: string;
    CT: string;
  };
}

export function MonthlyChart({ data, colors }: MonthlyChartProps) {
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
            <Bar dataKey="PET" fill={colors.PET} />
            <Bar dataKey="MRI" fill={colors.MRI} />
            <Bar dataKey="Other" fill={colors.Other} />
            <Bar dataKey="CT" fill={colors.CT} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 