import http from "node:http";
import dotenv from 'dotenv';

import StudentController from "./controllers/studentController.js";
import { HTTP_STATUS_CODE } from "./constants/httpStatus.js";
import Database from "./config/database.js";

dotenv.config();

// const db_path = "/home/socrate/semestre5/NodeJs/gestion_note/src/config/database.js";

const db = await Database.getDatabaseInstance();
// await db.openDb(db_path);

console.log(db);


const studentController = new StudentController();

const server = http.createServer((req,res)=>{
    const method = req.method;
    const url = new URL(req.url,`http://${req.headers.host}`);
    // console.log(url);
    // console.log(req.headers);
    const endpoint = method+":"+url.pathname;

    res.setHeader(
        'content-Type', 'application/json'
    );

    switch (endpoint) {
        case 'GET:/students':
            studentController.read(req,res);
            break;
        case 'GET:/student':
            studentController.get(req,res);
           
            break;
        case 'POST:/students':
            studentController.create(req,res);
            break;
        case 'PUT:/student':
            studentController.update(req,res);
            break;
        case 'DELETE:/student':
            studentController.delete(req,res);

            break;
    
        default:
            res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
            res.end(JSON.stringify({
                "message" : "Page not found"
            }));
            break;
    } 

});
//  console.log(process.env.PORT );
server.listen(process.env.PORT || 3000,()=>{
    console.log("serveur started...");
});
//process.env.PORT contient le processus courant