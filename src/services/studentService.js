import uuid from "../generateur.js"
import Database from "../config/database.js"
import StudentRepository from "../repository/studentRepository.js"
import Repository from "../repository/repository.js"



export default class StudentService {

    students = [
        {
            'id':1000,
            'firstname':'TAMBA',
            'lastname':'Nabila',
            'sexe':'F',
            'birthday':'01/01/2002'
        }
    ];

    // repository;

    // constructor(){
    //     this.repository = new Repository();
    // }

    studentRepository;

    constructor(){
        this.studentRepository = new StudentRepository();
    }

    //création d'un constructeur
    uuidGen;

    // constructor(){
    //     this.uuidGen = uuid(1000);
    // }
    // constructor() {}

    async getAll(){
        // const db = await Database.getDatabaseInstance();
        // return await db.connection.all('select * from students;');
        // return this.students;
        return this.studentRepository.findAll();
    }

    async get(id){
        // const db = await Database.getDatabaseInstance();
        // return db.connection.get(
        //     "select * from students where id=:student_id;",
        //     {
        //         ':student_id': id
        //     }
        // )

        // return this.students.find(student => student.id === id)

        return this.studentRepository.find(id);
    }

    async create(student_data){
        // student_data.id = this.uuidGen.next().value;
        // this.students.push(student_data);
        // return student_data;
        // const db = await Database.getDatabaseInstance();
        // const{firstname,lastname,sexe,birthday} = student_data;
        // const insert_sql = `
        // insert into students(firstname,lastname,sexe,birthday)
        // values(:firstname,:lastname,:sexe,:birthday);
        // `;
        // const {lastID} = await db.connection.run(insert_sql,{
        //     ':firstname' : firstname,
        //     ':lastname' : lastname,
        //     ':sexe' : sexe,
        //     ':birthday' : birthday

        // });
        const lastID = this.studentRepository.save(student_data);


        return this.get(lastID)

    }

    async update(id, student_data) {
        // const db = await Database.getDatabaseInstance();
        // const { firstname, lastname, sexe, birthday } = student_data;

        // const update_sql = `
        //     UPDATE students 
        //     SET firstname = :firstname, 
        //         lastname = :lastname, 
        //         sexe = :sexe, 
        //         birthday = :birthday
        //     WHERE id = :id;
        // `;

        // const result = await db.connection.run(update_sql, {
        //     ':firstname': firstname,
        //     ':lastname': lastname,
        //     ':sexe': sexe,
        //     ':birthday': birthday,
        //     ':id': id
        // });

        
        // return this.get(id);
        const lastID = this.studentRepository.update(student_data);

        return this.get(lastID)

    }



    async delete(id) {
        const db = await Database.getDatabaseInstance();

        const delete_sql = `
            DELETE FROM students
            WHERE id = :id;
        `;

        await db.connection.run(delete_sql, {
            ':id': id
        });

       
        return { deleted: true, id };
    }
    // update(id,student_data){
    //     //find student
    //     const student = this.get(id);
    //     //update students informations
    //     if (student !== undefined){
    //         student.firstname = student_data.firstname
    //         student.lastname = student_data.lastname
    //         student.sexe = student_data.sexe
    //         student.birthday = student_data.birthday

    //         return student;
    //     }
        

    // }

    // delete(id,student_data){
    //     //find student
    //     const student = this.get(id);
    //     //delete students informations
        
    //     const index = this.students.indexOf(student)
    //     if (index !== -1){
    //         this.students.splice(index, 1);
    //     }

    // }


}