"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

import "react-quill/dist/quill.snow.css";
import katex from "katex";
import "katex/dist/katex.min.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
  placeholder: string;
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      { script: "sub" },
      { script: "super" },
      "formula",
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export const Editor = ({
  onChange,
  value,
  disabled,
  placeholder,
}: EditorProps) => {
  useEffect(() => {
    window.katex = katex;
  }, []);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        placeholder={placeholder}
        readOnly={disabled}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
};
