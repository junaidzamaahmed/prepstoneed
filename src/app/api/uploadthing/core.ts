import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  questionImage: f({ image: { maxFileSize: "512KB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  coursevideo: f({ video: { maxFileSize: "2GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  // questionAttachment:f(["image"]).middleware(()=>handleAuth())
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
