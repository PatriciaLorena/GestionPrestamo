const {PrestamoModel  } = require("../models/prestamo.model");

module.exports = {
    getAllPrestamos: (req, res) => {
        PrestamoModel.find({})
            .populate("cliente", "name")
            .then((allPrestamos) => res.json({ prestamos: allPrestamos }))
            .catch((err) =>
                res.status(500).json({ message: "something went wrong", error: err })
            );
    },
    createNewPrestamo: (req, res) => {
        let newPrestamoCreated;
        PrestamoModel.create(req.body)
        .then((newPrestamo) =>{ 
            newPrestamoCreated = newPrestamo;
            /*
            return ClienteModel.findOneAndUpdate(
                { _id: req.body.cliente},
                { $push: { prestamos:newPrestamo._id}},
                {new:true}
            );*/
        })
        .then((updatedPrestamo) => PrestamoModel.findOne({ _id: newPrestamoCreated._id}).populate("cliente" , "name"))
        .then((newPrestamo) => res.status(201).json(newPrestamo))
        .catch((err) =>
                res.status(500).json({ message: "something went wrong", error: err })
            );
    },
    getOnePrestamoById: (req, res) => {
        PrestamoModel.findOne({ _id: req.params.id })
            .then((oneSinglePrestamo) => res.json({ prestamo: oneSinglePrestamo }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
    updateOnePrestamoById: (req, res) => {
        PrestamoModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
            .then((updatedPrestamo) => res.status(200).json({ prestamo: updatedPrestamo }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
    deleteOnePrestamoById: (req, res) => {
        PrestamoModel.deleteOne({ _id: req.params.id })
            .then((result) => res.status(200).json({ prestamos: result }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },

}

    