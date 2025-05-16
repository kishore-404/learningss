import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];



export const userData = [
  { id: 1, name: "Kishore", email: "kishore@example.com", role: "Admin" },
  { id: 2, name: "Lavanya", email: "lavanya@example.com", role: "User" },
  { id: 3, name: "Rahul", email: "rahul@example.com", role: "Editor" },
];
