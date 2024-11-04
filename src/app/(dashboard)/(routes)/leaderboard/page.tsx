import { db } from "@/lib/db";
import LeaderboardClient from "./_components/leaderboard-client";

async function getLeaderboardData() {
  const quizzes = await db.quiz.findMany({
    where: {
      leaderboardInfo: {
        show: true,
      },
    },
    include: {
      leaderboardInfo: {
        include: {
          exceptUsers: {
            select: {
              userId: true,
            },
          },
        },
      },
      attempts: {
        where: {
          completed: true,
        },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
        orderBy: {
          score: "desc",
        },
      },
    },
  });

  const leaderboardData = quizzes.map((quiz) => {
    const exceptUserIds =
      quiz.leaderboardInfo?.exceptUsers.map((u) => u.userId) || [];
    const filteredAttempts = quiz.attempts
      .filter((attempt) => !exceptUserIds.includes(attempt.user.id))
      .slice(0, quiz.leaderboardInfo?.limit || Infinity)
      .map((attempt) => ({
        attemptId: attempt.id,
        userId: attempt.user.id,
        email: attempt.user.email,
        fullName: attempt.user.fullName,
        score: attempt.score,
        percentage: attempt.percentage,
      }));

    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      leaderboard: filteredAttempts,
    };
  });

  return leaderboardData;
}

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();

  return <LeaderboardClient initialData={leaderboardData} />;
}
