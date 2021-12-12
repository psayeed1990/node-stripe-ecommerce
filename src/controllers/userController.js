const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/User");

const sendToken = (user, req, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.token = token;

    // Remove password from output
    user.password = undefined;

    return res.status(200).json({
        status: "success",
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
        sendToken(user, req, res);
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

    sendToken(newUser, req, res);
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

    const token = req.headers.authorization.split(" ")[1];

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

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
};
