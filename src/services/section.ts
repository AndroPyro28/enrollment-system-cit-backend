import { calculateAge } from "../lib/calculateAge";
import { generateEmail } from "../lib/generate-email";
import { generateHashPassword, generatePassword } from "../lib/generate-password";
import prisma from "../lib/prisma";
import { TCreateSectionSchema } from "../schema/section";
import { CreateTeachersT, CreateTeacherT, ValidateTeachersSchema } from "../schema/teacher";

class SectionService {

  async get(){
    
  }
  async createOne(body: TCreateSectionSchema) {
    const section = await prisma.section.create({
      data: {
        name: body.name,
        yearLevelId: body.yearLevelId
      }
    })

    return section
  }

}

export default SectionService;