import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/table"
import { useTranslation } from "react-i18next"

export type TableColumn = {
    label: string
    display?: React.FC<{ value: any }>
}

export interface DataTableProps<Data extends Record<string, any>> {
    data: Data[]
    caption?: string
    columns: TableColumn[]
    isLoading?: boolean
    onRowClick?: (item: Data) => void
    className?: string
    children?: React.ReactNode
}

export function DataTable<Data extends Record<string, any>>({
    data,
    columns,
    caption,
    isLoading,
    onRowClick,
    className,
    children,
}: DataTableProps<Data>) {
    const { t } = useTranslation("data")

    if (!columns || columns.length === 0) {
        return <div className="text-muted-foreground text-center py-4">No columns defined</div>
    }


    return (
        <Table className={className}>
            {caption && <caption className="caption-top mb-2">{caption}</caption>}
            <TableHeader>
                <TableRow>
                    {Array.from(columns).map((column) => (
                        <TableHead key={column.label}>
                            {t(column.label)}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.map((item, rowIndex) => (
                    <TableRow 
                        key={rowIndex}
                        onClick={onRowClick ? () => onRowClick(item) : undefined}
                        className={onRowClick ? "cursor-pointer" : ""}
                    >
                        {columns.map(({label, display: Display}) => (
                            <TableCell key={`${rowIndex}-${label}`}>
                                {Display
                                ? <Display value={item[label]} />
                                : item[label].toString()}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
                {((!data || data.length === 0) && !isLoading) && <TableRow>
                        <TableCell colSpan={columns.length} className="text-center">
                            {t("no-data")}
                        </TableCell>
                    </TableRow>
                }
                {isLoading && 
                    <TableRow>
                        {columns.map((_, index) => (
                            <TableCell key={index}>
                                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                            </TableCell>
                        ))}
                    </TableRow>
                }
            </TableBody>
            {children}
        </Table>
    )
}
