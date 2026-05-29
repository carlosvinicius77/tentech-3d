import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadBuffer(
  buffer: Buffer,
  folder: string,
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `tentech3d/${folder}`,
        public_id: publicId,
        format: 'webp',
        quality: 85,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve({ url: result.secure_url, publicId: result.public_id })
      }
    )
    stream.end(buffer)
  })
}

export async function uploadProductImage(buffer: Buffer, productSlug: string) {
  return uploadBuffer(buffer, 'products', `${productSlug}-${Date.now()}`)
}

export async function uploadReviewPhoto(buffer: Buffer, userId: string) {
  return uploadBuffer(buffer, 'reviews', `${userId}-${Date.now()}`)
}

export async function uploadQuoteFile(buffer: Buffer) {
  return uploadBuffer(buffer, 'quotes')
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}
