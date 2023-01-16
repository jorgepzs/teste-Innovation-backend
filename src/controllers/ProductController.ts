import {
  DeleteProductService,
  listProducService,
  PutProductService,
} from "./../services/ProductService";
import { Request, Response } from "express";

import {
  PayloadProduct,
  registerProductService,
} from "../services/ProductService";

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, category, quantity }: PayloadProduct = req.body;
    try {
      const service = new registerProductService();
      const newProduct = await service.execute({
        name,
        category,
        quantity,
      });
      if (newProduct instanceof Error) {
        return res.status(400).json(newProduct.message);
      }
      return res
        .status(201)
        .json({ message: `The Product ${name} Registred SucessFul` });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const service = new listProducService();

      const listProducts = await service.execute();

      if (listProducts instanceof Error) {
        return res.status(400).json(listProducts.message);
      }
      return res.status(200).json(listProducts);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async put(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;
    data.id = id
    
    const service = new PutProductService();
    const putProduct = await service.execute(data);

    if (putProduct instanceof Error) {
      return res.status(400).json(putProduct.message);
    }
    return res
      .status(201)
      .json({ message: `The Product ${putProduct.name} Altered SucessFul` });
  }

  async delete(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const service = new DeleteProductService();

      const deletProduct = await service.execute(name);

      if (deletProduct instanceof Error) {
        return res.status(400).json(deletProduct.message);
      }
      return res.status(200).json({message:`The Product ${name} Has Deleted Sucessful` });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
