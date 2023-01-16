import { AppDataSource } from "../dataBase/data-source";
import { TownsRJ } from "../dataBase/entities/TownsRioDeJaneiro";

export const TownsRjRepository = AppDataSource.getRepository(TownsRJ);
