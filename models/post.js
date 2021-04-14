"use strict";

const mongoose = require("mongoose"),
    {Schema} = mongoose,
    passportLocalMongoose = require("passport-local-mongoose"),
    postSchema = new Schema({
        post: {
            type: String,
            required: true,
            trim: true
        },
        userEmail: {
            type: String,
            required: true,
            lowercase: true
        },
        userName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            // required: true
        }
    },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model("Post", postSchema);