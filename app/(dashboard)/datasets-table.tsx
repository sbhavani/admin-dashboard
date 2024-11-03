'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Dataset } from './dataset';
import { SelectDataset } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DatasetsTable({
  datasets,
  offset,
  totalDatasets
}: {
  datasets: SelectDataset[];
  offset: number;
  totalDatasets: number;
}) {
  let router = useRouter();
  let datasetsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datasets</CardTitle>
        <CardDescription>
          Manage your datasets and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Name</TableHead> */}
              {/* <TableHead>Status</TableHead> */}
              <TableHead className="hidden md:table-cell">Modality</TableHead>
              <TableHead className="hidden md:table-cell">Study Date</TableHead>
              {/* <TableHead className="hidden md:table-cell">Patient Sex</TableHead> */}
              <TableHead className="hidden md:table-cell">Patient Age</TableHead>
              {/* <TableHead className="hidden md:table-cell">Created at</TableHead> */}
              <TableHead className="hidden md:table-cell">Report</TableHead>
              <TableHead className="hidden md:table-cell">Actions</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets.map((dataset) => (
              <Dataset key={dataset.id} dataset={dataset} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - datasetsPerPage, totalDatasets) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalDatasets}</strong> datasets
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === datasetsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + datasetsPerPage > totalDatasets}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
} 