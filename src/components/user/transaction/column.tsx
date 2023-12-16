import { ColumnDef } from '@tanstack/react-table';

export type Transaction = {
  id: string;
  name: string;
  datetime: string;
  service: string;
  status: 'Complete' | 'Waiting for Payment' | 'Process' | 'Complete';
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'datetime',
    header: 'Date & Time',
  },
  {
    accessorKey: 'service',
    header: 'Services',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
