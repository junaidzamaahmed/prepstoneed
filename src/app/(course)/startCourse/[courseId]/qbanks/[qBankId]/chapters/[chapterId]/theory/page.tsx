import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { TheoryViewer } from "./_components/theory-viewer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

  // Fetch chapter with theory blocks
  let chapter
  try {
    chapter = await db.qBankChapter.findUnique({
      where: { id: chapterId },
      include: {
        theoryBlocks: {
          orderBy: { position: "asc" },
        },
        qbank: {
          include: {
            courseRelations:{
              include:{
                course: true
              }
            }
          },
        },
      },
    })
  } catch (error) {
    console.error("Error fetching chapter:", error)
    redirect("/error")
  }

  if (!chapter || !chapter.qbank) {
    redirect(`/startCourse/${courseId}/qbanks/${qBankId}`)
  }

  const currentPage = Number.parseInt(page || "1")
  const theoryBlocks = chapter.theoryBlocks || []

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
            <h1 className="text-2xl font-bold text-gray-900">{chapter.title} - Theory</h1>
            {/* <p className="text-gray-600">Course: {chapter.qbank.courseRelations.course.title}</p> */}
            <p className="text-sm text-gray-500">
              {theoryBlocks.length} theory {theoryBlocks.length === 1 ? "block" : "blocks"} available
            </p>
          </div>
        </div>
      </div>

      {/* Theory Content */}
      <TheoryViewer
        theoryBlocks={theoryBlocks}
        currentPage={currentPage}
        courseId={courseId}
        qBankId={qBankId}
        chapterId={chapterId}
      />
    </div>
  )
}
