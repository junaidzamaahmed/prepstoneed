import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuizViewer } from "./_components/quiz-viewer"

interface TheoryPageProps {
  params: Promise<{
    courseId: string
    qBankId: string
    chapterId: string
  }>
  searchParams: Promise<{ page?: string }>
}

export default async function TheoryPage({ params, searchParams }: TheoryPageProps) {
  const { userId } = auth()
  const { courseId, qBankId, chapterId } = await params
  const { page } = await searchParams

  // Fetch chapter with quizzes
  let chapterData
  try {
    chapterData = await db.qBankChapter.findUnique({
      where: { id: chapterId },
      include: {
        quizzes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })
  } catch (error) {
    console.error("Error fetching chapter:", error)
    redirect("/error")
  }

  if (!chapterData) {
    redirect(`/startCourse/${courseId}/qbanks/${qBankId}`)
  }

  const quizzes = chapterData.quizzes || []

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/startCourse/${courseId}/qbanks/${qBankId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Q-Bank
            </Link>
          </Button>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{chapterData.title} - Quizzes</h1>
            <p className="text-sm text-gray-500">
              {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"} available
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <QuizViewer quizzes={quizzes} courseId={courseId} qBankId={qBankId} chapterId={chapterId} />
    </div>
  )
}
