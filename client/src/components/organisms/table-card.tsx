import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card"
import { DataTable, TableColumn } from "../molecules/data-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginationParams } from "caresync/types/pagination";
import { Button } from "../atoms/button";

export interface TableCardProps {
  title: string;
  columns: TableColumn[];
  clientID: number;
  service: (clientID: number, paginationParams: PaginationParams) => Promise<any>;
  actions?: React.ReactNode;
  className?: string;
}

const pageSize = 5;

export const TableCard = ({ title, columns, clientID, service, actions, className }: TableCardProps) => {
    const { t } = useTranslation('data')

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
        {
            queryKey: [title, clientID],
            queryFn: ({pageParam = 1}) => service(clientID, { page: pageParam, size: pageSize }),
            getNextPageParam: (lastPage, _, lastPageParam) => {
                if (lastPage.data.length <= pageSize) {
                    return null;
                }
                return lastPageParam + 1;
            },
            initialPageParam: 1,
        }
    )

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {actions}
      </CardHeader>
      <CardContent>
        {data && <DataTable columns={columns} data={data.pages.flatMap(page => page.data)} isLoading={isLoading}>
            <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
                {t('loadMore')}
            </Button>
        </DataTable>}
      </CardContent>
    </Card>
  )
}