const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "el nombre es requerido"],
        minlength: [3, "el nombre debe tener al menos 3 caracteres"], 
    },
    direccion: { 
        type: String,
        required: [true, "el nombre es requerido"],
    },
    telefono: { 
        type: String,
        required: [true, "el nombre es requerido"],
    },
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Mascota",
        //required: [true, "el propietario es requerido"],
    },
}, { timestamps: true });
module.exports.PersonModel = mongoose.model('Person', PersonSchema);

