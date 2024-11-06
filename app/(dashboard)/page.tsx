import { Button } from '@/components/ui/button';
import { File, PlusCircle } from 'lucide-react';
import { DatasetsTable } from './datasets-table';
import { getDatasets } from '@/lib/db';

export default async function DatasetsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = parseInt(searchParams.offset ?? '0', 10);
  const { datasets, newOffset, totalDatasets } = await getDatasets(
    search,
    offset
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Datasets</h1>
          <p className="text-sm text-muted-foreground">
            Manage your datasets and view their details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-9 gap-1">
            <File className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-9 gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Dataset
            </span>
          </Button>
        </div>
      </div>

      <DatasetsTable
        datasets={datasets}
        offset={offset}
        totalDatasets={totalDatasets}
      />
    </div>
  );
}
