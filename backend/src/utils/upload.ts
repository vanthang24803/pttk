import cloudinary from "@/lib/cloudinary";

class UploadService {
  public static async uploads(files: Express.Multer.File[] | undefined) {
    const images: string[] | undefined = files?.map(
      (file: Express.Multer.File) => file.path
    );

    const uploadImages = [];

    for (const image of images ?? []) {
      const result = await cloudinary.uploader.upload(image);
      uploadImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    return uploadImages;
  }

  public static async uploadSingle(file: Express.Multer.File | undefined) {
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);

      return result.url;
    }
  }

  public static async delete(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);

    return result.result === "ok";
  }
}

export default UploadService;
