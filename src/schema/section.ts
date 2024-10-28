import { Section } from "@prisma/client";
import { z } from "zod";

export const SectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  yearLevelId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}) satisfies z.ZodType<Section>;

export const CreateSectionSchema = SectionSchema.pick({
    name:true,
    yearLevelId:true
})

export const UpdateSectionSchema = SectionSchema.pick({
    
})