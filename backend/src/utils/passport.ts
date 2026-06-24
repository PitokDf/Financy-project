import { config } from "@/config";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { UserRepository } from "@/repositories/user.repository";

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await UserRepository.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async (_accessToken: string, _refreshToken: string, profile: Profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error("No email found from Google profile"), undefined);
                }

                let user = await UserRepository.findByEmail(email);

                if (!user) {
                    user = await UserRepository.create({
                        name: profile.displayName,
                        email,
                    });
                } else if (user.password) {
                    return done(null, false, { message: "Email sudah terdaftar. Silakan masuk menggunakan kata sandi." });
                }

                return done(null, user);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);

export default passport;
