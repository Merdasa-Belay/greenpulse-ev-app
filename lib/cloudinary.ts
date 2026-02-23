import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export async function uploadImage(fileBuffer: Buffer, filename: string) {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing");
  }

  const base64 = fileBuffer.toString("base64");
  const dataUri = `data:application/octet-stream;base64,${base64}`;
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "greenpulse/blog";

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: filename.replace(/\.[^/.]+$/, ""),
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}
