"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function StudentsList({ purchases }: { purchases: any }) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const removeAccess = async (id: string) => {
    try {
      setDisabled(true);
      await axios.delete("/api/access/", {
        headers: { id: id },
      });
      setDisabled(false);
      router.refresh();
    } catch {}
  };

  return (
    <Table className="mt-5">
      <TableCaption>A list of course students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>TrxID</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-right">Access</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase: any) => (
          <TableRow key={purchase.id}>
            <TableCell>{purchase.user.fullName}</TableCell>
            <TableCell>{purchase.trxId}</TableCell>
            <TableCell>{purchase.phone}</TableCell>
            <TableCell className="text-right">
              <Button
                disabled={disabled}
                className="bg-secondary text-white hover:bg-secondary/80"
                onClick={() => removeAccess(purchase.id)}
              >
                Remove Access
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
