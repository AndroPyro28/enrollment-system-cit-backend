import { Elysia } from "elysia";
import registrationController from "./controllers/registration";

const port = process.env.PORT || 3001;

const app = new Elysia({ prefix: "/api" })
  .use(registrationController)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);