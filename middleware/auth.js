const jwt = require('jsonwebtoken')
const BookModel = require("../models/bookModel")
const mongoose = require("mongoose")

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"]
        if (!token) {
            res.status(401).send({ status: false, msg: " token is required" })
        }

        let decodedToken = jwt.verify(token, "cercleX") 
        
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" })
        }

        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}


const authorization = async function (req, res, next) {
    try {
        let bookId = req.params.bookId

        if (!isValidObjectId(bookId)) {
            res.status(400).send({ status: false, msg: " bookId is not a valid ObjectId" })
        }
        let token = req.headers["x-auth-token"]
        let decodedToken = jwt.verify(token, "cercleX")
        let bookDetails = await BookModel.findOne({ _id: bookId })
        if (!bookDetails) {
            res.status(404).send({ status: false, msg: "id not found" })
        }
        if (decodedToken.userId != bookDetails.userId) {
            return res.status(403).send({ status: false, msg: "you are not authorized" })
        }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}

module.exports = { authentication , authorization }
