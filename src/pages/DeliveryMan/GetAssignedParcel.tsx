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
import { useLazyGetAssignedParcelQuery } from "@/redux/features/parcel/parcel.api";
import {
  useLazyAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/user.api";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import GlobalLoader from "@/components/Layout/GlobalLoader";
import { DateTime } from "luxon";
import type { IUser } from "@/types/user.type";
import { useAssignParcelMutation } from "@/redux/features/parcel/parcel.api";
import type { IAssignedParcel } from "@/types/parcel.type";
export default function GetAssignedParcel() {
  const [updateUserRole, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();
  const [
    fetchAssignedParcels,
    { data: assignedParcel, isLoading: assignedParcelLoading },
  ] = useLazyGetAssignedParcelQuery();
  const [assign, { isLoading: assignLoading }] = useAssignParcelMutation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [query, setQuery] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  console.log(assignedParcel);

  useEffect(() => {
    fetchAssignedParcels(query);
  }, []);
  const roles = ["ADMIN", "DELIVERY_MAN", "USER", "SUPER_ADMIN"];
  const activeStatus = ["ACTIVE", "INACTIVE", "BLOCKED"];

  const FormSchema = z.object({
    role: z.enum(roles),
    isActive: z.enum(activeStatus),
    id: z.string(),
  });
  const AssignParcelSchema = z.object({
    id: z.string(),
    tracking_number: z.string().regex(/^TRK-\d{13}-\d{3}$/, {
      message:
        "Invalid Tracking Number Format. Expected: TRK-<13digits>-<3digits>",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const form2 = useForm<z.infer<typeof AssignParcelSchema>>({
    resolver: zodResolver(AssignParcelSchema),
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const updateUserData = {
      id: data.id,
      role: data.role as "ADMIN" | "DELIVERY_MAN" | "USER" | "SUPER_ADMIN",
      isActive: data.isActive as "ACTIVE" | "INACTIVE" | "BLOCKED",
    };
    console.log(updateUserData);
    const toastId = toast.loading("User role is updating...");
    try {
      const res = await updateUserRole({
        id: data.id,
        userData: {
          role: updateUserData.role,
          isActive: updateUserData.isActive,
        },
      });
      console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId });
      } else {
        toast.success("Something went wrong!", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      setOpen(false);
    }
  };
  const onSubmit2 = async (data: z.infer<typeof AssignParcelSchema>) => {
    const toastId = toast.loading("Assigning parcel...");
    try {
      console.log(data);
      const res = await assign(data);
      console.log(res);
      if (res?.error?.status == 400) {
        toast.error(res?.error?.data?.message, { id: toastId });
        form2.setError("tracking_number", {
          type: "server",
          message: res?.error?.data?.message,
        });
      } else {
        toast.success("Successfully assigned.", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <>
      {assignedParcelLoading ? (
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
                fetchAssignedParcels(query);
              }}
            >
              Search
            </Button>
          </div>
          <Table>
            <TableCaption>A list of your recent users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tracking Number</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Status</TableHead>
                <TableHead>Parcel Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Receiver's Name</TableHead>
                <TableHead>Receiver's Email</TableHead>
                <TableHead>Receiver's Phone</TableHead>
                <TableHead>Receiver's Address</TableHead>
                <TableHead>Send Otp</TableHead>
                <TableHead className="">Verify Otp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedParcel?.data?.map((parcel: IAssignedParcel) => {
                return (
                  <TableRow key={parcel._id}>
                    <TableCell className="font-medium">
                      {parcel.tracking_number}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.weight} gm
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.fees} Taka
                    </TableCell>
                    <TableCell>
                      {new Date(parcel.delivery_date).toLocaleString("en", {
                        timeZone: "Asia/Dhaka",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.current_status.status}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.current_status.paid_status}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.parcel_type}
                    </TableCell>
                    <TableCell>
                      {new Date(parcel.createdAt).toLocaleString("en", {
                        timeZone: "Asia/Dhaka",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="">{parcel.receiver.name}</TableCell>
                    <TableCell className="">{parcel.receiver.email}</TableCell>
                    <TableCell className="">{parcel.receiver.phone}</TableCell>
                    <TableCell className="">
                      {parcel.receiver.address}
                    </TableCell>

                    <TableCell className="">
                      {/* <Dialog
                        onOpenChange={(open) => {
                          if (open) {
                            form2.reset({
                              id: user._id,
                              tracking_number: "",
                            });
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="cursor-pointer"
                            disabled={user.role != "DELIVERY_MAN"}
                            variant="outline"
                          >
                            Assign
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[300px]">
                          <Form {...form2}>
                            <form onSubmit={form2.handleSubmit(onSubmit2)}>
                              <DialogHeader>
                                <DialogTitle>Assign Parcel</DialogTitle>
                              </DialogHeader>
                              <div className="flex mt-4 justify-between">
                                <FormField
                                  control={form2.control}
                                  name="tracking_number"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Input
                                        {...field}
                                        type="string"
                                        placeholder="Tracking Id"
                                      />
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
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
                                  {updateUserLoading ? (
                                    <GlobalLoader />
                                  ) : (
                                    "Assign"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog> */}
                    </TableCell>
                    <TableCell className="">
                      {/* <Dialog
                        onOpenChange={(open) => {
                          if (open) {
                            form.reset({
                              id: user._id,
                              role: user.role,
                              isActive: user.isActive,
                            });
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline">Change Role</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <DialogHeader>
                                <DialogTitle>Change User Role</DialogTitle>
                              </DialogHeader>
                              <div className="flex mt-4 justify-between">
                                <FormField
                                  control={form.control}
                                  name="role"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a paid status" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {roles.map((r, index) => (
                                            <SelectItem key={index} value={r}>
                                              {r}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="isActive"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {activeStatus.map((a, index) => (
                                            <SelectItem key={index} value={a}>
                                              {a}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
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
                                  {updateUserLoading ? (
                                    <GlobalLoader />
                                  ) : (
                                    "Update Role"
                                  )}
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog> */}
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
                      assignedParcel?.meta?.page > 1
                        ? prevState.page - 1
                        : prevState.page,
                  };

                  fetchAssignedParcels(newQuery);
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
                      assignedParcel?.meta?.totalPage > prevState.page
                        ? prevState.page + 1
                        : prevState.page,
                  };
                  fetchAssignedParcels(newQuery);

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
