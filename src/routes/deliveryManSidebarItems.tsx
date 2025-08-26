import type { MenuItem } from "@/components/Layout/Navbar";
import { MapPinCheckIcon, Send, ShieldCheck } from "lucide-react";
export const deliveryManSidebarItems: MenuItem[] = [
  { title: "Home", url: "#" },
  { title: "Me", url: "#" },
  {
    title: "Parcel",
    url: "#",
    items: [
      {
        title: "Assigned Parcel",
        description: "",
        icon: <MapPinCheckIcon className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Send Otp",
        description: "",
        icon: <Send className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Verify Parcel",
        description: "",
        icon: <ShieldCheck className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
];
