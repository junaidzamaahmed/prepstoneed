"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  useEffect(() => {
    window.katex = katex;
  }, []);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return <ReactQuill theme="bubble" value={value} readOnly />;
};
