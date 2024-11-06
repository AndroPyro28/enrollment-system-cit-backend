import { calculateAge } from "../lib/calculateAge";
import { generateEmail } from "../lib/generate-email";
import { generateHashPassword, generatePassword } from "../lib/generate-password";
import prisma from "../lib/prisma";
import { TCreateTeachersSchema, TCreateTeacherSchema, CreateTeachersSchema } from "../schema/teacher";

class TeachersService {

  async create(body: TCreateTeacherSchema) {
    const gender = body.gender === "MALE" ? "male" : "female"
    const email = generateEmail(
      "teacher",
      body.first_name,
      body.last_name,
      body.dob
    );
    const password = generatePassword(body.first_name, body.dob);
    const hashedPassword = await generateHashPassword(password);

    const createdTeacher = await prisma.profile.create({
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        extension: body.extension,
        dob: body.dob,
        gender,
        age: calculateAge(body.dob),
        user: {
          create: {
            email: email,
            hashedPassword: hashedPassword,
            role: "teacher",
          },
        },
      },
    });

    return createdTeacher;
  }

  async excelBulkCreate(body:TCreateTeachersSchema) {
    // validate data
   

    const teachers = body;
    console.log("🚀 ~ file: route.ts:119 ~ teachers:", teachers);

    try {
      // create all teachers
      await Promise.all(
        teachers.map(async (teacher) => {
          const password = generatePassword(teacher.first_name, teacher.dob);
          const hashedPassword = await generateHashPassword(password);
          const email = generateEmail(
            "teacher",
            teacher.first_name,
            teacher.last_name,
            teacher.dob
          );
          const gender = teacher.gender === "MALE" ? "male" : "female"

          const createdTeacher = await prisma.profile.create({
            data: {
              first_name: teacher.first_name,
              last_name: teacher.last_name,
              middle_name: teacher.middle_name,
              extension: teacher.extension,
              dob: teacher.dob,
              gender,
              age: calculateAge(teacher.dob),
              user: {
                create: {
                  email: email,
                  hashedPassword: hashedPassword,
                  role: "teacher",
                },
              },
            },
          });

          return createdTeacher;
        })
      );

      return Response.json("All teachers successfully created", {
        status: 201,
      });
    } catch (error) {
      console.log("[TEACHER-POST]", error);
      return new Response("Internal error", { status: 500 });
    }
  }

  async get(query:Record<string,any>) {
    const {role} = query
    const teachers = await prisma.user.findMany({
      where: {
        role
      },
      include: {
        profile:true
      }
    })
    return teachers
  }
}

export default TeachersService;