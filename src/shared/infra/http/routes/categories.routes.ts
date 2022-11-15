import multer from 'multer';
import { Router } from "express";
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { DeleteCategoryController } from '../../../../modules/cars/useCases/deleteCategory/DeleteCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';


const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.delete('/:name', deleteCategoryController.handle)

categoriesRoutes.post('/import', importCategoryController.handle)

export { categoriesRoutes };