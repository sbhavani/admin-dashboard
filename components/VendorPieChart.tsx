import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = [
  '#00F5D4', // Bright turquoise
  '#00D6B4', // Medium turquoise
  '#00B894', // Dark turquoise
  '#00E676', // Bright green
  '#00C853', // Medium green
  '#00AF44'  // Dark green
]

interface VendorPieChartProps {
  data: { name: string; value: number; }[];
  colors?: string[];  // Make it optional with ?
}

export const VendorPieChart: React.FC<VendorPieChartProps> = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name }) => name}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors ? colors[index] : COLORS[index]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}