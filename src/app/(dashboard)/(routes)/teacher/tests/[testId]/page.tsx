import React from "react";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { DurationForm } from "./_components/duration-form";
import { PriceForm } from "./_components/price-form";
import { CategoryForm } from "./_components/category-form";
import { SectionForm } from "./_components/section-form";
import { TestActions } from "./_components/actions";
import Link from "next/link";
import { Banner } from "@/components/banner";
import FreeForm from "./_components/free-form";
import { LeaderboardForm } from "./_components/leaderboard";

const TestIdPage = async ({ params }: { params: { testId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const test = await db.quiz.findUnique({
    where: {
      id: params.testId,
    },
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
      },
      leaderboardInfo: {
        include: {
          exceptUsers: {
            include: {
              user: true,
            },
          },
        },
      },
      attempts: {
        include: {
          user: true,
        },
      },
    },
  });
  if (!test) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    test.title,
    test.duration,
    test.description,
    test.price != null,
    test.categoryId,
    test.sections.some((section) => section.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!test.isPublished && (
        <Banner
          variant="warning"
          label="This test is unpublished. It will not be visible in the website."
        />
      )}
      <div className="mt-10 mx-4">
        <div>
          <Link
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
            href={`/teacher/tests/`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </div>
        <div className="py-2 flex justify-end">
          <TestActions
            disabled={!isComplete}
            testId={params.testId}
            isPublished={test.isPublished}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Test setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customise your test</h2>
            </div>
            <TitleForm initialData={test} testId={test.id} />
            <DurationForm initialData={test} testId={test.id} />
            <DescriptionForm initialData={test} testId={test.id} />
            <FreeForm testId={test.id} isFree={test.isFree} />
            <CategoryForm
              initialData={test}
              testId={test.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <PriceForm initialData={test} testId={test.id} />
            <LeaderboardForm initialData={test} testId={test.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Test Sections</h2>
            </div>
            <SectionForm initialData={test} testId={test.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestIdPage;
