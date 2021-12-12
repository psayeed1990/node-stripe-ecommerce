exports.deleteOne = (Model, isPrivate) => async (req, res, next) => {
    let doc = await Model.findById(req.params.id);
    if (isPrivate && doc.user != req.user.id) {
        res.status(204).json({
            status: "Fail",
            data: {
                data: "Wrong user",
            },
        });
    }
    doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        res.status(204).json({
            status: "Fail",
            data: {
                data: "Wrong user",
            },
        });
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
};

exports.updateOne = (Model, isPrivate) => async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (isPrivate && doc.user != req.user.id) {
        return res.status(401).json({
            status: "Fail",
            data: {
                data: "Wrong user",
            },
        });
    }
    if (!doc) {
        return res.status(404).json({
            status: "Fail",
            data: {
                data: "No document found with that ID",
            },
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
};

exports.createOne = (Model) => async (req, res, next) => {
    try {
        if (res.user) {
            req.body.user = res.user.id;
        }

        console.log(req.body);
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "Fail",
            data: {
                data: err,
            },
        });
    }
};

exports.getOne = (Model, isPrivate, popOptions) => async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
        return res.status(404).json({
            status: "Fail",
            data: {
                data: "Not found",
            },
        });
    }

    if (popOptions && isPrivate && doc.user.id !== req.user.id) {
        return res.status(401).json({
            status: "Fail",
            data: {
                data: "Wrong user",
            },
        });
    }

    if (isPrivate) {
        if (doc.user != req.user.id) {
            return res.status(401).json({
                status: "Fail",
                data: {
                    data: "Wrong user",
                },
            });
        }
    }

    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
};

exports.getAll = (Model, isPrivate) => async (req, res, next) => {
    const doc = await Model.find();

    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            data: doc,
        },
    });
};

exports.deleteMarked = (Model) => async (req, res, next) => {
    const markedList = req.body;

    await markedList.forEach(async (marked) => {
        await Model.findByIdAndDelete(marked);
    });

    return res.status(201).json({
        status: "success",
    });
};
