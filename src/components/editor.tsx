"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
  placeholder: string;
}

export const Editor = ({
  onChange,
  value,
  disabled,
  placeholder,
}: EditorProps) => {
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
      />
    </div>
  );
};
