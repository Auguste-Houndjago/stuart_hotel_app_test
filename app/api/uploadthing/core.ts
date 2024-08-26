import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();



export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })

    .middleware(async ({ req }) => {

      const { userId } = auth();


      if (!userId) throw new UploadThingError("Please log in");


      return { userId };
    })

    .onUploadComplete(async ({ metadata, file }) => {

      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      const fileSizeInKB = (file.size / 1024).toFixed(2);
      console.log("File size:", fileSizeInKB, "KB");
      

      return { uploadedBy: metadata.userId };
    }),

    
} satisfies FileRouter;




export type OurFileRouter = typeof ourFileRouter;