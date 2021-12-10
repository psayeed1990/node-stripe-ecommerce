const {
    getOne,
    getAll,
    createOne,
    updateOne,
    deleteOne,
} = require("../handlers/factoryHandler");

exports.getAll = (Model) => getAll(Model);

exports.createOne = (Model) => createOne(Model);

exports.getOne = (Model) => getOne(Model);

exports.updateOne = (Model) => updateOne(Model);

exports.deleteOne = (Model) => deleteOne(Model);
