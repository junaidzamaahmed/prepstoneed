import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { PriceForm } from "./_components/price-form";
import { CategoryForm } from "./_components/category-form";
import { VideoForm } from "./_components/video-form";
import { TestActions } from "./_components/actions";
import Link from "next/link";
import { Banner } from "@/components/banner";
import { CourseFeaturesForm } from "./_components/course-features";
import { CoursePointsForm } from "./_components/course-points";
import { ImageForm } from "./_components/image_form";
import { CourseFAQForm } from "./_components/course-faq";
import { CourseRoutineForm } from "./_components/course-routine";
import SelectQuiz from "./_components/select-quiz";
import SelectInstructor from "./_components/select-instructor";

const TestIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      recordings: {
        orderBy: {
          position: "asc",
        },
      },
      CoursePoints: true,
      CourseRoutine: true,
      FAQ: true,
      CourseFeatures: true,
      tests: true,
      instructors: { include: { instructor: true } },
    },
  });
  const tests = await db.quiz.findMany({});
  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const instructors = await db.instructor.findMany({
    orderBy: { name: "asc" },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.price != null,
    course.categoryId,
    course.recordings.some((recording) => recording.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible in the website."
        />
      )}
      <div className="mt-10 mx-4">
        <div>
          <Link
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
            href={`/teacher/courses/`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </div>
        <div className="py-2 flex justify-end">
          <TestActions
            disabled={!isComplete}
            testId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customise your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <SelectInstructor
              initialData={course}
              courseId={course.id}
              instructors={instructors}
              assigned={course.instructors}
            />
            <PriceForm initialData={course} courseId={course.id} />
            <SelectQuiz
              initialData={course}
              courseId={course.id}
              tests={tests}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Videos</h2>
            </div>
            <VideoForm initialData={course} courseId={course.id} />
            <CourseFeaturesForm initialData={course} courseId={course.id} />
            <CoursePointsForm initialData={course} courseId={course.id} />
            <ImageForm courseId={params.courseId} initialData={course} />
            <CourseFAQForm courseId={params.courseId} initialData={course} />
            <CourseRoutineForm
              courseId={params.courseId}
              initialData={course}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestIdPage;
