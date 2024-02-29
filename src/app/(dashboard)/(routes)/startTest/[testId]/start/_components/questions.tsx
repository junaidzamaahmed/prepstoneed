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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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
  const handleCompleteSection = () => {
    setSectionNo((prev) => {
      setSection((prev1: any) => {
        setQuestions(test.sections[prev + 1]?.questions);
        return test.sections[prev + 1];
      });
      setCurrentQuestion(0);
      return prev + 1;
    });
  };
  if (test?.completed) {
    console.log("completed");
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
      <div className="absolute bottom-0 p-4 w-[calc(100vw-14rem)] flex justify-between border-t-2 border-dashed border-primary pt-3">
        <div className="py-2 font-semibold">
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
              <Button disabled={disable} onClick={handleCompleteSection}>
                Complete Section
              </Button>
            )
          )}
        </div>
      </div>
    </>
  );
}
