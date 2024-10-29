"use client";

import React, { useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Quiz, QuizAttempt, User } from "@prisma/client";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  totalStudents: number;
  totalAttempts: number;
  averageScore: number;
  //   quizzesByCategory: { categoryId: string | null; _count: number }[];
  students: {
    id: string;
    fullName: string | null;
    email: string;
    quizAttempts: any;
  }[];
  quizzes: (Quiz & {
    attempts: (QuizAttempt & {
      user: User;
    })[];
  })[];
}

interface StudentAttempt {
  id: string;
  quizTitle: string;
  score: number;
  percentage: number;
  completed: boolean;
}

export default function AdminAnalyticsDashboard({
  initialData,
}: {
  initialData: AnalyticsData;
}) {
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsData>(initialData);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [studentAttempts, setStudentAttempts] = useState<StudentAttempt[]>([]);
  const [searchTermStudent, setSearchTermStudent] = useState("");
  const [searchTermQuiz, setSearchTermQuiz] = useState("");

  const handleStudentSelect = async (studentId: string) => {
    setSelectedStudent(studentId);
    setStudentAttempts((prev: any) => {
      const student = analyticsData.students.find((s) => s.id === studentId);
      if (student && student.quizAttempts) {
        return student?.quizAttempts?.map(
          (attempt: QuizAttempt & { quiz: Quiz & { category: Category } }) => ({
            id: attempt.id,
            quizTitle: attempt.quiz.title,
            score: attempt.score,
            percentage: attempt.percentage,
            completed: attempt.completed,
          })
        );
      }
      return [];
    });
  };

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId);
  };

  const filteredStudents = analyticsData.students.filter(
    (student) =>
      student?.fullName
        ?.toLowerCase()
        .includes(searchTermStudent.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTermStudent.toLowerCase())
  );

  const filteredQuizzes = analyticsData.quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTermQuiz.toLowerCase())
  );

  //   const quizCategoryData = {
  //     labels: analyticsData.quizzesByCategory.map(
  //       (q) => q.categoryId || "Uncategorized"
  //     ),
  //     datasets: [
  //       {
  //         data: analyticsData.quizzesByCategory.map((q) => q._count),
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.6)",
  //           "rgba(54, 162, 235, 0.6)",
  //           "rgba(255, 206, 86, 0.6)",
  //           "rgba(75, 192, 192, 0.6)",
  //           "rgba(153, 102, 255, 0.6)",
  //         ],
  //       },
  //     ],
  //   };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Analytics Dashboard</h1>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exams">Exam Performance</TabsTrigger>
          <TabsTrigger value="students">Student Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {analyticsData.totalStudents}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {analyticsData.totalAttempts}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {analyticsData.averageScore.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Quizzes by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Pie data={quizCategoryData} />
              </CardContent>
            </Card>
          </div> */}
        </TabsContent>
        <TabsContent value="exams">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Exam List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search exams..."
                    value={searchTermQuiz}
                    onChange={(e) => setSearchTermQuiz(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {filteredQuizzes.map((quiz) => (
                      <Button
                        key={quiz.id}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleQuizSelect(quiz.id)}
                      >
                        {quiz.title}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Exam Performance</CardTitle>
                <p className="text-xs">
                  {selectedQuiz
                    ? `${
                        filteredQuizzes.find((quiz) => quiz.id === selectedQuiz)
                          ?.title
                      }`
                    : "Select an exam to view student attempts"}
                </p>
              </CardHeader>
              <CardContent>
                {selectedQuiz ? (
                  <Table>
                    <ScrollArea className="h-[400px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Reports</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredQuizzes
                          .find((quiz) => quiz.id === selectedQuiz)
                          ?.attempts.map((attempt) => (
                            <TableRow key={attempt.id}>
                              <TableCell>
                                {attempt.user.fullName}
                                <p className="text-xs">{attempt.user.email}</p>
                              </TableCell>
                              <TableCell>{attempt.score}</TableCell>
                              <TableCell>
                                {attempt.percentage.toFixed(2)}%
                              </TableCell>
                              <TableCell>
                                {attempt.completed
                                  ? "Completed"
                                  : "In Progress"}
                              </TableCell>
                              <TableCell>
                                <Button variant="link" asChild>
                                  <Link
                                    target="_blank"
                                    href={`/reports/${attempt.id}`}
                                  >
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </ScrollArea>
                  </Table>
                ) : (
                  <p>Select an exam to view student attempts</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Student List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search students..."
                    value={searchTermStudent}
                    onChange={(e) => setSearchTermStudent(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {filteredStudents.map((student) => (
                      <Button
                        key={student.id}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleStudentSelect(student.id)}
                      >
                        {student.fullName}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <p className="text-xs">
                  {selectedStudent
                    ? `${
                        filteredStudents.find(
                          (student) => student.id === selectedStudent
                        )?.email
                      }`
                    : "Select a student to view their performance"}
                </p>
              </CardHeader>
              <CardContent>
                {selectedStudent ? (
                  <Table>
                    <ScrollArea className="h-[400px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Quiz</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Reports</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentAttempts.map((attempt) => (
                          <TableRow key={attempt?.id}>
                            <TableCell>{attempt?.quizTitle}</TableCell>
                            <TableCell>{attempt?.score}</TableCell>
                            <TableCell>
                              {attempt?.percentage?.toFixed(2)}%
                            </TableCell>
                            <TableCell>
                              {attempt?.completed ? "Completed" : "In Progress"}
                            </TableCell>
                            <TableCell>
                              <Button variant="link" asChild>
                                <Link
                                  target="_blank"
                                  href={`/reports/${attempt?.id}`}
                                >
                                  View
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </ScrollArea>
                  </Table>
                ) : (
                  <p>Select a student to view their performance</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
