"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Trophy, Medal, Award, ArrowUpDown, Search } from "lucide-react";

interface LeaderboardEntry {
  attemptId: string;
  userId: string;
  fullName: string | null;
  email: string;
  score: number;
  percentage: number;
}

interface QuizLeaderboard {
  quizId: string;
  quizTitle: string;
  leaderboard: LeaderboardEntry[];
}

type SortOrder = "highToLow" | "lowToHigh";

export default function LeaderboardClient({
  initialData,
}: {
  initialData: QuizLeaderboard[];
}) {
  const [selectedQuiz, setSelectedQuiz] = useState<string>(
    initialData[0]?.quizId || ""
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("highToLow");
  const [quizSearch, setQuizSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const handleQuizChange = (quizId: string) => {
    setSelectedQuiz(quizId);
    setUserSearch("");
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "highToLow" ? "lowToHigh" : "highToLow"
    );
  };

  const filteredQuizzes = useMemo(() => {
    return initialData.filter((quiz) =>
      quiz.quizTitle.toLowerCase().includes(quizSearch.toLowerCase())
    );
  }, [initialData, quizSearch]);

  const currentQuiz = initialData.find((quiz) => quiz.quizId === selectedQuiz);

  const filteredAndSortedLeaderboard = useMemo(() => {
    let leaderboard = currentQuiz?.leaderboard || [];

    // Filter users
    if (userSearch) {
      leaderboard = leaderboard.filter(
        (entry) =>
          (entry.fullName &&
            entry.fullName.toLowerCase().includes(userSearch.toLowerCase())) ||
          entry.email.toLowerCase().includes(userSearch.toLowerCase())
      );
    }

    // Sort
    return leaderboard.sort((a, b) =>
      sortOrder === "highToLow" ? b.score - a.score : a.score - b.score
    );
  }, [currentQuiz, userSearch, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Select a Test</CardTitle>
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  placeholder="Search tests..."
                  value={quizSearch}
                  onChange={(e) => setQuizSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2">
                  {filteredQuizzes.map((quiz) => (
                    <Button
                      key={quiz.quizId}
                      variant={
                        selectedQuiz === quiz.quizId ? "default" : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => handleQuizChange(quiz.quizId)}
                    >
                      {quiz.quizTitle}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{currentQuiz?.quizTitle} Leaderboard</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleSortOrder}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Sort{" "}
                  {sortOrder === "highToLow" ? "High to Low" : "Low to High"}
                </Button>
              </CardTitle>
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  placeholder="Search users by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Accuracy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedLeaderboard.map((entry, index) => (
                      <TableRow
                        key={entry.attemptId}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            {sortOrder === "highToLow" && (
                              <>
                                {index === 0 && (
                                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                                )}
                                {index === 1 && (
                                  <Medal className="w-5 h-5 text-gray-400 mr-2" />
                                )}
                                {index === 2 && (
                                  <Award className="w-5 h-5 text-amber-600 mr-2" />
                                )}
                                {index > 2 && (
                                  <span className="w-5 mr-2 text-center">
                                    {index + 1}
                                  </span>
                                )}
                              </>
                            )}
                            {sortOrder === "lowToHigh" && (
                              <span className="w-5 mr-2 text-center">
                                {filteredAndSortedLeaderboard.length - index}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {entry.fullName || "Anonymous"}
                        </TableCell>
                        <TableCell>{entry.score.toFixed(2)}</TableCell>
                        <TableCell>{entry.percentage.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
