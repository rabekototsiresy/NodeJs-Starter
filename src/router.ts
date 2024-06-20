import { AuthRoute } from "@modules/auth/authRoute";
import { UserRoute } from "@modules/user/userRoute";
import { Router } from "express";

export const AppRoute: Router = Router();

AppRoute.use('/auth',[ AuthRoute ]);
AppRoute.use('/user',[ UserRoute ]);
