import { Elysia, t } from "elysia";
import crypto from "crypto";
import RegistrationService from "../services/registration";
import { CreateRegistrationFormSchema } from "../schema/registrations";
import { CreateSectionSchema } from "../schema/section";
import SectionService from "../services/section";
import { CreateYearLevelSchema } from "../schema/year-level";
import YearLevelService from "../services/year-level";
const yearLevelController = new Elysia({ prefix: "/year-level" })
  // assigning service
  .decorate({
    yearLevelService: new YearLevelService(),
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
  .get("/", ({ yearLevelService, body, params, query, headers }) => yearLevelService.get())
  .post(
    "/",
    async ({ body: dto, yearLevelService }) => {
      const body = await CreateYearLevelSchema.safeParse(dto);
      if (!body.success) {
        return Response.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }
      return yearLevelService.createOne(body.data);
    }
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  );

export default yearLevelController;
