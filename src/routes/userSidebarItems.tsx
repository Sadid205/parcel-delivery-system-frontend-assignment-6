import type { MenuItem } from "@/components/Layout/Navbar";
import Home from "@/pages/Public/Home";
import Me from "@/pages/Public/Me";
import CreateParcel from "@/pages/User/CreateParcel";
import History from "@/pages/User/History";
import TrackParcel from "@/pages/User/TrackParcel";
import {
  FilePlus,
  HistoryIcon,
  BanIcon,
  TruckElectricIcon,
  HomeIcon,
  User2Icon,
} from "lucide-react";
export const userSidebarItems: MenuItem[] = [
  {
    title: "Home",
    url: "/public/home",
  },
  {
    title: "Me",
    url: "/user/me",
  },
  {
    title: "Parcel",
    url: "#",
    items: [
      {
        title: "Create Parcel",
        description: "",
        icon: <FilePlus className="size-5 shrink-0" />,
        url: "/user/create-parcel",
        Component: CreateParcel,
      },
      {
        title: "History",
        description: "",
        icon: <HistoryIcon className="size-5 shrink-0" />,
        url: "/user/history",
        Component: History,
      },
      {
        title: "Cancel Parcel",
        description: "",
        icon: <BanIcon className="size-5 shrink-0" />,
        url: "/user/cancel-parcel",
        Component: CreateParcel,
      },
      {
        title: "Track Parcel",
        description: "",
        icon: <TruckElectricIcon className="size-5 shrink-0" />,
        url: "/user/track-parcel",
        Component: TrackParcel,
      },
    ],
  },
];
