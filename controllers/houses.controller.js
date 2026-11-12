import * as housesRepository from "../repositories/houses.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function getAllHouses(req, res) {
  const allHouses = await housesRepository.getAllHouses();
  res.json(allHouses);
}

export async function getSingleHouse(req, res) {
  const { id } = req.params;

  const house = await housesRepository.getHouseById(id);

  if (house) {
    return res.status(200).json(house);
  }

  throw new HTTPError(404, "House does not exist");
}
