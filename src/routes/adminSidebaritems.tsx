import type { MenuItem } from "@/components/Layout/Navbar";
import {
  Scan,
  ShoppingBag,
  PencilOff,
  FileSearch,
  UserRoundPlus,
  UsersIcon,
  PencilRuler,
} from "lucide-react";
export const adminSidebarItems: MenuItem[] = [
  { title: "Home", url: "#" },
  { title: "Me", url: "#" },
  {
    title: "Parcel",
    url: "#",
    items: [
      {
        title: "Get All Parcels",
        description: "",
        icon: <ShoppingBag className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Update Parcel Status",
        description: "",
        icon: <PencilOff className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Get Single Parcel",
        description: "",
        icon: <FileSearch className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Assign Parcel",
        description: "",
        icon: <UserRoundPlus className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Users",
    url: "#",
    items: [
      {
        title: "All Users",
        description: "",
        icon: <UsersIcon className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Get Single User",
        description: "",
        icon: <Scan className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Update User",
        description: "",
        icon: <PencilRuler className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Update User",
        description: "",
        icon: <PencilRuler className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
];
