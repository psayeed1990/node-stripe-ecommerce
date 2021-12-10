const {
    getOne,
    getAll,
    createOne,
    updateOne,
    deleteOne,
} = require("../handlers/factoryHandler");

exports.getAll = (route) => getAll(route);

exports.createOne = (route) => createOne(route);

exports.getOne = (route) => getOne(route);

exports.updateOne = (route) => updateOne(route);

exports.deleteOne = (route) => deleteOne(route);
