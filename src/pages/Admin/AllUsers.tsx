// import GlobalLoader from "@/components/Layout/GlobalLoader";
import LoaderComponent from "@/components/Layout/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner"
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { useLazyAllUsersQuery } from "@/redux/features/user/user.api";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import GlobalLoader from "@/components/Layout/GlobalLoader";
import { DateTime } from "luxon";
import { useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcel.api";
import type { IUser } from "@/types/user.type";
export default function AllUsers() {
  const [updateParcelStatus, { isLoading: updateStatusLoading }] =
    useUpdateParcelStatusMutation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [query, setQuery] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const [fetchUsers, { data: allUsersData, isLoading }] =
    useLazyAllUsersQuery();
  useEffect(() => {
    fetchUsers(query);
  }, []);

  console.log(allUsersData, query);

  const FormSchema = z.object({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const updateParcelData = {
      status: data.status,
      paid_status: data.paid_status,
      delivery_date: DateTime.fromJSDate(data.delivery_date)
        .setZone("Asia/Dhaka")
        .toFormat("yyyy-MM-dd"),
    };
    console.log(updateParcelData);
    console.log({ id: data.id });
    const toastId = toast.loading("Parcel status is updating...");
    try {
      const res = await updateParcelStatus({
        tracking_number: data.id,
        parcel_status: updateParcelData,
      });
      console.log(res);
      if (res?.error?.data?.success === false) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId });
      } else {
        toast.error("Something went wrong!", { id: toastId });
      }
      setOpen(false);
    } catch (err: any) {
      console.log(err);
      setOpen(false);
    }
  };

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
                fetchUsers(query);
              }}
            >
              Search
            </Button>
          </div>
          <Table>
            <TableCaption>A list of your recent users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User Id</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verified Status</TableHead>
                <TableHead>Deleted Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Active Status</TableHead>
                <TableHead>Assigned Parcels</TableHead>
                <TableHead className="">Update User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsersData?.data?.map((user: IUser) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user._id}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleString("en", {
                        timeZone: "Asia/Dhaka",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="">{user.role}</TableCell>
                    <TableCell className="">
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </TableCell>
                    <TableCell className="">
                      {user.isDeleted ? "Deleted" : "Not Deleted"}
                    </TableCell>
                    <TableCell className="">{user.email}</TableCell>
                    <TableCell className="">
                      {user.isActive ? "Active" : "Disabled"}
                    </TableCell>
                    <TableCell className="">
                      <Dialog open={open2} onOpenChange={setOpen2}>
                        <DialogTrigger asChild>
                          <Button
                            className="cursor-pointer"
                            // disabled={user.role != "DELIVERY_MAN"}
                            variant="outline"
                          >
                            See
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <DialogHeader>
                                <DialogTitle>Change Parcel Status</DialogTitle>
                              </DialogHeader>
                              <div className="flex mt-4 justify-between">
                                <h1>Hello</h1>
                              </div>
                              <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button
                                  type="submit"
                                  className="cursor-pointer"
                                >
                                  {updateStatusLoading ? (
                                    <GlobalLoader />
                                  ) : (
                                    "Update Status"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Update User</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <DialogHeader>
                                <DialogTitle>Change Parcel Status</DialogTitle>
                              </DialogHeader>
                              <div className="flex mt-4 justify-between">
                                <h1>Hello</h1>
                              </div>
                              <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button
                                  type="submit"
                                  className="cursor-pointer"
                                >
                                  {updateStatusLoading ? (
                                    <GlobalLoader />
                                  ) : (
                                    "Update Status"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                {/* <TableCell colSpan={10}>Total</TableCell> */}
                {/* <TableCell className=""> Taka</TableCell> */}
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
                      allUsers?.meta?.page > 1
                        ? prevState.page - 1
                        : prevState.page,
                  };

                  fetchUsers(newQuery);
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
                      allUsers?.meta?.totalPage > prevState.page
                        ? prevState.page + 1
                        : prevState.page,
                  };
                  fetchUsers(newQuery);

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
