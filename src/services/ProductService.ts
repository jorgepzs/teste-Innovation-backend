import { productRepository } from "../repositories/ProductRepository";
import { DeleteResult } from "typeorm";

export interface PayloadProduct {
  [x: string]: any;
  name?: string;
  category?: string;
  quantity?: number;
  status?: string;
  id?: string;
}

export class registerProductService {
  async execute({ name, category, quantity }: PayloadProduct) {
    try {
      if (!category || typeof category != "string") {
        return new Error(`Category not entered or Not is a String`);
      }

      if (!name || typeof name != "string") {
        return new Error(`Name not entered or Not is a String`);
      }
      if (!quantity || typeof quantity != "number") {
        return new Error(`quantity not entered or Not is a Number`);
      }
      if (quantity <= 0) {
        return new Error(`quantity must be greater than zero `);
      }

      const trimName = name.replace(/\s/g, "");
      const trimCategory = category.replace(/\s/g, "");
      const verifyExistsProduct = await productRepository.findOneBy({
        name: trimName,
      });

      if (verifyExistsProduct) {
        return new Error(`The product ${trimName} Already Registred`);
      }

      const newProduct = productRepository.create({
        category: trimCategory,
        name: trimName,
        quantity,
      });

      if (!newProduct) {
        return new Error(`Registration Failed`);
      }
      await productRepository.save(newProduct);

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
}

export class listProducService {
  async execute() {
    try {
      const listProducts = await productRepository.find();

      if (!listProducts) {
        return new Error(`Internal Server Error`);
      }

      return listProducts;
    } catch (error) {
      return error;
    }
  }
}
export class DeleteProductService {
  async execute(name: string) {
    try {
      if (!name || typeof name != "string") {
        return new Error(`Name not entered or Not is a String`);
      }
      const trimName = name.replace(/\s/g, "");
      const verifyProduct = await productRepository.findOneBy({
        name: trimName,
      });

      if (!verifyProduct) {
        return new Error(` The Product ${trimName} not found `);
      }
      const deletProduct = await productRepository.delete({ name: trimName });

      if (!DeleteResult) {
        return new Error(`Internal Server Error`);
      }
      return deletProduct;
    } catch (error) {
      console.log(error, "Internal Server Error");
    }
  }
}

export class PutProductService {
  async execute(data) {
    try {
      if (data.category) {
        if (data.category != "string") {
          return new Error(`Category  Not is a String`);
        }
      }

      if (data.name) {
        if (typeof data.name != "string") {
          return new Error(`Name Not is a String`);
        }
      }

      if (data.quantity) {
        if (typeof data.quantity != "number") {
          return new Error(`quantity Not is a Number`);
        }
        if (data.quantity <= 0) {
          return new Error(`quantity must be greater than zero `);
        }
      }

      const { id } = data;
      const verifyExistsProduct = await productRepository.findOneBy({ id: id });

      if (!verifyExistsProduct || verifyExistsProduct === undefined) {
        return new Error(`Product ${data.name.replace(/\s/g, "")} not found`);
      }

      const putProduct = await productRepository.update(id, data);

      if (!putProduct) return new Error("Internal Server Error");
      const verifyChangeProduct = await productRepository.findOneBy({
        id: id,
      });
      if (verifyChangeProduct === verifyExistsProduct) {
        return new Error("internal server error");
      }
      return verifyChangeProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
