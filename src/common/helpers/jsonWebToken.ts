import jwt from "jsonwebtoken";
import { IUser } from "common/interfaces/IUser";
import { config } from "@src/config";

export function signToken(user: IUser): string {
  const tokenPayload = {
    sub: {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    noTimestamp: true
  };
  const expInMinutes = "2m"; // Set minutes time expire
  const expInSeconds = parseInt(expInMinutes) * 60;
  return jwt.sign(tokenPayload, config.secretTokenJWT, {
    expiresIn: expInSeconds,
  });
}