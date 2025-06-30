"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TheoryBlock } from "./theory-block"

import { BookOpen, HelpCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PracticeQuestions } from "./practice-question"

interface Chapter {
  id: string
  title: string
  description?: string
  theoryBlocks?: TheoryBlockType[]
  practiceQuestions?: PracticeQuestion[]
  isCompleted?: boolean
}

interface TheoryBlockType {
  id: string
  title: string
  content: string
  position: number
  // isCompleted?: boolean
}

interface PracticeQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  isCompleted?: boolean
}

interface QBankChaptersProps {
  chapters: Chapter[]
}

export function QBankChapters({ chapters }: QBankChaptersProps) {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No chapters available</h3>
        <p className="text-gray-500">This qbank does not have any chapters yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Chapters</h2>

      <Accordion type="single" collapsible className="space-y-4">
        {chapters.map((chapter, index) => (
          <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{chapter.title}</h3>
                    {chapter.description && <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {chapter.isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <BookOpen className="w-3 h-3" />
                    {chapter.theoryBlocks?.length || 0}
                    <HelpCircle className="w-3 h-3 ml-2" />
                    {chapter.practiceQuestions?.length || 0}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {/* Theory Blocks Section */}
                {chapter.theoryBlocks && chapter.theoryBlocks.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-medium text-gray-900">Theory</h4>
                      <Badge variant="outline">{chapter.theoryBlocks.length} blocks</Badge>
                    </div>
                    <TheoryBlock theoryBlocks={chapter.theoryBlocks} />
                  </div>
                )}

                {/* Practice Questions Section */}
                {chapter.practiceQuestions && chapter.practiceQuestions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      <h4 className="text-lg font-medium text-gray-900">Practice Questions</h4>
                      <Badge variant="outline">{chapter.practiceQuestions.length} questions</Badge>
                    </div>
                    <PracticeQuestions questions={chapter.practiceQuestions} />
                  </div>
                )}

                {/* Empty State */}
                {(!chapter.theoryBlocks || chapter.theoryBlocks.length === 0) &&
                  (!chapter.practiceQuestions || chapter.practiceQuestions.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No content available for this chapter yet.</p>
                    </div>
                  )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
