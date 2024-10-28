import { YearLevel } from "@prisma/client";
import { z } from "zod";

export const YearLevelSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}) satisfies z.ZodType<YearLevel>;

export const CreateYearLevelSchema = YearLevelSchema.pick({
    name:true,
})

export const UpdateYearLevelSchema = YearLevelSchema.pick({
    
})