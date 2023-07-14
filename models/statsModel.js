const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    compledSeminars: {
        type: Number,
        required: true
    },
    onlineConsultation: {
        type: Number,
        required: true
    },
    totalClients: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Stats', statsSchema);