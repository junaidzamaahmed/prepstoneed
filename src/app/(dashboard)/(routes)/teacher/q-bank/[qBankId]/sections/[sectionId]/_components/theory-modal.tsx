"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import type { TheoryBlock } from "@prisma/client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Editor } from "@/components/editor"


interface TheoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  qBankId: string
  chapterId: string
  editingTheory?: TheoryBlock | null
}

const formSchema = z.object({
  content: z.string().min(5, "Content must be at least 5 characters long"),
})

export const TheoryModal = ({ isOpen, onClose, onSuccess, qBankId, chapterId, editingTheory }: TheoryModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  useEffect(() => {
    if (editingTheory) {
      form.setValue("content", editingTheory.content)
    } else {
      form.reset({ content: "" })
    }
  }, [editingTheory, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingTheory) {
        await axios.patch(`/api/qbanks/${qBankId}/chapter/${chapterId}/theory/${editingTheory.id}`, values)
        toast.success("Theory updated successfully")
      } else {
        await axios.post(`/api/qbanks/${qBankId}/chapter/${chapterId}/theory`, values)
        toast.success("Theory created")
      }
      onSuccess()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingTheory ? "Edit Theory" : "Add a Theory"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="min-h-[400px]">
                      <Editor
                        placeholder="Enter theory content..."
                        disabled={isSubmitting}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2 justify-end">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingTheory ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
