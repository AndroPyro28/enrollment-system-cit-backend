import { Elysia, t } from "elysia";
import TeachersService from "../services/teachers";
import { CreateTeachersSchema, CreateTeacherSchema } from "../schema/teacher";
// import RegistrationService from "../services/registration";
// import { CreateRegistrationFormSchema } from "../schema/registrations";
const registrationController = new Elysia({ prefix: "/teachers" })
  // assigning service
    .decorate({
      Service: new TeachersService,
    })
  //assigning variables
  //   .derive(({ headers }) => {
  //     const auth = headers["authorization"];
  //     // you can extract your jwt here
  //     return {
  //       isAuth: auth,
  //     };
  //   })
  /**
   * middleware
   *
   * local
   * global
   * scoped
   */
  .get("/", ({ Service:service, body, params, query, headers }) => service.get())
  .post(
    "/",
    ({ body:dto, Service:service }) => {
      const body = CreateTeacherSchema.safeParse(dto);
        if (!body.success) {
            return Response.json(
              {
                errors: body.error.flatten().fieldErrors,
                message: "Invalid body parameters",
              },
              { status: 400 }
            );
        }

        return service.createOne(body.data)
    },
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  )
  .post(
    "/excel-bulk-create",
    ({ body:dto, Service:service }) => {

      const validatedExcel = CreateTeachersSchema.safeParse(dto);

      if (!validatedExcel.success) {
        return Response.json(
          {
            error: validatedExcel.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

        return service.excelBulkCreate(validatedExcel.data)
    },
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  );

export default registrationController;