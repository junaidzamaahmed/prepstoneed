"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowRight } from "lucide-react"
import type { Quiz } from "@prisma/client"

interface QuizViewerProps {
  quizzes: Quiz[]
  courseId: string
  qBankId: string
  chapterId: string
}

export function QuizViewer({ quizzes, courseId, qBankId, chapterId }: QuizViewerProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Quizzes Available</h3>
        <p className="text-gray-500">There are no quizzes in this chapter yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className={`transition-all duration-200 hover:shadow-md cursor-pointer border-2 ${
              selectedQuiz === quiz.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedQuiz(quiz.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-1 capitalize">{quiz.title}</CardTitle>
                  {quiz.description && (
                    <CardDescription className="text-sm text-gray-600">
                      <div
                        className="prose prose-sm max-w-none [&>*]:mb-2 [&>*:last-child]:mb-0"
                        dangerouslySetInnerHTML={{ __html: quiz.description }}
                      />
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Button asChild size="sm">
                  <Link href={`/startTest/${quiz.id}/`}>
                    Start Quiz
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
