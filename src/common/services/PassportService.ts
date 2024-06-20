
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "common/models/UserModel";
import { config } from "@src/config";


export async function JwtAuth() {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secretTokenJWT,
      },
      async (payload, done) => {
        try {
          const user = await UserModel.findByPk(payload.sub.id);
          console.log('user')
          if (!user) {
            return done(null, false);
          }
          done(null, user);
        } catch (e) {
          done(e, false);
        }
      }
    )
  );
}
