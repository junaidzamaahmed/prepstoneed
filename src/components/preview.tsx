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
    // Quill formula module expects window.katex; default export lacks nested namespace from export-as-namespace
    (window as unknown as { katex: typeof katex }).katex = katex;
  }, []);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
      className="select-none cursor-default"
    />
  );
};
