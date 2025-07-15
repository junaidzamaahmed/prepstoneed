"use client"

import type { TheoryBlock } from "@prisma/client"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import { Grip, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface TheoryListProps {
  items: TheoryBlock[]
  onReorder: (updateData: { id: string; position: number }[]) => void
  onEdit: (theory: TheoryBlock) => void
  onDelete: (id: string) => void
}

export const TheoryList = ({ items, onReorder, onEdit, onDelete }: TheoryListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [sections, setSections] = useState(items)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setSections(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedSections = items.slice(startIndex, endIndex + 1)

    setSections(items)

    const bulkUpdateData = updatedSections.map((section) => ({
      id: section.id,
      position: items.findIndex((item) => item.id === section.id),
    }))

    onReorder(bulkUpdateData)
  }

  // Strip HTML tags and get clean text preview
  const getTextPreview = (html: string, maxLength = 150) => {
    const text = html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim()
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  // Get the first heading from HTML content
  const getHeading = (html: string) => {
    const headingMatch = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i)
    if (headingMatch) {
      return headingMatch[1].replace(/<[^>]*>/g, "").trim()
    }
    return null
  }

  if (!isMounted) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((section, index) => {
              const heading = getHeading(section.content)
              const preview = getTextPreview(section.content)

              return (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      className={cn(
                        "mb-4 flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md text-sm hover:bg-slate-50 transition-colors",
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition cursor-grab active:cursor-grabbing",
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>

                      <div className="flex-1 py-3 px-2 min-w-0">
                        {heading && <div className="font-medium text-slate-900 mb-1 truncate">{heading}</div>}
                        <div className="text-slate-600 text-xs leading-relaxed">{preview}</div>
                      </div>

                      <div className="pr-2 flex items-center gap-x-1">
                        <Button
                          onClick={() => onEdit(section)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-slate-300"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Theory Block</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this theory block? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(section.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
