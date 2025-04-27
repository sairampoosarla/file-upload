const {createProduct, getAllProducts} = require('../controllers/productController')
const {uploadProductImage} = require('../controllers/uploadsController')

const express = require("express")
const router = express.Router()

router.route("/").get(getAllProducts).post(createProduct)
router.route("/upload").post(uploadProductImage)

model.exports = router