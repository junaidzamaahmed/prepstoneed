"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export const InputFile = () => {
  const { user } = useUser();
  const [data, setData] = useState<any>([]);
  const router = useRouter();


  console.log(data);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Import CSV</Label>
      <Input
        id="picture"
        type="file"
        accept=".csv"
        // onChange={fileChangeHandler}
      />
    </div>
  );
};
