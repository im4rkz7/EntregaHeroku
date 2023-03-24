import { Router } from "express";
import { faker } from "@faker-js/faker";

const productTestRouter = Router();

productTestRouter.get("/", (req, res) => {
  const products = Array.from({ length: 5 }).map(() => ({
    name: faker.name.firstName(),
    price: faker.random.numeric(4),
    photo: faker.image.imageUrl(),
  }));

  res.json(products);
});

export default productTestRouter;
