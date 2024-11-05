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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

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

  // Add state for filters
  const [modalityFilter, setModalityFilter] = useState<string>('all');
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);
  const [manufacturerFilter, setManufacturerFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  // Get unique modalities from datasets
  const modalities = Array.from(new Set(datasets.map(d => d.modality)));

  // Filter datasets
  const filteredDatasets = datasets.filter(dataset => {
    const modalityMatch = modalityFilter === 'all' || dataset.modality === modalityFilter;
    const ageMatch = dataset.patientAge >= ageRange[0] && dataset.patientAge <= ageRange[1];
    const manufacturerMatch = manufacturerFilter === 'all'; // || dataset.manufacturer === manufacturerFilter;
    const countryMatch = countryFilter === 'all';// || dataset.country === countryFilter;
    return modalityMatch && ageMatch && manufacturerMatch && countryMatch;
  });

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
        <div className="mb-4 flex gap-4 items-center">
          <div className="w-[200px]">
            <Select value={modalityFilter} onValueChange={setModalityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by modality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modalities</SelectItem>
                {modalities.map(modality => (
                  <SelectItem key={modality} value={modality}>
                    {modality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select value={manufacturerFilter} onValueChange={setManufacturerFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Manufacturers</SelectItem>
                <SelectItem value="Philips">Philips</SelectItem>
                <SelectItem value="Agfa">Agfa</SelectItem>
                <SelectItem value="GE">GE</SelectItem>
                <SelectItem value="Fujifilm">Fujifilm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="U.S.">U.S.</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Malaysia">Malaysia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <p className="text-sm mb-2">Age Range: {ageRange[0]} - {ageRange[1]}</p>
            <Slider
              min={0}
              max={100}
              step={1}
              value={ageRange}
              onValueChange={(value) => setAgeRange(value as [number, number])}
            />
          </div>
        </div>
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
            {filteredDatasets.map((dataset) => (
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