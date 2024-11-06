import { Elysia, t } from "elysia";
import TeachersService from "../services/teachers";
import { CreateTeachersSchema, CreateTeacherSchema } from "../schema/teacher";

const teachersController = new Elysia({prefix:"/teachers"})
.decorate({
  teachersService: new TeachersService()
})
.get("/", ({ teachersService, body, params, query, headers }) => teachersService.get(query))
.post(
  "/",
  ({ body:dto, teachersService }) => {
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
      return teachersService.create(body.data)
  },
  // {
  //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
  // }
)
.post(
  "/excel-bulk-create",
  ({ body:dto, teachersService }) => {

    const validatedExcel = CreateTeachersSchema.safeParse(dto);

    if (!validatedExcel.success) {
      return Response.json(
        {
          error: validatedExcel.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

      return teachersService.excelBulkCreate(validatedExcel.data)
  },
  // {
  //   body: t.Any(), // currently elysia doesn't support zod, so im gonna use manual validation
  // }
)
export default teachersController;