import { Elysia, t } from "elysia";
import crypto from "crypto";
import RegistrationService from "../services/registration";
import { CreateRegistrationFormSchema } from "../schema/registrations";
const registrationController = new Elysia({ prefix: "/registration" })
  // assigning service
  .decorate({
    Service: new RegistrationService(),
  })
  //assigning variables
  //   .derive(({ headers }) => {
  //     const auth = headers["authorization"];
  //     you can extract your jwt here
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
  .get("/", ({ Service: service, body, params, query, headers }) =>service.get())
  .post(
    "/",
    async ({ body: dto, Service: service }) => {
      const body = await CreateRegistrationFormSchema.safeParse(dto);
      if (!body.success) {
        return Response.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }
      return service.create(body.data);
    }
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  );

export default registrationController;
