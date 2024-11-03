import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectDataset } from '@/lib/db';
import { deleteDataset } from './actions';

export function Dataset({ dataset }: { dataset: SelectDataset }) {
  return (
    <TableRow>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {dataset.modality}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{dataset.studyDate.toLocaleDateString("en-US")}</TableCell>
      <TableCell className="hidden md:table-cell">{dataset.patientAge}</TableCell>
      <TableCell className="hidden md:table-cell">
        <textarea 
          className="w-full h-24 overflow-y-auto resize-none" 
          value={dataset.report} 
          readOnly 
        />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteDataset}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
} 