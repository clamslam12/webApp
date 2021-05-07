"use strict";

const mongoose = require("mongoose"),
    {Schema} = mongoose,
    passportLocalMongoose = require("passport-local-mongoose"),
    hashtagSchema = new Schema({
        word: {
            type: String,
            required: true,
            trim: true
        },
        count: {
            type: Number,
            default: 0
        }
    },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model("Hashtag", hashtagSchema);