const mongoose= require("mongoose");
const Blogs = new mongoose.Schema(
{
title: {
type: String,
require: true,
},
delete: { type: Boolean, default: true },
desc: {
type: String,
require: true,
},
},
{ timestamps: true }
);

module.exports = mongoose.model("Blogs",Blogs);