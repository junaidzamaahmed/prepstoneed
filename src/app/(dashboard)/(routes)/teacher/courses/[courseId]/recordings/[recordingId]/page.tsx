import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NameForm } from "./_components/name-form";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, File, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { Banner } from "@/components/banner";
import { SectionActions } from "./_components/actions";
import { VideoPostForm } from "./_components/video-post-form";

const SectionIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    recordingId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const section = await db.recordings.findUnique({
    where: {
      id: params.recordingId,
    },
    include: {
      muxData: true,
    },
  });
  if (!section) {
    return redirect("/");
  }
  const requiredFields = [section.title];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!section.isPublished && (
        <Banner
          variant="warning"
          label="This video is unpublished. It will not be visible in this course."
        />
      )}
      <div className="mt-10 mx-4">
        <div>
          <Link
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
            href={`/teacher/courses/${params.courseId}/`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
        </div>
        <div className="py-2 flex justify-end">
          <SectionActions
            disabled={!isComplete}
            recordingId={params.recordingId}
            courseId={params.courseId}
            isPublished={section.isPublished}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={File} />
          <h2 className="text-xl">Edit this video</h2>
        </div>
        <NameForm
          initialData={section}
          recordingId={params.recordingId}
          courseId={params.courseId}
        />
        <div className="mt-4 flex items-center gap-x-2">
          <IconBadge icon={MessageCircleQuestion} />
          <h2 className="text-xl">Add a video</h2>
        </div>
        <VideoPostForm
          initialData={section}
          recordingId={params.recordingId}
          courseId={params.courseId}
        />
      </div>
    </>
  );
};

export default SectionIdPage;
