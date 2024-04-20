import { getRecording } from "@/actions/get-recording";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";

export default async function RecordingPage({
  params,
}: {
  params: { courseId: string; recordingId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const data = await getRecording({
    recordingId: params.recordingId,
    courseId: params.courseId,
    userId,
  });
  console.log(data);
  if (!data?.recording || !data?.course) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">
            {data?.recording?.title}
          </h2>
        </div>
      </div>
      <div className="p-4">
        <VideoPlayer
          recordingId={params.recordingId}
          courseId={params.courseId}
          title={data?.recording?.title}
          nextChapterId={data?.nextRecording?.id!}
          playbackId={data?.muxData?.playbackId!}
        />
      </div>
    </div>
  );
}
