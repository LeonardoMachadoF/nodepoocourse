import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { GetUsersController } from "../../../../modules/accounts/useCases/getUsers/GetUsersController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from '../../../../config/upload';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const getUsersController = new GetUsersController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', ensureAuthenticated, profileUserController.handle);
usersRouter.patch('/', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);
usersRouter.get('/all', ensureAuthenticated, ensureAdmin, getUsersController.handle);

export { usersRouter };