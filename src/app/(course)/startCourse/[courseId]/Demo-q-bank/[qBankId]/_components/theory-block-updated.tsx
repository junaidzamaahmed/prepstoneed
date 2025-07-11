"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen } from "lucide-react"
import { TheoryDisplay } from "./theory-display"

interface TheoryBlockType {
  id: string
  content: string
  position: number
  isCompleted?: boolean
}

interface TheoryBlockProps {
  theoryBlocks: TheoryBlockType[]
}

export function TheoryBlock({ theoryBlocks }: TheoryBlockProps) {
  // Sort by position as defined in the schema
  const sortedBlocks = [...theoryBlocks].sort((a, b) => a.position - b.position)

  if (!sortedBlocks || sortedBlocks.length === 0) {
    return (
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <BookOpen className="mx-auto h-8 w-8 text-blue-400 mb-2" />
        <p className="text-blue-600">No theory content available</p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <Accordion type="single" collapsible className="space-y-2">
        {sortedBlocks.map((block, index) => (
          <AccordionItem key={block.id} value={block.id} className="border rounded-md bg-white">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium text-xs">
                    {index + 1}
                  </div>
                  <span className="text-left font-medium text-gray-900">Theory Block {index + 1}</span>
                  <Badge variant="outline" className="text-xs">
                    Position {block.position}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {block.isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done
                    </Badge>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <TheoryDisplay content={block.content} isCompleted={block.isCompleted} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
