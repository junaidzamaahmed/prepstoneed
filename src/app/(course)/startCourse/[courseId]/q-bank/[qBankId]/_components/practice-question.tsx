"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HelpCircle, Lightbulb, Eye } from "lucide-react"

type Answer = {
  id: string
  text: string
  isCorrect: boolean
  questionId: string
}

type Question = {
  answers: Answer[]
  id: string
  sectionId: string | null
  chapterId: string | null
  question: string
  explanation: string | null
}

interface PracticeQuestionsProps {
  questions: Question[]
}

export function PracticeQuestions({ questions }: PracticeQuestionsProps) {
  const [viewedQuestions, setViewedQuestions] = useState<Record<string, boolean>>({})

  const handleViewQuestion = (questionId: string) => {
    setViewedQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }))
  }

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <Accordion type="single" collapsible className="space-y-3">
        {questions.map((question, index) => {
          const isViewed = viewedQuestions[question.id]

          return (
            <AccordionItem key={question.id} value={question.id} className="border rounded-md bg-white">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-medium text-xs">
                      {index + 1}
                    </div>
                    <span className="text-left font-medium text-gray-900">Question {index + 1}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  {/* Question Title */}
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="prose prose-sm max-w-none">
                      <div
                        dangerouslySetInnerHTML={{ __html: question.question }}
                        className="text-gray-900 font-medium leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Explanation - Always visible */}
                  {question.explanation && (
                    <Card className="ml-7 p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-blue-900 mb-1">Explanation</h5>
                          <div
                            className="prose prose-sm max-w-none text-blue-800"
                            dangerouslySetInnerHTML={{ __html: question.explanation }}
                          />
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* View Answer Button */}
                  {!isViewed && (
                    <div className="flex gap-2 ml-7">
                      <Button
                        onClick={() => handleViewQuestion(question.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Answer
                      </Button>
                    </div>
                  )}

                  {/* Answer - Only visible after clicking button */}
                  {isViewed && question.answers[0] && (
                    <Card className="ml-7 p-4 bg-gray-50 border-gray-200">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Answer</h5>
                          <div
                            className="prose prose-sm max-w-none text-gray-800"
                            dangerouslySetInnerHTML={{ __html: question.answers[0].text }}
                          />
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
