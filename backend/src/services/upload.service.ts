import cloudinary from '../config/cloudinary.js';

export class UploadService {
  async uploadImage(fileBuffer: Buffer, folder: string = 'capital-pets'): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Error al subir imagen: ${error.message}`));
          } else {
            resolve(result!.secure_url);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
