const itemModel = require('../models/itemModel')

module.exports = {
    createItem : async (req, res) => {
        try {
            let {books, movies} = req.body
            let {userId} = req.params
            let obj = {
                userId: userId,
                $push: {books: books},
                $push: {movies: movies}
            }
            let saveData = await itemModel.create(obj)
            return res.status(201).send({status: true, Item: saveData})
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    readItem : async (req, res) => {
        try {
            let { userId } = req.params
            let findItem = await itemModel.findById({userId: userId}).select({_id: 0, __v: 0,books: 1, movies: 1})
            if (!updateItem) {
                return res.status(404).send({ status: false, msg: 'Data not found'})
            }
            return res.status(200).send({status: true, msg: 'Item fetched successfully', Item: findItem})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    updateItem : async (req, res) => {
        try {
            let {userId, itemId} = req.params
            let {books, movies} = req.body
            let obj = {
                $push: {books: books},
                $push: {movies: movies},
                updatedAt: new Date().toLocaleString()
            }
            let updateItem = await itemModel.findOneAndUpdate({userId: userId,_id: itemId}, obj, {new: true} )
            if (!updateItem) {
                return res.status(404).send({ status: false, msg: 'Data not found'})
            }
            return res.status(200).send({ status: true, msg: 'Item updated successfully', Data: updateItem })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    deleteItem : async (req, res) => {
        try {
            let {userId, itemId} = req.params
            let {books, movies} = req.body
            let obj = {
                $pull: {books: books},
                $pull: {movies: movies},
                updatedAt: new Date().toLocaleString()
            }
            let deleteItem = await itemModel.findOneAndUpdate({userId: userId,_id: itemId, is}, obj, {new: true} )
            if (!deleteItem) {
                return res.status(404).send({ status: false, msg: 'Data not found'})
            }
            return res.status(200).send({ status: true, msg: 'Item deleted successfully', Data: deleteItem })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}