import React from "react";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowLeft, Book, BookA, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { SectionForm } from "./_components/section-form";
import { TestActions } from "./_components/actions";
import Link from "next/link";
import { Banner } from "@/components/banner";


const QBankPageId = async ({ params }: { params: { qBankId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const test = await db.qBank.findUnique({
    where: {
      id: params.qBankId,
    },
    include: {
      chapters: true,
    }
  });
  if (!test) {
    return redirect("/");
  }


  const requiredFields = [
    test.title,
    test.chapters.find((chapter)=>(chapter.isPublished == true))
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
          label="This Question Bank is unpublished. It will not be visible in the website."
        />
      )}
      <div className="mt-10 mx-4">
        <div>
          <Link
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
            href={`/teacher/q-bank/`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </div>
        <div className="py-2 flex justify-end">
          <TestActions
            disabled={!isComplete}
            qbankId={params.qBankId}
            isPublished={test.isPublished}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">QBank setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customise your QBank</h2>
            </div>
            <TitleForm initialData={test} qBankId={test.id} />
            {/* <DescriptionForm initialData={test} qBankId={test.id} /> */}
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Book} />
              <h2 className="text-xl">Add  Chapters</h2>
            </div>
            <SectionForm initialData={test} qBankId={test.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QBankPageId;
