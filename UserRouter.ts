import {Router} from "express";
import {createUser,getUsers,login,updateUser,deleteUser} from "../controllers/UserController";

export const userRouter = Router();
userRouter.get("/users",getUsers);
userRouter.get("/login",login);
userRouter.post("/user",createUser)
userRouter.put("/user/:id",updateUser);
userRouter.delete("/user/:id",deleteUser);