const bCrypt = require("bcrypt-nodejs");

module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require("passport-local").Strategy;


    // signin strategy
    passport.use('signin',
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
            async (req, username, password, done) => {

                // func for check password.
                function isValidPassword(userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                };

                try {
                    // find user
                    let user = await User.findOne({
                        where: {
                            username: username
                        }
                    });

                    // if no user - return error.
                    if (!user) {
                        return done(null, false, {
                            message: 'User does not exist'
                        });
                    };

                    // check password. if password is incorrect - return error.
                    if (!isValidPassword(user.password, password)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    };

                    // if all prev steps is OK (password is right), update user info and return it.

                    // update fields
                    await user.updateAttributes({
                        status: "active",
                        last_login: Date.now()
                    });

                    // get info 
                    let userinfo = user.get();
                    return done(null, userinfo);

                } catch (error) {
                    console.error("Error:", error);

                    return done(null, false, {
                        message: 'Something wrong with your Signin'
                    });
                };

            }

        )
    );

    // serialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id);

        if (user)
            done(null, user.get());
        else
            done(user.errors, null);
    });
};