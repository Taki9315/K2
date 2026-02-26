"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type DataColumn<T extends object> = {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
};

type CustomColumn<T extends object> = {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
};

export type Column<T extends object> = DataColumn<T> | CustomColumn<T>;

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
}

export function DataTable<T extends object>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filtered = searchKey
    ? data.filter((item) => {
        const value = item[searchKey];
        return String(value ?? "").toLowerCase().includes(search.toLowerCase());
      })
    : data;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {searchKey && (
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8 text-center text-muted-foreground">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, i) => (
                <TableRow key={i} className="border-border">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className="text-sm">
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[String(col.key)] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
