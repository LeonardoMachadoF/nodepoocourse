import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { GetUsersController } from "../../../../modules/accounts/useCases/getUsers/GetUsersController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from '../../../../config/upload';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const getUsersController = new GetUsersController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.get('/', ensureAuthenticated, getUsersController.handle);
usersRouter.post('/', createUserController.handle);
usersRouter.patch('/', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRouter };