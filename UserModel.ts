import {promises} from "fs";
import {User} from"../types/User";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";
const mysql = require('mysql2');

export class UserModel {
    private conn;

    constructor() {
        // create the pool
        const pool = mysql.createPool({host: 'localhost', user: 'root', database: 'smartphones'});
        // now get a Promise wrapped instance of that pool
        this.conn = pool.promise();
    }

   // getNewId(users: User[]): number {
     //   return users[users.length - 1].id + 1;}

    async getUsers(): Promise<User[]> {
        const data = await promises.readFile(__dirname + "/db.json", "utf-8");
        return JSON.parse(data) as User[];
    }

    async createUser(userDataInput: UserDataInput): Promise<boolean> {
        const insertDataObject = [
            userDataInput.username,
            userDataInput.password,
            (userDataInput.first_name) ? userDataInput.first_name:null,
            (userDataInput.last_name) ? userDataInput.last_name:null,
            (userDataInput.email) ? userDataInput.email:null
        ]
        await this.conn.execute("INSERT INTO 'users'(username,password,first_name,last_name,email)"+
        "VALUES(?,?,?,?,?),",insertDataObject);
        return true;
    }

    async updateUser(id:number,updateUserData:UpdateUserData): Promise<boolean> {
        const updateUserDataArray =Object.entries(updateUserData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i= 0; i<updateUserDataArray.length;i++){
            setStatement +=`${updateUserDataArray[i][0]}= ?`
            setStatement+=(i+1 !== updateUserDataArray.length) ? ",":" "
            preparedStatementData.push(updateUserDataArray[i][0])
        }
        preparedStatementData.push(id);
        await this.conn.execute(`UPDATE "users" SET ${setStatement} WHERE id =? `,preparedStatementData);
        return true;
    }
    async deleteUser(id:number): Promise<boolean> {
        await this.conn.execute("DELETE FROM 'users' WHERE id = ?",[id]);
        return true;
    }

}