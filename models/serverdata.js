const mongoose = require("mongoose")
const config = require("../config.json")

const dataScheama2 = mongoose.Schema({
                                      id:{ type: String, unique: true },//IDENTIFICATION BLOCK
                                      prefix:{ type: String, default: config.CLIENT_PREFIX },
})
module.exports = mongoose.model("ServerData",dataScheama2)
