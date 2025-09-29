import LoaderComponent from "@/components/Layout/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLazyGetHistoryQuery } from "@/redux/features/parcel/parcel.api";
import type { IHistory } from "@/types/parcel.type";
import { useEffect, useState } from "react";

export default function History() {
  const [query, setQuery] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const [fetchHistory, { data: histories, isLoading }] =
    useLazyGetHistoryQuery();
  useEffect(() => {
    fetchHistory(query);
  }, []);

  // console.log(histories, query);

  const total = histories?.data?.reduce(
    (acc: number, curr: IHistory) => acc + curr.fees,
    0
  );
  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="flex gap-5 max-w-md">
            <Input
              value={query.searchTerm}
              onChange={(e) =>
                setQuery({ ...query, searchTerm: e.target.value })
              }
              placeholder="Search"
            />
            <Button
              onClick={() => {
                fetchHistory(query);
              }}
            >
              Search
            </Button>
          </div>
          <Table>
            <TableCaption>A list of your recent historys.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tracking Number</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Parcel Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Status</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Receiver Address</TableHead>
                <TableHead>Receiver Phone</TableHead>
                <TableHead>Receiver Email</TableHead>
                <TableHead>Charge</TableHead>
                <TableHead className="">Change Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {histories?.data?.map((history: IHistory) => {
                return (
                  <TableRow key={history.tracking_number}>
                    <TableCell className="font-medium">
                      {history.tracking_number}
                    </TableCell>
                    <TableCell>{history.createdAt}</TableCell>
                    <TableCell className="font-medium">
                      {history.parcel_type}
                    </TableCell>
                    <TableCell className="">
                      {history.current_status.status}
                    </TableCell>
                    <TableCell className="">
                      {history.current_status.paid_status}
                    </TableCell>
                    <TableCell className="">
                      {new Date(history.delivery_date).toLocaleString("en", {
                        timeZone: "Asia/Dhaka",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="">{history.weight} gm</TableCell>
                    <TableCell className="">
                      {history.receiver.address}
                    </TableCell>
                    <TableCell className="">{history.receiver.phone}</TableCell>
                    <TableCell className="">{history.receiver.email}</TableCell>
                    <TableCell className="">৳ {history.fees}</TableCell>
                    <TableCell className="">
                      <Button
                        disabled={history.current_status.status != "REQUESTED"}
                        className="bg-green-500 cursor-pointer"
                      >
                        Change Status
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>Total</TableCell>
                <TableCell className="">{total} Taka</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => {
                setQuery((prevState) => {
                  const newQuery = {
                    ...prevState,
                    page:
                      histories?.meta?.page > 1
                        ? prevState.page - 1
                        : prevState.page,
                  };

                  fetchHistory(newQuery);
                  return newQuery;
                });
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{query.page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => {
                setQuery((prevState) => {
                  const newQuery = {
                    ...prevState,
                    page:
                      histories?.meta?.totalPage > prevState.page
                        ? prevState.page + 1
                        : prevState.page,
                  };
                  fetchHistory(newQuery);

                  return newQuery;
                });
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
