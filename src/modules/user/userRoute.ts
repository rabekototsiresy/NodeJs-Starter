import { Router } from "express";
import passport from "passport";
import { getAllUserController } from "./controllers/getAllUserController";
import { validate } from "@common/middlewares/formValidationMid";
import UserSchema from "common/schemas/UserSchema";
import { deleteUserController } from "./controllers/deleteUserController";
import { updateUserController } from "./controllers/updateUserController";
import { registerController } from "modules/auth/controllers/registerController";
import { getOneUserController } from "./controllers/getOneUserController";


export const UserRoute: Router = Router();

UserRoute.route("").get(
  passport.authenticate("jwt", { session: false }),
  getAllUserController
);


UserRoute.route("").post(
  passport.authenticate("jwt", { session: false }),
  validate(UserSchema.register),
  registerController
);

UserRoute.route("/:id").put(
  passport.authenticate("jwt", { session: false }),
  validate(UserSchema.register),
  updateUserController
);

UserRoute.route("/:id").delete(
  passport.authenticate("jwt", { session: false }),
  deleteUserController
);
UserRoute.route("/:id").get(
  passport.authenticate("jwt", { session: false }),
  getOneUserController
);

