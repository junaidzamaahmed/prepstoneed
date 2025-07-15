"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface TheoryBlockType {
  id: string
  title: string
  content: string
  position: number
  // isCompleted?: boolean // This might come from user progress tracking
}

interface TheoryBlockProps {
  theoryBlocks: TheoryBlockType[]
}

export function TheoryBlock({ theoryBlocks }: TheoryBlockProps) {
  // Sort by position
  const sortedBlocks = [...theoryBlocks].sort((a, b) => a.position - b.position)

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
                  <span className="text-left font-medium text-gray-900">{block.title}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="prose prose-sm max-w-none">
                <div
                  className="text-gray-700 leading-relaxed ql-editor"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
