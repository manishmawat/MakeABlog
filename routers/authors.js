const mongoose = require('mongoose');
const express = require('express');
const {Author} = require('../models/author');

const router = express.Router();

router.get('/', async (req,res) => {
    const authors = await Author.find({});
    res.status(200).send(authors);
});

router.get('/:id', async (req,res) => {
    const author = await Author.find({_id:req.params.id});

    if(!author) return res.status(404).send(author);

    res.status(200).send(author);
});

router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name,
        email:req.body.email,
        company:req.body.company,
        hobbies:req.body.hobbies
    });
    const savedAuthor = await author.save();
    res.status(200).send(savedAuthor);
});

router.put('/:id', async (req,res) => {

    const modifiedAuthor = await Author.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email:req.body.email,
        company:req.body.company,
        hobbies: req.body.hobbies
    },{
        new : true
    });

    if(!modifiedAuthor) return res.status(404).send('The author with given information is not present');
    res.status(200).send(modifiedAuthor);
})

router.delete('/:id', async (req,res) => {
    const removedAuthor = await Author.findByIdAndRemove(req.params.id);
    
    if(!removedAuthor) return res.status(404).send('The author with given information is now present');

    res.status(200).send(removedAuthor);
})

module.exports.authorRouter = router;