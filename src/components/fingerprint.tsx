"use client";

import { useClerk } from "@clerk/nextjs";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Fingerprint() {
  const { signOut, user } = useClerk();
  const [fingerprint, setFingerprint] = useState<any>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [existingFingerprints, setExistingFingerprints] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const cookieFP = Cookies.get("fingerprint_prepstone");
  useEffect(() => {
    async function fetchExistingFingerprints() {
      const userResponse = await fetch("/api/user");
      if (userResponse.status === 401) {
        signOut();
      }
      const data = await userResponse.json();
      if (data?.browserFingerprint) {
        setExistingFingerprints(data?.browserFingerprint);
      }
      setUserData(data);
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
    if (check && user?.id && userData?.role != "TEACHER") {
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
        Cookies.set("fingerprint_prepstone", fingerprint, { expires: 1000 });
      } else if (
        existingFingerprints?.find((existing: any) => {
          return existing.fingerprint === Cookies.get("fingerprint_prepstone");
        })
      ) {
      } else if (!existingFingerprint && existingFingerprints?.length > 0) {
        alert("You are not allowed to login from more than one browser.");
        signOut();
      } else if (!Cookies.get("fingerprint_prepstone")) {
        Cookies.set("fingerprint_prepstone", fingerprint, { expires: 1000 });
      }
    }
  }, [existingFingerprints]);

  return null;
}
