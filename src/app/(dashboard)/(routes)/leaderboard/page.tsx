import { db } from "@/lib/db";
import LeaderboardClient, {
  LeaderboardEntry,
} from "./_components/leaderboard-client";

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
      },
    },
  });

  const leaderboardData = quizzes.map((quiz) => {
    const exceptUserIds =
      quiz.leaderboardInfo?.exceptUsers.map((u) => u.userId) || [];

    // Group attempts by user and get the best score and total attempts
    const userBestScores = quiz.attempts.reduce((acc: any, attempt: any) => {
      if (!exceptUserIds.includes(attempt.user.id)) {
        if (!acc[attempt.user.id]) {
          acc[attempt.user.id] = {
            userId: attempt.user.id,
            fullName: attempt.user.fullName,
            email: attempt.user.email,
            score: attempt.score,
            percentage: attempt.percentage,
            attempts: 1,
          };
        } else if (attempt.score > acc[attempt.user.id].score) {
          acc[attempt.user.id].score = attempt.score;
          acc[attempt.user.id].percentage = attempt.percentage;
          acc[attempt.user.id].attempts += 1;
        } else {
          acc[attempt.user.id].attempts += 1;
        }
      }
      return acc;
    }, {});

    const leaderboard = Object.values(userBestScores);

    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      leaderboard: leaderboard.slice(
        0,
        quiz.leaderboardInfo?.limit || Infinity
      ) as LeaderboardEntry[],
    };
  });

  return leaderboardData;
}

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();

  return <LeaderboardClient initialData={leaderboardData} />;
}
