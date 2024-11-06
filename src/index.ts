import { Elysia } from "elysia";
import registrationController from "./controllers/registration";
import teachersController from "./controllers/teachers";
import yearLevelController from "./controllers/year-level";
import sectionController from "./controllers/section";
import { cors } from '@elysiajs/cors'
const port = process.env.PORT || 3001;

const app = new Elysia({ prefix: "/api"})
.use(sectionController)
.use(teachersController)
.use(registrationController)
.use(yearLevelController)
.use(cors())
.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);