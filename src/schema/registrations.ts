import { z } from "zod";
import { GuardianSchema, LearningModalitySchema, RegistrationFormSchema } from "./base";
import { UploadSchema } from "./upload";

export const CreateRegistrationFormSchema = RegistrationFormSchema
.pick({
  gender:true,
  age:true,
  disability:true,
  dob:true,
  extension:true,
  first_name:true,
  grade_level_to_enroll:true,
  household_id_4ps:true,
  ipc_name:true,
  is_4ps:true,
  is_pc:true,
  is_returnee:true,
  is_same_address:true,
  is_with_lrn:true,
  is_pwd:true,
  last_grade_level_complete:true,
  last_name:true,
  last_school_attended:true,
  lrn_no:true,
  middle_name:true,
  mother_tongue:true,
  place_of_birth:true,
  school_id:true,
  school_year:true,
  semester:true,
  strand:true,
  track:true,
  house_no:true,
  street_name:true,
  brgy:true,
  municipality:true,
  province:true,
  country:true,

  zip_code:true,
})
.extend({
  father_contact_info: GuardianSchema.pick({
    contact_no:true,
    last_name:true,
    middle_name:true,
    first_name:true,
  }),
  mother_contact_info: GuardianSchema.pick({
    contact_no:true,
    last_name:true,
    middle_name:true,
    first_name:true,
  }),
  guardian_contact_info: GuardianSchema.pick({
    contact_no:true,
    last_name:true,
    middle_name:true,
    first_name:true,
  }),
  preferred_learning_modalities: z.array(z.string()),
  uploads: UploadSchema
})
.extend({
  dob: z.string(),
  grade_level_to_enroll: z.coerce.number({invalid_type_error:"Required"}),
  age: z.coerce.number()
  // is_with_lrn: z.enum(['true', 'false']),
  // is_returnee: z.enum(['true', 'false']),
  // is_4ps: z.enum(['true', 'false']),
  // is_pc: z.enum(['true', 'false']),
  // is_same_address: z.enum(['true', 'false'])

})

// form types
export type CreateRegistrationFormT = z.infer<typeof CreateRegistrationFormSchema>;
