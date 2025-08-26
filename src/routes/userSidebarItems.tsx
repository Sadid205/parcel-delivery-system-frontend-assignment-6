import type { MenuItem } from "@/components/Layout/Navbar";
import {
  FilePlus,
  HistoryIcon,
  BanIcon,
  TruckElectricIcon,
} from "lucide-react";
export const userSidebarItems: MenuItem[] = [
  { title: "Home", url: "#" },
  { title: "Me", url: "#" },
  {
    title: "Parcel",
    url: "#",
    items: [
      {
        title: "Create Parcel",
        description: "",
        icon: <FilePlus className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "History",
        description: "",
        icon: <HistoryIcon className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Cancel Parcel",
        description: "",
        icon: <BanIcon className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Track Parcel",
        description: "",
        icon: <TruckElectricIcon className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
];
