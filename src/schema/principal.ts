import { z } from "zod";
import { UserSchema } from "./base";

export const UpdatePrincipalSchema = UserSchema.pick({
  id: true,
});

export type UpdatePrincipalSchemaType = z.infer<typeof UpdatePrincipalSchema>;
