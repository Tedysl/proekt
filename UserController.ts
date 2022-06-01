import {Request, Response} from "express";
import {User} from "../types/User";
import {LoginData} from "../types/LoginData";
import {UserModel} from "../models/UserModel";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";

export const getUsers= async (request: Request, response: Response)=> {
        let users :User[] = await new UserModel().getUsers();
        response.send(users)
    }
export const createUser= async(request: Request, response: Response)=> {
    let userData : UserDataInput = request.body;
    if(!userData.username){
        return response.send({
            status:400,
            message:"Username has not been provided"
        })
    }if(!userData.password){
        return response.send({
            status:400,
            message:"Password has not been provided"
        })
    }
    const userModel = new UserModel();
    await userModel.createUser(userData);
    response.send({
        status:200,
        message:"User created successfully"
    })

    //const userModel = new UserModel();
    //await this.userModel.updateUserList(user);
}

    export const updateUser = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    let updateUserData : UpdateUserData = request.body;
    const userModel = new UserModel();
    await userModel.updateUser(id ,updateUserData);
    response.send({
        status:200,
        message:`User with id ${id} was updated successfully `
    })
    }

    export const deleteUser = async (request: Request, response: Response) => {
        let id = Number(request.params.id);
        const userModel=new UserModel();
        await userModel.deleteUser(id);
        response.send({
            status:200,
            message:`User with id ${id} was deleted successfully`
        })
    }

    export const login = (request: Request, response: Response) => {
        const loginData: LoginData = request.query;
        if (!loginData.username || !loginData.password) {
            return response.send({
                status: 400,
                message: "Username or Password not provided"
            })
        }
        response.send({
            status: 200,
            message: "Logged in successfully"
        })
    }
