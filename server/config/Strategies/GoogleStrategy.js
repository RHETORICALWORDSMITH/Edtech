const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/user.model");
require("dotenv").config();

const findOrCreateUser = async (profile, accessToken) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profilePic: profile.photos[0].value,
        googleAccessToken: accessToken, // Store access token
      });
    } else {
      // Update existing user's access token
      user.googleAccessToken = accessToken;
      await user.save();
    }

    return user;
  } catch (error) {
    console.error("Google Strategy Error:", error);
    throw error;
  }
};

const GoogleProvider = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email", "openid"],
    accessType: "offline", // Request refresh token
    prompt: "consent", // Force consent screen to ensure refresh token
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("Access Token Received:", accessToken);
      const user = await findOrCreateUser(profile, accessToken);
      return done(null, { ...user.toObject(), accessToken });
    } catch (error) {
      console.error("Google Auth Error:", error);
      return done(error, null);
    }
  }
);

module.exports = GoogleProvider;
