"use client";
import QuestionAnswer from "./question-answer";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronUp, MapPin } from "lucide-react";
import { QuizAttempt, UserResponse } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/confirm-modal";
import axios from "axios";

export default function Questions({
  attempt,
  test,
}: {
  attempt: QuizAttempt;
  test: any;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sectionNo, setSectionNo] = useState(0);
  const [section, setSection] = useState(test?.sections[sectionNo]);
  const [questions, setQuestions] = useState(section?.questions);
  const [disable, setDisable] = useState(false);
  const [selected, setSelected] = useState(
    questions && questions[currentQuestion]?.responses[0]?.selectedAnswerID
  );
  const router = useRouter();
  const toggleDisable = (val: boolean) => {
    setDisable(val);
  };
  const handleCompleteSection = async (secId: string) => {
    let completed = false;
    if (attempt.sections.includes(secId)) {
      completed = true;
    }

    setSectionNo((prev) => {
      let secNo = prev + 1;
      let temp = null;
      setSection((prev1: any) => {
        if (prev === 0 || prev === 4) {
          setDisable(true);

          // Find the total score for this section
          let score = 0;
          prev1?.questions?.forEach((question: any) => {
            question.responses?.forEach((response: any) => {
              if (response.isCorrect) {
                score++;
              }
            });
          });
          const difficulty =
            prev1?.questions?.length - score > 8
              ? "EASY"
              : prev1?.questions?.length - score > 4
              ? "MEDIUM"
              : "HARD";
          const possibleSections =
            prev === 0 ? test?.sections?.slice(1, 4) : test?.sections?.slice(5);
          secNo =
            possibleSections?.findIndex(
              (section: any) => section.difficulty === difficulty
            ) + (prev === 0 ? 1 : 5);
          temp = test.sections[secNo];
          setQuestions(temp?.questions);
          toast.info("Please wait.");
          attempt.sections.push(prev1.id);
          toast.info("Section completed");
          setDisable(false);
          return temp;
        } else if (prev < 4) {
          setDisable(true);
          secNo = 4;
          setDisable(false);
          setQuestions(test.sections[4].questions);
          return test.sections[4];
        } else {
          completeTest();
        }
      });
      setCurrentQuestion(0);
      return secNo;
    });
    if (!completed) {
      await axios.put(`/api/attempt/${attempt.id}/${secId}`);
    }
  };
  if (test?.completed) {
    router.push(`/reports/${attempt.id}`);
  }
  const completeTest = async () => {
    try {
      setDisable(true);
      await axios.put(`/api/completeTest/${attempt.id}`);
      router.push(`/reports/${attempt.id}`);
      toast.success("Test completed");
      setDisable(false);
    } catch (e) {
      toast.error("Error completing test");
    }
  };
  if (attempt.sections.includes(section?.id)) {
    handleCompleteSection(section.id);
  }
  return (
    <>
      <QuestionAnswer
        key={questions && questions[currentQuestion].id}
        question={questions ? questions[currentQuestion] : null}
        attemptId={attempt.id}
        toggleDisable={toggleDisable}
        disable={disable}
        selected={selected}
      />
      {/* Footer */}
      <div className="md:absolute bottom-0 md:p-4 md:w-[calc(100vw-15.5rem)] w-100 flex justify-between border-t-2 border-dashed border-primary pt-3">
        <div className="md:py-2 font-semibold text-xs md:text-base md:w-auto w-14">
          <span>Section: {section?.name}</span>
        </div>
        <div>
          <Drawer>
            <DrawerTrigger disabled={disable}>
              <Button disabled={disable} className="py-2">
                Question {currentQuestion + 1} of {questions?.length}
                <ChevronUp className="ml-1" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-primary">
                  {test?.title}
                </DrawerTitle>
                <DrawerDescription>
                  <div className="flex align-middle text-black">
                    <MapPin />
                    <span className="border-r border-gray-300 pe-2">
                      Current
                    </span>
                    <span className="px-2 border border-dashed border-gray-800 me-1 rounded-sm"></span>
                    <span>Unanswered</span>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex w-full justify-center">
                {questions?.map((q: any) => {
                  const isAnswered = q?.responses?.find(
                    (res: UserResponse) => res?.attemptID === attempt?.id
                  );
                  return (
                    <span
                      key={q?.id}
                      className={`px-2 border me-1 rounded-sm ${
                        isAnswered
                          ? "bg-primary text-white border-primary"
                          : "border-dashed border-gray-800"
                      }`}
                    >
                      {q?.position}
                    </span>
                  );
                })}
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button>Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div>
          {currentQuestion >= 1 && (
            <Button
              disabled={disable}
              className="me-2"
              onClick={() => {
                setCurrentQuestion((prev) => {
                  setSelected(
                    questions[prev - 1]?.responses[0]?.selectedAnswerID
                  );
                  return prev - 1;
                });
              }}
            >
              Back
            </Button>
          )}
          {currentQuestion < questions?.length &&
            !(currentQuestion === questions?.length - 1) && (
              <Button
                disabled={disable}
                onClick={() => {
                  setCurrentQuestion((prev) => {
                    setSelected(
                      questions[prev + 1]?.responses[0]?.selectedAnswerID
                    );
                    return prev + 1;
                  });
                }}
              >
                Next
              </Button>
            )}
          {section?.position === test?.sections?.length &&
          currentQuestion === questions?.length - 1 ? (
            <ConfirmModal onConfirm={completeTest}>
              <Button disabled={disable}>Submit Test</Button>
            </ConfirmModal>
          ) : (
            currentQuestion === questions?.length - 1 && (
              <Button
                disabled={disable}
                onClick={() => handleCompleteSection(section.id)}
              >
                Complete Section
              </Button>
            )
          )}
        </div>
      </div>
    </>
  );
}
