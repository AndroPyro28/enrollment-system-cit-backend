import { Elysia, t } from "elysia";
import RegistrationService from "../services/registration";
import { CreateRegistrationFormSchema } from "../schema/registrations";

const registrationController = new Elysia({ prefix: "/registration" })
  .decorate({
    registrationService: new RegistrationService(),
  })
  .get("/", ({ registrationService, body, params, query, headers }) => registrationService.get())
  .post(
    "/",
    async ({ body: dto, registrationService }) => {
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
      return registrationService.create(body.data);
    }
    // {
    //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
    // }
  );

export default registrationController;
