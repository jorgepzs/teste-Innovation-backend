import { TownController } from './controllers/TownController';
import { ProductController } from './controllers/ProductController';
import { Router } from "express";

const routes = Router();

routes.post('/product', new ProductController().create)

routes.get('/products', new ProductController().list)

routes.delete("/product", new ProductController().delete);

routes.put("/product/:id", new ProductController().put);

routes.get("/rj/towns", new TownController().register)


export default routes;


