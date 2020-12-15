import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prisma/prismaClient";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// verify가 실행된 후에 authenticate에 user 데이터 전달.
const verify = async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: payload.uuid },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: "This user is not exist" });
    }
  } catch (error) {
    return done(error);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(options, verify));
passport.initialize();
