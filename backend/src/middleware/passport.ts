import passport from "passport";
import passportJwt from "passport-jwt";
import mongoose from "mongoose";
import { dbCred } from "../config/keys";
import { User } from "../models/User";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: dbCred.jwt
}

export default (passport: { use: (arg0: passportJwt.Strategy) => void; }) => {
    passport.use(
        new JwtStrategy(opt, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('id email');

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    );
}