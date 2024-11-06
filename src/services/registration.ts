import prisma from "../lib/prisma";
import { CreateRegistrationFormT } from "../schema/registrations";

class RegistrationService {
  async create(body: CreateRegistrationFormT) {
    const gender = body.gender === "MALE" ? "male" : "female"
    const semester = body.semester === "FIRST" ? "first" : "second"
    // creating user profile
    const newUser = await prisma.user.create({
      data: {
        role: "student",
        profile: {
          create: {
            // yearLevelId:"",
            // sectionId:"",
            age: body.age,
            dob: body.dob,
            first_name: body.first_name,
            gender,
            last_name: body.last_name,
            middle_name: body.middle_name,
            extension: body.extension,
            ipc_name: body.ipc_name,
            grade_level_to_enroll: body.grade_level_to_enroll,
            household_id_4ps: body.household_id_4ps,
            is_4ps: body.is_4ps,
            is_pc: body.is_pc,
            is_pwd: body.is_pwd,
            is_same_address:body.is_same_address,
            is_returnee: body.is_returnee,
            is_with_lrn: body.is_with_lrn,
            last_grade_level_complete:body.last_grade_level_complete,
            last_school_attended: body.last_school_attended,
            last_school_year_complete: body.last_grade_level_complete,
            lrn_no: body.lrn_no,
            mother_tongue: body.mother_tongue,
            place_of_birth: body.place_of_birth,
            school_id: body.school_id,
            school_year: body.school_year,
            semester,
            track:body.track,
            strand: body.strand,
            // later integrate cloudinary file system

            // .....


            // creating preferred learning modalities
            preferred_learning_modalities: {
              create: body.preferred_learning_modalities.map((plm, index) => ({
                name: plm,
              }))
            },
            // creating guardian
            guardians:{
              create: [
                { ...body.father_contact_info},
                { ...body.mother_contact_info},
                { ...body.guardian_contact_info},
              ]
            },
            // creating disability
            disabilities: body?.disability ? {
              create: {
                name: body.disability,
              }
            } : undefined,
            // creating address
            address: {
              create: {
                house_no: body.house_no,
                street_name: body.street_name,
                brgy: body.brgy,
                municipality: body.municipality,
                country: body.country,
                province: body.province,
                zip_code: body.zip_code,
                type:"current",
              }
            }
          }
        }
      },
      include: {
        profile:true,
      }
    })
    
    return Response.json(newUser, { status: 201 });
  }

  async get() {
    return 'hello registration'

  }
}

export default RegistrationService;