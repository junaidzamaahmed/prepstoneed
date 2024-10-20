"use client";

import { Answer } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Preview } from "@/components/preview";

interface AnswersListProps {
  items: Answer[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onCorrectChange: (updateData: { id: string; isCorrect: boolean }[]) => void;
  onEdit: (id: string) => void;
}

export const AnswersList = ({
  items,
  onEdit,
  onReorder,
  onCorrectChange,
}: AnswersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [answers, setAnswers] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  });
  useEffect(() => {
    setAnswers(items);
  });
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(answers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedAnswers = items.slice(startIndex, endIndex + 1);
    setAnswers(items);
    const bulkUpdateData = updatedAnswers.map((answer) => ({
      id: answer.id,
      position: items.findIndex((item) => item.id === answer.id),
    }));
    onReorder(bulkUpdateData);
  };
  if (!isMounted) {
    return null;
  }
  const correctAnswerId = answers.find((answer) => answer.isCorrect);
  const onChange = (e: string) => {
    answers.forEach((answer) => {
      if (answer.id === e) {
        answer.isCorrect = true;
      } else {
        answer.isCorrect = false;
      }
    });
    onCorrectChange(answers);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="answers">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <RadioGroup
              defaultValue={correctAnswerId?.id}
              onValueChange={(e) => onChange(e)}
            >
              {answers.map((answer, index) => (
                <Draggable
                  key={answer.id}
                  draggableId={answer.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "mb-4 flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md text-sm",
                        answer.isCorrect &&
                          "bg-sky-100 border-sky-200 text-sky-700"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover::bg-slate-300 rounded-l-md transition",
                          answer.isCorrect &&
                            "border-r-sky-200 hover:bg-sky-200"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      <RadioGroupItem value={answer.id} id={answer.id} />
                      <Preview value={answer.text} />
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {answer.isCorrect && (
                          <Badge
                            className={cn(
                              "bg-slate-500",
                              answer.isCorrect && "bg-sky-700"
                            )}
                          >
                            Correct
                          </Badge>
                        )}
                        <Pencil
                          onClick={() => onEdit(answer.id)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </RadioGroup>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
