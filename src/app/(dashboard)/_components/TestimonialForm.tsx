"use client";

import { useState, useEffect } from "react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

interface Testimonial {
  id?: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  img?: string;
}

export function TestimonialForm({
  onCreate,
  onUpdate,
  editingTestimonial,
  clearEdit,
}: {
  onCreate?: () => void;
  onUpdate?: () => void;
  editingTestimonial?: Testimonial | null;
  clearEdit?: () => void;
}) {
  const [form, setForm] = useState<Testimonial>({
    name: "",
    location: "",
    rating: 5,
    comment: "",
    img: "",
  });

  useEffect(() => {
    if (editingTestimonial) {
      setForm(editingTestimonial);
    }
  }, [editingTestimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = form.id ? "PATCH" : "POST";
    const url = form.id ? `/api/testimonials/${form.id}` : "/api/testimonials";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (form.id && onUpdate) onUpdate();
    else if (onCreate) onCreate();

    setForm({
      name: "",
      location: "",
      rating: 5,
      comment: "",
      img: "",
    });
    if (clearEdit) clearEdit();
  };

  const [uploadError, setUploadError] = useState("");

  // Clear upload error after 7 seconds only when an error occurs
  useEffect(() => {
    if (!uploadError) return;
    const timeout = setTimeout(() => setUploadError(""), 7000);
    return () => clearTimeout(timeout);
  }, [uploadError]);

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        className="border rounded p-2 w-full mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="border rounded p-2 w-full mb-2"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />
      <input
        type="number"
        className="border rounded p-2 w-full mb-2"
        placeholder="Rating"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: +e.target.value })}
        required
      />
      <textarea
        className="border rounded p-2 w-full mb-2 h-40"
        placeholder="comment"
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        required
      />

      {/* UploadThing Image Upload */}
      <div className="mb-2">
        <UploadButton
          endpoint="testimonialImage" 
          onClientUploadComplete={(res) => {
            setUploadError(""); 
            const url = res?.[0]?.url;
            if (url) {
              setForm((prev) => ({ ...prev, img: url }));
            }
          }}
          onUploadError={(error) => {
            if (error.message.includes("size")) {
              setUploadError("Upload failed: File size exceeds the limit.");
            } else {
              setUploadError("Upload failed: " + error.message);
            }
          }}
        />
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}

        {form.img && (
          <Image
            src={form.img}
            alt="Uploaded"
            width={200}
            height={200}
            className="mt-2 h-20 object-cover rounded border"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {form.id ? "Update" : "Create"}
      </button>
    </form>
  );
}
