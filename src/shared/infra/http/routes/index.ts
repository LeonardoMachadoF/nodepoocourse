import { Router } from "express";
import { usersRouter } from "./users.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";

const routes = Router();

routes.use(authenticateRoutes)
routes.use('/cars', carsRoutes)
routes.use('/users', usersRouter)
routes.use('/rentals', rentalRoutes)
routes.use('/password', passwordRoutes)
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);

export { routes };