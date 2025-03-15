const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const router = express.Router();

// Create a new contact (POST)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate email', details: error.keyValue });
    }
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// List all contacts (GET)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list contacts' });
  }
});

// Search for a contact by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get contact' });
  }
});

// Update a contact by ID (PUT)
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete a contact by ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
