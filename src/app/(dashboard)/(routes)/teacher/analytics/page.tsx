import { db } from "@/lib/db";
import AdminAnalyticsDashboard from "./_components/AdminAnalyticsDashboard";

async function getAnalyticsData() {
  const totalStudents = await db.user.count({
    where: { role: "STUDENT" },
  });

  const totalAttempts = await db.quizAttempt.count();

  const averageScore = await db.quizAttempt.aggregate({
    _avg: { percentage: true },
  });

  // const categoryInfo = await db.category.findMany({
  //   include: {

  //   }
  // });

  // const quizzesByCategory = await db.quiz.groupBy({
  //   by: ["categoryId"],
  //   _count: true,
  // });
  // Count unique cateogories of quizzes
  // const quizzesByCategory = categoryInfo.map((category) => {
  //   const quizzes = category.quizzes;
  //   return {
  //     category: category.name,
  //     count: quizzes.length,
  //   };
  // });
  // const performanceByDifficulty = await db.question.aggregate({
  //   groupBy: ["difficulty"],
  //   _avg: { questions: { _avg: { responses: true } } },
  // });

  const students = await db.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      quizAttempts: {
        select: {
          id: true,
          completed: true,
          score: true,
          percentage: true,
          quiz: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  const quizzes = await db.quiz.findMany({
    include: {
      attempts: {
        include: {
          user: true,
        },
      },
    },
  });

  return {
    totalStudents,
    totalAttempts,
    averageScore: averageScore._avg.percentage || 0,
    // quizzesByCategory,
    // performanceByDifficulty,
    students,
    quizzes,
  };
}

export default async function AdminAnalyticsPage() {
  const analyticsData = await getAnalyticsData();

  return <AdminAnalyticsDashboard initialData={analyticsData} />;
}
