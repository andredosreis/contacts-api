const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Adds a new contact to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@email.com
 *               favoriteColor:
 *                 type: string
 *                 example: Blue
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to create contact
 */
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

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: List all contacts
 *     description: Retrieves all contacts from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved contacts
 *       500:
 *         description: Failed to list contacts
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list contacts' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieves a single contact from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact
 *     responses:
 *       200:
 *         description: Successfully retrieved contact
 *       400:
 *         description: Invalid contact ID
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to get contact
 */
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
    console.error("Erro ao buscar contato:", error); // Adiciona log para depuração
    res.status(500).json({ error: 'Failed to get contact', details: error.message });
  }
  
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Updates an existing contact in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@email.com
 *               favoriteColor:
 *                 type: string
 *                 example: Green
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1988-05-10"
 *     responses:
 *       200:
 *         description: Successfully updated contact
 *       400:
 *         description: Invalid contact ID or validation error
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to update contact
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Removes a contact from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       400:
 *         description: Invalid contact ID
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to delete contact
 */
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
