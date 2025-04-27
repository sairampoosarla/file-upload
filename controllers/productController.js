const product = require("../models/Product")
const {StatusCode} = require("http-status-codes")

const createProduct = async (req, res) => {
    res.send("Product Created")
}

const getAllProducts = async (req, res) =>{
    res.sed("List of all products")
}

model.exports = {createProduct, getAllProducts}