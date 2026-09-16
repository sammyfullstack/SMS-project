const mangoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, require: true },
});
