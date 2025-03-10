const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();


//criate a new contact(post)

router.post('/', async (req, res) => {
    try{
        const { firtstName, lastName, email,favoriteColor, birthday } = req.body;
        const newcontact = new Contact({ firtstName, lastName, email,favoriteColor, birthday });
        await newcontact.save();
        res.status(201).json(newcontact);


    }catch (error) {
        res.status(500).json({ error: 'Erro ao criar o contato' });
    }
})

// list all contacts(get)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os contatos' });
    }
});

// seaarch for a contact by ID(get)
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contato não encontrado' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o contato' });
    }
});

// update a contact by ID(put)
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({ error: 'Contato não encontrado' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o contato' });
    }
});

// delete a contact by ID(delete)
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ error: 'Contato não encontrado' });
        res.json({ message: 'Contato excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o contato' });
    }
});

module.exports = router;
              


