import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import PaymentForm from "./_components/payment-form";
import Link from "next/link";

const PurchasePage = async ({ params }: { params: { courseId: string } }) => {
  // const router = useRouter();
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await db.user.findUnique({
    where: { externalId: userId },
  });
  if (!user?.id) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id:
        params.courseId == "dsat"
          ? "279057e5-db68-49f2-9e38-44455799d79c"
          : params.courseId,
    },
  });
  if (!course) {
    return redirect("/");
  }
  const accessRequest = await db.accessRequest.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
  });
  return (
    <div className="flex flex-col items-center justify-center h-[91vh] bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 text-center max-w-[80%]">
        {accessRequest
          ? "Your course access request is pending. It request will be approved soon. Thank you!"
          : "Payment Details"}
      </h1>
      {!accessRequest && <PaymentForm courseId={course.id} userId={user.id} />}
      {/* <p className="mt-4 text-gray-600">Please contact us for course access.</p> */}
      {accessRequest && (
        <Link
          className="mt-8 bg-primary text-white rounded-md p-2 hover:bg-primary/80 transition-all"
          href="/"
        >
          Go Home
        </Link>
      )}
      <div className="mt-8">
        <Image
          width={100}
          height={50}
          src="/logo.png"
          alt="Logo"
          className="w-44 h-24"
        />
      </div>
    </div>
  );
};

export default PurchasePage;