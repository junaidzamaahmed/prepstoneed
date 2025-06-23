"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "@/app/(dashboard)/_components/TestimonialForm";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    loadTestimonials();
  };

  const handleCreateOpen = () => {
    setEditing(null);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setEditing(null);
    setIsDialogOpen(false);
  };

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <Button onClick={handleCreateOpen}>Create Testimonial</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-xl'>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Testimonial" : "Create Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            onCreate={() => {
              loadTestimonials();
              handleClose();
            }}
            onUpdate={() => {
              loadTestimonials();
              handleClose();
            }}
            editingTestimonial={editing}
            clearEdit={handleClose}
          />
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>A list of testimonials.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Loation</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((testimonial: any) => (
            <TableRow key={testimonial.id}>
              <TableCell>
                <Image
                  src={testimonial.img || "/assets/defaultAvater.png"}
                  className='rounded-full aspect-square object-cover'
                  alt={testimonial.name}
                  width={30}
                  height={30}
                />
              </TableCell>
              <TableCell>{testimonial.name}</TableCell>
              <TableCell>{testimonial.location}</TableCell>
              <TableCell>{testimonial.rating}</TableCell>
              <TableCell>
                {testimonial.comment.length > 50
                  ? `${testimonial.comment.slice(0, 50)}...`
                  : testimonial.comment}
              </TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size='icon'>...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditing(testimonial);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Button className='w-full !opacity-70 hover:!opacity-100'>
                        Edit
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Button className='w-full bg-red-500 opacity-70 hover:opacity-100 hover:!bg-red-500'>
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
