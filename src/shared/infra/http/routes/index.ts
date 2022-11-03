import { Router } from "express";
import { usersRouter } from "./users.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";

const routes = Router();

routes.use(authenticateRoutes)
routes.use('/cars', carsRoutes)
routes.use('/users', usersRouter)
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);

export { routes };