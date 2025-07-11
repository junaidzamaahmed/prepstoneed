"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BookOpen, HelpCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Quiz, TheoryBlock } from "@prisma/client";

interface Chapter {
  id: string;
  title: string;
  description?: string;
  theoryBlocks?: TheoryBlock[];
  quizzes?: Quiz[];
}

interface QBankChaptersProps {
  chapters: Chapter[];
}

export function QBankChapters({ chapters }: QBankChaptersProps) {
  const params = useParams();
  const { courseId, qBankId } = params;

  if (!chapters || chapters.length === 0) {
    return (
      <div className='text-center py-12'>
        <BookOpen className='mx-auto h-12 w-12 text-gray-400 mb-4' />
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No chapters available
        </h3>
        <p className='text-gray-500'>
          This qbank does not have any chapters yet.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Chapters</h2>

      <Accordion type='single' collapsible className='space-y-4'>
        {chapters.map((chapter, index) => (
          <AccordionItem
            key={chapter.id}
            value={chapter.id}
            className='border rounded-lg bg-white shadow-sm'
          >
            <AccordionTrigger className='px-6 py-4 hover:no-underline'>
              <div className='flex items-center justify-between w-full mr-4'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm'>
                    {index + 1}
                  </div>
                  <div className='text-left'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {chapter.title}
                    </h3>
                    {chapter.description && (
                      <p className='text-sm text-gray-500 mt-1'>
                        {chapter.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <BookOpen className='w-3 h-3' />
                    {chapter.theoryBlocks?.length || 0}
                    <HelpCircle className='w-3 h-3 ml-2' />
                    {chapter.quizzes?.length || 0}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-6'>
              <div className='grid md:grid-cols-2 gap-4'>
                {/* Theory Section */}
                <Card className='hover:shadow-md transition-shadow'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 bg-blue-100 rounded-lg'>
                        <BookOpen className='w-5 h-5 text-blue-600' />
                      </div>
                      <div>
                        <h4 className='text-lg font-semibold text-gray-900'>
                          Theory
                        </h4>
                        <p className='text-sm text-gray-500'>
                          {chapter.theoryBlocks?.length || 0} theory blocks
                        </p>
                      </div>
                    </div>

                    {chapter.theoryBlocks && chapter.theoryBlocks.length > 0 ? (
                      <div className='space-y-3'>
                        <p className='text-sm text-gray-600'>
                          Learn the fundamental concepts and principles for this
                          chapter.
                        </p>
                        <Button asChild className='w-full'>
                          <Link
                            href={`/startCourse/${courseId}/qbanks/${qBankId}/chapters/${chapter.id}/theory`}
                          >
                            Start Learning
                            <ArrowRight className='w-4 h-4 ml-2' />
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className='text-center py-4'>
                        <p className='text-sm text-gray-500'>
                          No theory content available
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Questions Section */}
                <Card className='hover:shadow-md transition-shadow'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 bg-green-100 rounded-lg'>
                        <HelpCircle className='w-5 h-5 text-green-600' />
                      </div>
                      <div>
                        <h4 className='text-lg font-semibold text-gray-900'>
                          Practice Tests
                        </h4>
                        <p className='text-sm text-gray-500'>
                          {chapter?.quizzes?.length || 0} practice questions
                        </p>
                      </div>
                    </div>

                    {chapter.quizzes && chapter.quizzes.length > 0 ? (
                      <div className='space-y-3'>
                        <p className='text-sm text-gray-600'>
                          Test your understanding with practice questions and
                          detailed explanations.
                        </p>
                        {chapter.quizzes.map((question) => (
                          <Button
                            asChild
                            variant='outline'
                            className='w-full border-green-200 hover:bg-green-50 bg-transparent'
                            key={question.id}
                          >
                            <Link
                              href={`/startTest/${question.id}`}
                            >
                              {question.title}
                              <ArrowRight className='w-4 h-4 ml-2' />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-4'>
                        <p className='text-sm text-gray-500'>
                          No questions available
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
