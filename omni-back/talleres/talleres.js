const express = require('express');
const router = express.Router();
const TalleresModel = require('../Modelo/Talleres'); //Importando el modelo de talleres

router.get('/open', async (req, res) => {
  try {
    // Obtén todos los talleres desde la base de datos
    const talleresOpen = await TalleresModel.find();
    console.log("Talleres encontrados:", talleresOpen);
    res.json(talleresOpen);
    console.log("Búsqueda talleres OPEN");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los talleres OPEN' });
  }
});

router.get('/ibm', async (req, res) => {
  try {
    // Obtén todos los talleres desde la base de datos
    const talleresIbm = await TalleresModel.find();
    console.log("Talleres encontrados:", talleresIbm);
    res.json(talleresIbm);
    console.log("Búsqueda talleres IBM");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los talleres IBM' });
  }
});

module.exports = router;