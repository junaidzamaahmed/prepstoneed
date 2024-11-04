"use client";

import {
  BarChart,
  Compass,
  Home,
  Layout,
  List,
  Unlock,
  User,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { PiChartBarHorizontal, PiStudent } from "react-icons/pi";

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Compass,
    label: "Dashboard",
    href: "/courses",
  },
  {
    icon: PiChartBarHorizontal,
    label: "Leaderboard",
    href: "/leaderboard",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Tests",
    href: "/teacher/tests",
  },
  {
    icon: Layout,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: User,
    label: "Instructors",
    href: "/teacher/instructors",
  },
  {
    icon: Unlock,
    label: "Grant Access",
    href: "/teacher/grant-access",
  },
  {
    icon: PiStudent,
    label: "Students",
    href: "/teacher/students",
  },
];
export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
