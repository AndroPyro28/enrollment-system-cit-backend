import { calculateAge } from "../lib/calculateAge";
import { generateEmail } from "../lib/generate-email";
import { generateHashPassword, generatePassword } from "../lib/generate-password";
import prisma from "../lib/prisma";
import { CreateTeachersT, CreateTeacherT, ValidateTeachersSchema } from "../schema/teacher";

class SectionService {

  async createOne(body: CreateTeacherT) {
    const gender = body.gender === "MALE" ? "male" : "female"
  }

}

export default SectionService;