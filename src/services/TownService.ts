import { TownsRjRepository } from "./../repositories/TownsRjRepository";
import fetch from "cross-fetch";

export class townService {
  async execute() {
    try {
      const getTowns = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios"
      );

      const data = await getTowns.json();
     
      if (!getTowns.ok) {
        return new Error("Internal Server Error");
      }

      const TownsRJ = data.map((municipio) => {
        return { id: municipio.id, name: municipio.nome };
      });
      
      const verifyExistsRjTowns = await TownsRjRepository.find(TownsRJ);

      if (verifyExistsRjTowns) {
        return new Error("These municipalities are already registered");
      }

      const insertDb = await TownsRjRepository.insert(TownsRJ);

      if(!insertDb){
        return new Error("Internal Server Error")
      }

      return TownsRJ;

    } catch (error) {
      console.log(error);
    }
  }
}
