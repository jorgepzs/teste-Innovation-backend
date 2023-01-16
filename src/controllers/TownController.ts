import { townService } from "../services/TownService";
import { Request, Response } from "express";

export class TownController {
  async register(req: Request, res: Response) {
    try {
      const service = new townService();

      const regiserRjTowns = await service.execute();

      if (regiserRjTowns instanceof Error) {
        return res.status(400).json(regiserRjTowns.message);
      }

      return res.status(200).json(regiserRjTowns);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
