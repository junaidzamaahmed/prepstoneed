"use client";

import { useClerk } from "@clerk/nextjs";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";
export default function Fingerprint() {
  const { signOut, user } = useClerk();
  const [fingerprint, setFingerprint] = useState<any>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [existingFingerprints, setExistingFingerprints] = useState<any>(null);

  useEffect(() => {
    async function fetchExistingFingerprints() {
      const response = await fetch("/api/fingerprints");
      const data = await response.json();
      setExistingFingerprints(data);
      setCheck(true);
    }

    if (user?.id) {
      getFingerprint()
        .then((result) => {
          setFingerprint(result);
        })
        .catch((error) => {
          console.error("Error getting fingerprint:", error);
        });
      fetchExistingFingerprints();
    }
  }, [user]);
  useEffect(() => {
    if (check && user?.id) {
      const existingFingerprint = existingFingerprints?.find(
        (existing: any) => {
          return existing.fingerprint === fingerprint;
        }
      );
      if (!existingFingerprint && existingFingerprints?.length == 0) {
        fetch("/api/fingerprints", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fingerprint),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        console.log("Fingerprint not found in database");
      } else if (!existingFingerprint && existingFingerprints?.length > 0) {
        alert("You are not allowed to login from more than one browser.");
        signOut();
      }
    }
  }, [existingFingerprints]);

  return null;
}
