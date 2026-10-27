import * as housesRepository from "../repositories/houses.repository.js";

export async function getAllHouses(req, res) {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.json(allHouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente houses", code: err.code });
  }
}

export async function getSingleHouse(req, res) {
  try {
    const { id } = req.params;
    const house = await housesRepository.getHouseById(id);

    if (house) {
      res.status(200).json(house);
    } else {
      res.status(404).json({ error: "Hus ikke fundet" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente house" });
  }
}
