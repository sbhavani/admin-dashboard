'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <Bar dataKey="PET" fill="#8884d8" />
            <Bar dataKey="MRI" fill="#82ca9d" />
            <Bar dataKey="Other" fill="#ffc658" />
            <Bar dataKey="CT" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 