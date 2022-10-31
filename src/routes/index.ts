import { Router } from "express";
import { usersRouter } from "./users.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const routes = Router();

routes.use('/users', usersRouter)
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);

export { routes };