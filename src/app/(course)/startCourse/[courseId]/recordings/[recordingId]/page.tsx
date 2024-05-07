import { getRecording } from "@/actions/get-recording";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { Lock } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/db";

export default async function RecordingPage({
  params,
}: {
  params: { courseId: string; recordingId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await db.user.findUnique({
    where: { externalId: userId },
  });
  const data = await getRecording({
    recordingId: params.recordingId,
    courseId: params.courseId,
    userId: user?.id!,
  });

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
        {!data?.purchase && !data?.recording?.isFree ? (
          <div className="w-full bg-black h-96 text-white flex flex-col items-center justify-center">
            <Lock size={48} />
            <p className="mt-2">
              Please purchase this course to unlock this video.
            </p>
          </div>
        ) : data?.recording?.videoSource == 0 ? (
          <VideoPlayer
            recordingId={params.recordingId}
            courseId={params.courseId}
            title={data?.recording?.title}
            nextChapterId={data?.nextRecording?.id!}
            playbackId={data?.muxData?.playbackId!}
          />
        ) : (
          <div className="pop-out1">
            <iframe
              src={data?.recording?.videoUrl!}
              allow="fullscreen"
              seamless
              className="w-full h-[50vh]"
            ></iframe>
            <div className="pop-out2">
              <Image
                width={400}
                height={400}
                alt="logo"
                src="/logo.png"
                className="bg-black"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
