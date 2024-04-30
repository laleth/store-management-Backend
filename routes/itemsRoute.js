const express = require("express")
const ItemModel = require("../models/itemsModel")
const authUser = require("../middleware/auth")

const router = express.Router()
router.use(authUser);

router.post("/add-items", async (req, res) => {
    try {
        const newItem = new ItemModel(req.body)
        await newItem.save()
        res.send("Item added successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/get-items", async (req, res) => {
    try {
        const items = await ItemModel.find()
        res.send(items)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/delete-items", async (req, res) => {
    try {
        const item = await ItemModel.findOneAndDelete({ _id: req.body.itemId })
        item ? res.send("Item deleted successfully") : res.status(400).send({ message: "Item not found" })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post("/edit-items", async (req, res) => {
    try {
        await ItemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body)
        res.send("Item updated successfully")
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports=router