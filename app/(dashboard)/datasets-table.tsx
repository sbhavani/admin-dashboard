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
import { SelectDataset, SelectLlm } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronsUpDown } from 'lucide-react';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SelectProps {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  multiple?: boolean;
}

export function DatasetsTable({
  datasets,
  offset,
  totalDatasets
}: {
  datasets: (SelectDataset & { llm?: SelectLlm })[];
  offset: number;
  totalDatasets: number;
}) {
  let router = useRouter();
  let datasetsPerPage = 25;

  // Change state type from string to string[]
  const [modalityFilter, setModalityFilter] = useState<string[]>(['all']);
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);
  const [manufacturerFilter, setManufacturerFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  const [indicationsFilter, setIndicationsFilter] = useState<string[]>(['all']);
  const [indicationsOpen, setIndicationsOpen] = useState(false);

  // Get unique modalities from datasets
  const modalities = Array.from(new Set(datasets.map(d => d.modality)));

  // Update the indications extraction to handle objects
  const uniqueIndications = Array.from(new Set(
    datasets
      .flatMap(d => d.llm?.diagnosisList || [])
      .map(item => JSON.stringify(item))
  ))
  .map(str => {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error('Error parsing indication:', str);
      return null;
    }
  })
  .filter(item => item && item.description && item.code)
  .sort((a, b) => {
    if (!a?.description || !b?.description) return 0;
    return a.description.localeCompare(b.description);
  });

  // Update filtering logic
  const filteredDatasets = datasets.filter(dataset => {
    const modalityMatch = modalityFilter.includes('all') || modalityFilter.includes(dataset.modality);
    const ageMatch = dataset.patientAge >= ageRange[0] && dataset.patientAge <= ageRange[1];
    const manufacturerMatch = manufacturerFilter === 'all';
    const countryMatch = countryFilter === 'all';
    const indicationsMatch = indicationsFilter.includes('all') || 
      (dataset.llm?.diagnosisList && Array.isArray(dataset.llm.diagnosisList) && dataset.llm.diagnosisList.some(i => indicationsFilter.includes(i.code)));
    return modalityMatch && ageMatch && manufacturerMatch && countryMatch && indicationsMatch;
  });

  function prevPage() {
    router.back();
  }

  function nextPage() {
    console.log('nextPage called', {
      offset,
      newOffset: offset + datasetsPerPage,
      url: `/?offset=${offset + datasetsPerPage}`
    });
    router.push(`/?offset=${offset + datasetsPerPage}`, { scroll: false });
    router.refresh();
  }

  const start = offset + 1;
  const end = Math.min(offset + datasets.length, totalDatasets);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datasets</CardTitle>
        <CardDescription>
          Manage your datasets and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Modality</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {modalityFilter.includes('all') 
                      ? 'All Modalities'
                      : modalityFilter.length > 0 
                        ? `${modalityFilter.length} selected`
                        : "Select modalities"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search modalities..." />
                    <CommandList>
                      <CommandEmpty>No modality found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setModalityFilter(['all']);
                            return false;
                          }}
                          className={cn(
                            "cursor-pointer text-foreground",
                            "aria-selected:bg-accent aria-selected:text-accent-foreground"
                          )}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              modalityFilter.includes('all') ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Modalities
                        </CommandItem>
                        {modalities.map((modality) => (
                          <CommandItem
                            key={modality}
                            onSelect={() => {
                              if (modalityFilter.includes('all')) {
                                setModalityFilter([modality]);
                              } else {
                                setModalityFilter(prev => 
                                  prev.includes(modality)
                                    ? prev.filter(m => m !== modality)
                                    : [...prev, modality]
                                );
                              }
                              return false;
                            }}
                            className={cn(
                              "cursor-pointer text-foreground",
                              "aria-selected:bg-accent aria-selected:text-accent-foreground"
                            )}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                modalityFilter.includes(modality) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {modality}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Manufacturer</label>
              <Select value={manufacturerFilter} onValueChange={setManufacturerFilter}>
                <SelectTrigger className="w-full">
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
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-full">
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
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Indications</label>
              <Popover open={indicationsOpen} onOpenChange={setIndicationsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={indicationsOpen}
                    className="w-full justify-between"
                  >
                    {indicationsFilter.includes('all') 
                      ? 'All Indications'
                      : indicationsFilter.length > 0 
                        ? `${indicationsFilter.length} selected`
                        : "Select indications"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search indications..." />
                    <CommandList>
                      <CommandEmpty>No indication found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setIndicationsFilter(['all']);
                            return false;
                          }}
                          className={cn(
                            "cursor-pointer text-foreground",
                            "aria-selected:bg-accent aria-selected:text-accent-foreground"
                          )}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              indicationsFilter.includes('all') ? "opacity-100" : "opacity-0"
                            )}
                          />
                          All Indications
                        </CommandItem>
                        {uniqueIndications.map((indication) => (
                          <CommandItem
                            key={indication.code}
                            onSelect={() => {
                              if (indicationsFilter.includes('all')) {
                                setIndicationsFilter([indication.code]);
                              } else {
                                setIndicationsFilter(prev => 
                                  prev.includes(indication.code)
                                    ? prev.filter(i => i !== indication.code)
                                    : [...prev, indication.code]
                                );
                              }
                              return false;
                            }}
                            className={cn(
                              "cursor-pointer text-foreground",
                              "aria-selected:bg-accent aria-selected:text-accent-foreground"
                            )}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                indicationsFilter.includes(indication.code) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {indication.description}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Age Range</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={ageRange[0]}
                    onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
                    className="w-16 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                  <span className="text-sm text-muted-foreground">to</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
                    className="w-16 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell w-24">Modality</TableHead>
              <TableHead className="hidden md:table-cell w-24">Study Date</TableHead>
              <TableHead className="hidden md:table-cell w-20">Age</TableHead>
              <TableHead className="hidden md:table-cell w-[300px]">Report</TableHead>
              <TableHead className="hidden md:table-cell">Test</TableHead>
              <TableHead className="hidden md:table-cell">Diagnosis</TableHead>
              <TableHead className="hidden md:table-cell">Indications</TableHead>
              {/* <TableHead className="hidden md:table-cell">Actions</TableHead> */}
              {/* <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead> */}
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
              {totalDatasets > 0 ? `${start}-${end}` : '0'}
            </strong>{' '}
            of <strong>{totalDatasets}</strong> datasets
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + datasetsPerPage >= totalDatasets}
              onClick={() => {
                console.log('Next clicked', {
                  offset,
                  datasetsPerPage,
                  totalDatasets,
                  wouldDisable: offset + datasetsPerPage >= totalDatasets
                });
              }}
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