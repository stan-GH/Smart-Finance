const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        userName: String,
        password: String,
        email: String,
        plan: String, //User is either on Free, Basic, Pro, or Advanced plan
        name: String,
        balance: Number,
        todaysExpenses: Map,
        allExpenses: Map,
        todaysDate: String
    }
);

module.exports = mongoose.model("Data", DataSchema);