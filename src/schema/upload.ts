import { z } from "zod";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10mb

export const FileSchema = z
  .instanceof(File, {
    message: "File is required",
  })
  .refine((file) => file.size > 0, "File should not be empty")
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}mb`
  );

export const UploadSchema = z.object({
  form137: z.string().min(1, "required"),
  birthCertificate: z.string().min(1, "required"),
  card: z.string().min(1, "required"),
  applicationForm: z.string().min(1, "required"),
  picture1x1: z.string().min(1, "required"),
});

export type TUploadSchema = z.infer<typeof UploadSchema>;
