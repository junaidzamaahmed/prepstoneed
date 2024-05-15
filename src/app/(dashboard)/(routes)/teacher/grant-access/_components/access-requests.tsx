"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccessRequests({
  accessRequests,
  courses,
}: {
  accessRequests: any;
  courses: any;
}) {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const grantAccess = async (
    id: string,
    userId: string,
    courseId: string,
    trxId: string,
    phone: string
  ) => {
    try {
      setDisabled(true);
      await axios.post("/api/access/request/grant", {
        id,
        userId,
        courseId,
        trxId,
        phone,
      });
      setDisabled(false);
      router.refresh();
    } catch {}
  };
  return (
    <div className="mt-5">
      <Table>
        <TableCaption>A list of course access requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>TrxID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Grant Access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessRequests.map((request: any) => (
            <TableRow key={request.id}>
              <TableCell>{request.user.fullName}</TableCell>
              <TableCell>
                {
                  courses.find((course: any) => course.id === request.courseId)
                    .title
                }
              </TableCell>
              <TableCell>{request.trxId}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell className="text-right">
                <Button
                  disabled={disabled}
                  className="bg-primary text-white"
                  onClick={() =>
                    grantAccess(
                      request.id,
                      request.userId,
                      request.courseId,
                      request.trxId,
                      request.phone
                    )
                  }
                >
                  Grant Access
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
