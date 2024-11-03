'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModalityChartProps {
  data: Array<{
    modality: string;
    count: number;
  }>;
}

export function ModalityChart({ data }: ModalityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modality Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="modality" type="category" />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 