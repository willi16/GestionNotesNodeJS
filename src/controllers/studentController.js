import {json,text} from "node:stream/consumers";
import StudentService from "../services/studentService.js";
import { HTTP_STATUS_CODE } from "../constants/httpStatus.js";


export default class StudentController{

    studentService;

    constructor(){
        this.studentService = new StudentService();
    }

    
    async read(req, res){
        res.writeHead(HTTP_STATUS_CODE.SUCCESS);
        res.end(JSON.stringify(await this.studentService.getAll()));
    }
    
    async get(req, res){
        const url = new URL(req.url,`http://${req.headers.host}`);
        const idParam = url.searchParams.get("id");
        // console.log(url.searchParams.get("id"));
        // let student;

        //Recherche de l'étudiant
        // this.students.forEach((elt) =>{
        //     if (elt.id===id){
        //         student = elt;
        //     }

        // })
        //Recherche de l'étudiant avec le service
        const student = await this.studentService.get(parseInt(idParam));

        if (student === undefined){
            res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
            res.end(JSON.stringify({
                "message": 'Resource not found!'
            }));
        }
        else{
            res.writeHead(HTTP_STATUS_CODE.SUCCESS);
            res.end(JSON.stringify(student));
        }
            
    }

    async create(req, res){
        // let body = "";
        // req.on('data',(chunk) => {
        //     body+=chunk.toString();
        // });
        // req.on('close',() => {

        // });
        //utilisation de fonction de consomation

        const {firstname,lastname,sexe,birthday} = await json(req);

        const student = {
            
            'firstname':firstname !== undefined ? firstname : "",
            'lastname':lastname !== undefined ? lastname : "",
            'sexe':sexe !== undefined ? sexe : "M",
            'birthday':birthday !== undefined ? birthday : "01/01/2000",
        }
        // console.log(body);
        
        // const student = Object.assign({}, body);
        // const newStudent = this.studentService.create({
        //         firstname,
        //         lastname,
        //         sexe,
        //         birthday
        // });

        const newStudent = await this.studentService.create(student);

        
        // this.students.push(student);


        res.writeHead(HTTP_STATUS_CODE.CREATED, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(this.students));

        res.end(JSON.stringify({ message: 'Etudiant créé', newStudent }))
    }

    async update(req, res) {
        //Recherche de l'id de l'étudiant dont on veut modifier les données dans l'url et le convertit en entier
        // const id = parseInt(new URL(req.url, `http://${req.headers.host}`).searchParams.get("id"));


        // try {
        //     const body = await json(req);

        //     //Avoir l'étudiant dont l'id a été donné
        //     const student = this.students.find(etd => etd.id === id);

        //     //Application de la modification
        //     Object.assign(student, body);

        //     res.writeHead(200, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ message: 'Etudiant a été modifié', student }));
        // } catch {
        //     res.writeHead(400, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ message: 'Invalid JSON' }));
        // }



        //CORRECTION

        const url = new URL(req.url,`http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id"));
        // let student;

        //Recherche de l'étudiant
        // this.students.forEach((elt) =>{
        //     if (elt.id===id){
        //         student = elt;
        //     }

        // })
        const {firstname,lastname,sexe,birthday} = await json(req);

        const student = {
            
            'firstname':firstname !== undefined ? firstname : "",
            'lastname':lastname !== undefined ? lastname : "",
            'sexe':sexe !== undefined ? sexe : "M",
            'birthday':birthday !== undefined ? birthday : "01/01/2000",
        }
        
        const updated_student = this.studentService.update(id,student);

        if (updated_student){
            res.writeHead(HTTP_STATUS_CODE.SUCCESS);
            res.end(JSON.stringify(updated_student));
            return;
        }
        res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
        res.end(JSON.stringify({
            "message": 'Resource not found!'
        }));
        


        // if (student === undefined){
        //     res.writeHead(404);
        //     res.end(JSON.stringify({
        //         "message": 'Resource not found!'
        //     }));
        // }
        // else{
        //     const {firstname,lastname,sexe,birthday} = await json(req);
        //     student.firstname = firstname !== undefined ? firstname :student.firstname,
        //     student.lastname = lastname !== undefined ? lastname : student.lastname,
        //     student.sexe = sexe !== undefined ? sexe : student.sexe,
        //     student.birthday = birthday !== undefined ? birthday : student.birthday,
        //     res.writeHead(200);
        //     res.end(JSON.stringify(student));
        // }

        
    }

    

    delete(req, res) {
        //Recherche de l'id de l'étudiant qu'on veut supprimer les données dans l'url et le convertit en entier
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id"));

        //Trouver l'étudiant dans la liste d'étudiant
        // const student = this.students.find(etd => etd.id === id);

        //Supprimer l'étudiant
        // this.students = this.students.filter(etd => etd.id !== id);
        this.studentService.delete(id);

        res.writeHead(HTTP_STATUS_CODE.NO_CONTENT, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Etudiant supprimé avec succès'}));
    }


}