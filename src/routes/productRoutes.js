// src/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/productModel');

// GET all books
router.get('/', async (req, res) => {
  try {
    const products = await Book.find(); // This works only if Book is a real model
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add a book
router.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  const newBook = new Book({ title, author, year });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  productRoutes: router
};
