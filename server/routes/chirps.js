const express = require('express');
const chirpsStore = require('../chirpstore.js');

let router = express.Router();

// Creates copy of chirp by ID
router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.json(chirpsStore.GetChirps());
    }
});

// Creates chirp
router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

// Delete a chirp by id
router.delete('/:id', (req, res) => {
    let id = req.params.id
    chirpsStore.DeleteChirp(id);
    res.json(chirpsStore.GetChirps());
})

// Update a chirp by id
router.put('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.UpdateChirp(id, req.body)
    res.json(chirpsStore.GetChirps());
})


module.exports = router;