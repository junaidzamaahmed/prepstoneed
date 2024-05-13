import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = auth();
  // if (!userId) {
  //   return redirect("/");
  // }
  let userRole = null;
  if (userId) {
    userRole = await db.user.findUnique({
      where: {
        externalId: userId,
      },
    });
  }

  return (
    <nav
      id="navbar"
      className="p-4 border-b- h-full flex items-center shadow-sm bg-white"
    >
      <MobileSidebar />
      <NavbarRoutes
        teacher={userRole?.role === "TEACHER"}
        signedIn={userRole ? true : false}
      />
    </nav>
  );
};

export default Navbar;
