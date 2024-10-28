import { Elysia, t } from "elysia";
import crypto from "crypto";
import RegistrationService from "../services/registration";
import { CreateRegistrationFormSchema } from "../schema/registrations";
import { CreateSectionSchema } from "../schema/section";
import SectionService from "../services/section";
const sectionController = new Elysia({ prefix: "/section" })
  // assigning service
  .decorate({
    Service: new SectionService(),
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
  .get("/", ({ Service: service, body, params, query, headers }) =>
    service.get()
  )
  .post(
    "/",
    async ({ body: dto, Service: service }) => {
      const body = await CreateSectionSchema.safeParse(dto);
      if (!body.success) {
        return Response.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }
      return service.createOne(body.data);
    }
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  );

export default sectionController;
