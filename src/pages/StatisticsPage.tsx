
import { Layout } from "@/components/layout/Layout";
import { themeStatistics, themes } from "@/lib/data";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StatisticsPage = () => {
  const chartColors = ["#FF9EB1", "#90CAF9", "#FFCC80", "#CF9FFF", "#A5D6A7"];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-heading mb-2">Program Statistics</h1>
        <p className="text-gray-600 mb-6">
          Explore historical data and statistics about all themes and programs over the years.
        </p>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Programs by Theme (2017-2023)</CardTitle>
              <CardDescription>
                Distribution of programs across all five themes over the years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={themeStatistics}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="theme1" name="Inspirational Talk" fill={chartColors[0]} />
                    <Bar dataKey="theme2" name="Skills and Euphoria" fill={chartColors[1]} />
                    <Bar dataKey="theme3" name="TED Videos" fill={chartColors[2]} />
                    <Bar dataKey="theme4" name="Entrepreneur in You" fill={chartColors[3]} />
                    <Bar dataKey="theme5" name="VNR Differentiators" fill={chartColors[4]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Yearly Program Distribution</CardTitle>
              <CardDescription>
                Detailed breakdown of programs by theme for each academic year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>Inspirational Talk</TableHead>
                    <TableHead>Skills and Euphoria</TableHead>
                    <TableHead>TED Videos</TableHead>
                    <TableHead>Entrepreneur in You</TableHead>
                    <TableHead>VNR Differentiators</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {themeStatistics.map((stat) => (
                    <TableRow key={stat.year}>
                      <TableCell className="font-medium">{stat.year}</TableCell>
                      <TableCell>{stat.theme1}</TableCell>
                      <TableCell>{stat.theme2}</TableCell>
                      <TableCell>{stat.theme3}</TableCell>
                      <TableCell>{stat.theme4}</TableCell>
                      <TableCell>{stat.theme5}</TableCell>
                      <TableCell className="font-bold">{stat.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;
