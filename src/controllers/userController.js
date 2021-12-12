const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/User");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    //set token to cookie
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    //send token for localstorage refresh token
    const refreshToken = signToken(user._id);
    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        refreshToken: refreshToken,
        jwt: token,
        data: {
            user,
        },
    });
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "Missing Credentials",
                },
            });
        }
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                data: {
                    message: "Incorrect Credentials",
                },
            });
        }

        // 3) If everything ok, send token to client
        createSendToken(user, 200, req, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            data: {
                message: err.message,
            },
        });
    }
};

exports.registration = async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        password: req.body.password,
    });

    createSendToken(newUser, 201, req, res);
};

exports.logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'user']. role='user'
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                status: "fail",
                data: {
                    message: "Missing Permission",
                },
            });
        }

        next();
    };
};

exports.protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        console.log("No token found");
        return res.status(401).json({
            status: "fail",
            data: {
                message: "You are not logged in! Please log in to get access.",
            },
        });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: "fail",
            data: {
                message:
                    "The user belonging to this token does no longer exist.",
            },
        });
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
            status: "fail",
            data: {
                message: "User recently changed password! Please log in again.",
            },
        });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
};
