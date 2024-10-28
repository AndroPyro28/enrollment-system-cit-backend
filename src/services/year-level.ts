import { calculateAge } from "../lib/calculateAge";
import { generateEmail } from "../lib/generate-email";
import {
  generateHashPassword,
  generatePassword,
} from "../lib/generate-password";
import prisma from "../lib/prisma";
import { TCreateYearLevelSchema } from "../schema/year-level";
import {
  CreateTeachersT,
  CreateTeacherT,
  ValidateTeachersSchema,
} from "../schema/teacher";

class YearLevelService {
  async get() {}
  async createOne(body: TCreateYearLevelSchema) {
    const YearLevel = await prisma.yearLevel.create({
      data: {
        name: body.name,
      },
    });

    return YearLevel;
  }
}

export default YearLevelService;
