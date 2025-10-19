import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { reports } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, MoreVertical, FileJson2, Newspaper, Image } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { GenerateReportForm } from './generate-report-form';
import Link from 'next/link';

export default function ReportsPage() {
  const handleDownload = (format: string, reportId: string) => {
    alert(`Downloading report ${reportId} as ${format} (functionality to be implemented).`);
  };

  return (
    <>
      <Header title="Performance Reports" />
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>View and generate weekly or monthly trading performance reports.</CardDescription>
            </div>
            <GenerateReportForm />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Summary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.type}</TableCell>
                    <TableCell>{new Date(report.from).toLocaleDateString()} - {new Date(report.to).toLocaleDateString()}</TableCell>
                    <TableCell className="max-w-sm truncate">{report.summary}</TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload('PDF', report.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload('Word', report.id)}>
                            <Newspaper className="mr-2 h-4 w-4" />
                            Export as Word
                          </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleDownload('Excel', report.id)}>
                            <FileJson2 className="mr-2 h-4 w-4" />
                            Export as Excel
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={() => handleDownload('PNG', report.id)}>
                             <Image className="mr-2 h-4 w-4" />
                            Save as PNG
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
