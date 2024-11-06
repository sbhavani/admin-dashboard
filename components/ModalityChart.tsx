'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ModalityChartProps {
  data: { modality: string; count: number; }[];
  colors: string[];
}

export function ModalityChart({ data, colors }: ModalityChartProps) {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Modality Distribution</CardTitle>
      </CardHeader> */}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <defs>
              <linearGradient id="intelpixelGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00F5D4" />
                <stop offset="100%" stopColor="#00DC82" />
              </linearGradient>
            </defs>
            <XAxis type="number" />
            <YAxis dataKey="modality" type="category" />
            <Bar 
              dataKey="count" 
              fill="url(#intelpixelGradient)"
              background={{ fill: '#f5f5f5' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 