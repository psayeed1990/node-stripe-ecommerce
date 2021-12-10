exports.getAll = (route) => async (req, res, next) => {
    res.status(200).json({
        message: "Factory list fetched successfully!",
    });
};

exports.create = (route) => async (req, res, next) => {
    res.status(200).json({
        message: "Factory list created successfully!",
    });
};

exports.getOne = (route) => async (req, res, next) => {
    res.status(200).json({
        message: "Factory fetched successfully!",
    });
};

exports.update = (route) => async (req, res, next) => {
    res.status(200).json({
        message: "Factory updated successfully!",
    });
};

exports.delete = (route) => async (req, res, next) => {
    res.status(200).json({
        message: "Factory deleted successfully!",
    });
};
