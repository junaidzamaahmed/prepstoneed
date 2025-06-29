"use client"
import axios from "axios"
import { Loader2, PlusCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { QBankChapter, TheoryBlock } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TheoryList } from "./theory-list"
import { TheoryModal } from "./theory-modal"

interface TheoryFormProps {
  initialData: QBankChapter & { theoryBlocks: TheoryBlock[] }
  qBankId: string
  chapterId: string
}

export const TheoryForm = ({ initialData, qBankId, chapterId }: TheoryFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTheory, setEditingTheory] = useState<TheoryBlock | null>(null)

  const router = useRouter()

  const onEdit = (theory: TheoryBlock) => {
    setEditingTheory(theory)
    setIsModalOpen(true)
  }

  const onDelete = async (id: string) => {
    try {
      setIsUpdating(true)
      await axios.delete(`/api/qbanks/${qBankId}/chapter/${chapterId}/theory/${id}`)
      toast.success("Theory deleted successfully")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsUpdating(false)
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)
      await axios.put(`/api/qbanks/${qBankId}/chapter/${chapterId}/theory/reorder`, {
        list: updateData,
      })
      toast.success("Sections reordered")
      router.refresh()
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingTheory(null)
  }

  const handleModalSuccess = () => {
    handleModalClose()
    router.refresh()
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between">
        Chapters
        <Button onClick={() => setIsModalOpen(true)} variant="ghost">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add a Theory
        </Button>
      </div>

      <div className={cn("text-sm mt-2", !initialData.theoryBlocks.length && "text-slate-500 italic")}>
        {!initialData.theoryBlocks.length && "No Chapters"}
        <TheoryList onReorder={onReorder} onEdit={onEdit} onDelete={onDelete} items={initialData.theoryBlocks || []} />
      </div>

      {initialData.theoryBlocks.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">Drag and drop to reorder the theory</p>
      )}

      <TheoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        qBankId={qBankId}
        chapterId={chapterId}
        editingTheory={editingTheory}
      />
    </div>
  )
}
