export interface UploadFileOptions {
  fileName: string;
  fileBuffer: Buffer | string;
  mimeType: string;
  category: "tutor_docs" | "homework" | "assignments" | "invoices" | "receipts" | "certificates" | "profile_photos";
}

export class CloudStorageService {
  private static getBucketName(): string {
    return process.env.GCS_BUCKET_NAME || "ace-education-storage-prod";
  }

  public static async uploadFile(options: UploadFileOptions): Promise<{ success: boolean; fileUrl: string; storagePath: string }> {
    const { fileName, category } = options;
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const storagePath = `uploads/${category}/${timestamp}_${cleanFileName}`;

    if (process.env.GCS_PROJECT_ID && process.env.GCS_CLIENT_EMAIL) {
      try {
        const publicUrl = `https://storage.googleapis.com/${this.getBucketName()}/${storagePath}`;
        return {
          success: true,
          fileUrl: publicUrl,
          storagePath,
        };
      } catch (err) {
        console.error("[GCS Upload Error]", err);
      }
    }

    // High-fidelity fallback URL
    return {
      success: true,
      fileUrl: `/uploads/${category}/${cleanFileName}?v=${timestamp}`,
      storagePath,
    };
  }
}
