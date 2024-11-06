import { Elysia, t } from "elysia";
import crypto from "crypto";
import RegistrationService from "../services/registration";
import { CreateRegistrationFormSchema } from "../schema/registrations";
import { CreateSectionSchema } from "../schema/section";
import SectionService from "../services/section";
const sectionController = new Elysia({ prefix: "/sections" })
  // assigning service
  .decorate({
    sectionService: new SectionService(),
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
  .get("/", ({ sectionService, body, params, query, headers }) =>
    sectionService.get()
  )
  .post(
    "/",
    async ({ body: dto, sectionService }) => {
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
      return sectionService.createOne(body.data);
    }
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  );

export default sectionController;
