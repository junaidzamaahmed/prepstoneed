import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { getQBanks } from "@/actions/get-qbanks"
import { QBankChapters } from "./_components/qbank-chapters"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users } from "lucide-react"

interface QBankPageProps {
  params: Promise<{ courseId: string; qBankId: string }>
}

export default async function QBankPage({ params }: QBankPageProps) {
  const { userId } = auth()
  const { courseId, qBankId } = await params

  // Redirect if not authenticated
  if (!userId) {
    redirect("/sign-in")
  }

  let user = null
  try {
    user = await db.user.findUnique({
      where: { externalId: userId },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    redirect("/error")
  }

  // Redirect if user not found in database
  if (!user) {
    redirect("/")
  }

  let qbank
  try {
    qbank = await getQBanks({
      qBankId,
      courseId,
      userId: user.id,
    })
  } catch (error) {
    console.error("Error fetching qbank:", error)
    redirect("/error")
  }

  // Redirect if qbank or course not found
  if (!qbank?.qbank || !qbank?.course) {
    redirect("/courses")
  }

  const chapterCount = qbank.qbank.chapters?.length || 0
  const totalQuestions =
    qbank.qbank.chapters?.reduce((total, chapter) => total + (chapter.quizzes?.length || 0), 0) || 0

  return (
    <div className="flex flex-col max-w-6xl mx-auto pb-20 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{qbank.qbank.title}</h1>
                  <p className="text-blue-100 mb-4">Course: {qbank.course.title}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">
                        {chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {totalQuestions} {totalQuestions === 1 ? "Question" : "Questions"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Question Bank
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {chapterCount > 0 ? (
          <QBankChapters chapters={qbank.qbank.chapters} />
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Chapters Available</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                This question bank doesn&apos;t have any chapters yet. Check back later or contact your instructor.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
