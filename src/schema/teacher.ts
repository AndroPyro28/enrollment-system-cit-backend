import { z } from "zod";
import { ProfileSchema, UserSchema } from "./base";

const TeacherSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  role: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  profile: ProfileSchema.nullable(),
});

// ".xls, .xlsx, .xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
// 10mb
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10mb
export const ACCEPTED_EXCEL_EXTENSION = [
  ".xls",
  ".xlsx",
  // ".xlsm", // Excel Workbook formats
  // ".xlsb",
  // ".xlt",
  // ".xltx",
  // ".xltm", // Other Excel formats
  // ".xml",
  // ".xlw",
  // ".ods", // Other spreadsheet formats
  // ".csv",
  // ".txt", // Plain text formats
];

// this schema validate the excel file extension and size
export const FormUploadExcelTeachersSchema = z.object({
  file: z
    .instanceof(File, {
      message: "File is required",
    })
    .refine((file) => file.size > 0, "File should not be empty")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}mb`
    )
    .refine((file) => {
      // Extract file extension
      const fileName = file.name;
      const fileExtension = "." + fileName.split(".").pop();
      console.log(
        "🚀 ~ file: teacher.ts:50 ~ .refine ~ fileExtension:",
        fileExtension
      );

      return ACCEPTED_EXCEL_EXTENSION.includes(fileExtension);
    }, "Only these files are allowed " + ACCEPTED_EXCEL_EXTENSION.join(", ")),
});

// upload excel teachers
// export const UploadExcelTeachersSchema = z.object({
//   name: z
//     .string()
//     .refine((value) => value.endsWith(".xlsx") || value.endsWith(".xls"), {
//       message: "Uploaded file must be an Excel spreadsheet (.xlsx or .xls)",
//     }),
// });

// this shema check the content of the excel file

export const ValidateTeacherSchema = z.object({
  first_name: z.string({
    required_error: "'First Name' must not be empty",
  }),
  last_name: z.string({
    required_error: "'Last Name' must not be empty",
  }),
  middle_name: z.string({
    required_error: "'First name' must not be empty",
  }),
  extension: z.string().optional(),
  dob: z.coerce
    .date({
      errorMap: (error) => {
        console.log("🚀 ~ file: teacher.ts:47 ~ error:", error);
        if (error.code === "invalid_date") {
          return {
            message:
              "'Day of Birth' is required and must be a valid date format ex. DD/MM/YYYY",
          };
        }
        return {
          message: "Invalid date format",
        };
      },
    })
    .min(
      new Date("1900-01-01"),
      "Date of birth must be greater than 1900-01-01"
    ),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "'Gender' must not be empty",
  }),
  // add more fields here
})
export const ValidateTeachersSchema = z
  .array(ValidateTeacherSchema)
  .max(100, "Maximum of 100 teachers only");

// form types
export type FormUploadExcelTeachersSchemaT = z.infer<
  typeof FormUploadExcelTeachersSchema
>;

// type use inside api
export type TeacherT = z.infer<typeof TeacherSchema>;
export type CreateTeachersT = z.infer<typeof ValidateTeachersSchema>;
export type CreateTeacherT = z.infer<typeof ValidateTeacherSchema>;
