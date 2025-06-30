"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, HelpCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface PracticeQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  isCompleted?: boolean
}

interface PracticeQuestionsProps {
  questions: PracticeQuestion[]
}

export function PracticeQuestions({ questions }: PracticeQuestionsProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState<Record<string, boolean>>({})

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleSubmitAnswer = (questionId: string) => {
    setShowResults((prev) => ({
      ...prev,
      [questionId]: true,
    }))
  }

  const resetQuestion = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev }
      delete newAnswers[questionId]
      return newAnswers
    })
    setShowResults((prev) => {
      const newResults = { ...prev }
      delete newResults[questionId]
      return newResults
    })
  }

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <Accordion type="single" collapsible className="space-y-3">
        {questions.map((question, index) => {
          const selectedAnswer = selectedAnswers[question.id]
          const showResult = showResults[question.id]
          const isCorrect = selectedAnswer === question.correctAnswer

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
                  <div className="flex items-center gap-2">
                    {question.isCompleted && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {showResult && (
                      <Badge
                        variant={isCorrect ? "default" : "destructive"}
                        className={cn("text-xs", isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Incorrect
                          </>
                        )}
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  {/* Question */}
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-900 font-medium leading-relaxed">{question.question}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 ml-7">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex
                      const isCorrectOption = optionIndex === question.correctAnswer

                      return (
                        <Card
                          key={optionIndex}
                          className={cn(
                            "p-3 cursor-pointer transition-all duration-200 hover:shadow-sm",
                            !showResult && isSelected && "ring-2 ring-blue-500 bg-blue-50",
                            showResult && isCorrectOption && "ring-2 ring-green-500 bg-green-50",
                            showResult && isSelected && !isCorrectOption && "ring-2 ring-red-500 bg-red-50",
                            !showResult && !isSelected && "hover:bg-gray-50",
                          )}
                          onClick={() => !showResult && handleAnswerSelect(question.id, optionIndex)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium",
                                !showResult && isSelected && "border-blue-500 bg-blue-500 text-white",
                                showResult && isCorrectOption && "border-green-500 bg-green-500 text-white",
                                showResult && isSelected && !isCorrectOption && "border-red-500 bg-red-500 text-white",
                                !showResult && !isSelected && "border-gray-300",
                              )}
                            >
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span className="text-gray-900">{option}</span>
                            {showResult && isCorrectOption && (
                              <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                            )}
                            {showResult && isSelected && !isCorrectOption && (
                              <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                            )}
                          </div>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 ml-7">
                    {!showResult ? (
                      <Button
                        onClick={() => handleSubmitAnswer(question.id)}
                        disabled={selectedAnswer === undefined}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button onClick={() => resetQuestion(question.id)} variant="outline">
                        Try Again
                      </Button>
                    )}
                  </div>

                  {/* Explanation */}
                  {showResult && question.explanation && (
                    <Card className="ml-7 p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-blue-900 mb-1">Explanation</h5>
                          <p className="text-blue-800 text-sm leading-relaxed">{question.explanation}</p>
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
