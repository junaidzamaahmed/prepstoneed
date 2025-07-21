"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "katex/dist/katex.min.css";
import "react-quill/dist/quill.snow.css";

interface TheoryBlock {
  id: string;
  title: string;
  content: string;
  position: number;
}

interface TheoryViewerProps {
  theoryBlocks: TheoryBlock[];
  currentPage: number;
  courseId: string;
  qBankId: string;
  chapterId: string;
}

const ITEMS_PER_PAGE = 4;

export function TheoryViewer({
  theoryBlocks,
  currentPage,
  courseId,
  qBankId,
  chapterId,
}: TheoryViewerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ensure KaTeX is available for formula rendering
    if (typeof window !== "undefined") {
      import("katex").then((katex) => {
        window.katex = katex.default;
      });
    }
  }, []);

  if (!theoryBlocks || theoryBlocks.length === 0) {
    return (
      <div className='text-center py-12'>
        <BookOpen className='mx-auto h-12 w-12 text-gray-400 mb-4' />
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No theory content available
        </h3>
        <p className='text-gray-500'>
          This chapter doesn&apos;t have any theory blocks yet.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(theoryBlocks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlocks = theoryBlocks.slice(startIndex, endIndex);

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handleNavigation = (page: number) => {
    setIsLoading(true);
    router.push(
      `/startCourse/${courseId}/qbanks/${qBankId}/chapters/${chapterId}/theory?page=${page}`
    );
  };

  return (
    <div className='space-y-6'>
      {/* Progress Bar */}
      <div className='bg-white rounded-lg border p-4'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-medium text-gray-700'>Progress</span>
          <span className='text-sm text-gray-500'>
            Page {currentPage} of {totalPages} ({theoryBlocks.length} total
            blocks)
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Theory Blocks */}
      <div className='space-y-6'>
        {currentBlocks.map((block, index) => {
          const globalIndex = startIndex + index;
          return (
            <Card key={block.id} className='shadow-sm'>
              <CardContent className='p-8'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>

                      <h2 className='text-xl font-semibold text-gray-900'>
                        {block.title}
                      </h2>

                  </div>
                </div>

                {/* Theory Content */}
                <div className='prose prose-sm max-w-none'>
                  <div
                    className='ql-editor text-gray-700 leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: block.content }}
                    style={{
                      padding: 0,
                      fontSize: "15px",
                      lineHeight: "1.7",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className='flex items-center justify-between bg-white rounded-lg border p-4'>
        <Button
          variant='outline'
          onClick={() => handleNavigation(currentPage - 1)}
          disabled={!hasPrevious || isLoading}
          className='flex items-center gap-2'
        >
          <ChevronLeft className='w-4 h-4' />
          Previous
        </Button>

        <div className='flex items-center gap-2'>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size='sm'
                onClick={() => handleNavigation(pageNum)}
                disabled={isLoading}
                className='w-8 h-8 p-0'
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant='outline'
          onClick={() => handleNavigation(currentPage + 1)}
          disabled={!hasNext || isLoading}
          className='flex items-center gap-2'
        >
          Next
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>


      {/* Action Buttons */}
      <div className='flex gap-3'>
        <Button asChild className='flex-1'>
          <Link href={`/startCourse/${courseId}/qbanks/${qBankId}`}>
            Back to Chapters
          </Link>
        </Button>
      </div>
    </div>
  );
}
