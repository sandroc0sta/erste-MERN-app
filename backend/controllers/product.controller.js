import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Fehler beim Abrufen der Produkte", error.message);
        res.status(500).json({ success: false, message: 'Serverfehler' });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body

    if (!product.name || !product.price || !product.image) {
        res.status(400).json({ success: false, message: 'Bitte alle Felder ausfüllen' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Fehler beim Erstellen des Produkts", error.message);
        res.status(500).json({ success: false, message: 'Serverfehler' });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    
    const productData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Ungültige Produkt-ID' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server fehler' });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log("id:", id);

    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(400).json({ success: false, message: 'Ungültige Produkt-ID' });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Produkt erfolgreich gelöscht' });
    } catch (error) {
        console.log("Fehler beim Löschen des Produkts", error.message);
        res.status(500).json({ success: false, message: 'Server fehler' });
    }
}