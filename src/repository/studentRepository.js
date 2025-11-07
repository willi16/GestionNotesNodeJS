import Repository from "./repository.js";
import Database from "../config/database.js"


export default class StudentRepository extends Repository {
    constructor() {
        super();
    }


    async findAll(){
        const db = await Database.getDatabaseInstance();
        return await db.connection.all('select * from students;');
    }

    async find(id){
        const db = await Database.getDatabaseInstance();
        return db.connection.get(
            "select * from students where id=:student_id;",
            {
                ':student_id': id
            }
        )
    }

    async save(student_data){
        
        

            const db = await Database.getDatabaseInstance();
            const{firstname,lastname,sexe,birthday} = student_data;
            const insert_sql = `
                insert into students(firstname,lastname,sexe,birthday)
                values(:firstname,:lastname,:sexe,:birthday);
                `;
            const {lastID} = await db.connection.run(insert_sql,{
                ':firstname' : firstname,
                ':lastname' : lastname,
                ':sexe' : sexe,
                ':birthday' : birthday
            
            });
            return lastID;
            
        
        
    }

    async update(id,student_data){
        const student = this.find(id);

        if (student !== undefined){

            const db = await Database.getDatabaseInstance();
            
            const {firstname,lastname,sexe,birthday} = student_data;
            
            const update_sql = `
                UPDATE students 
                SET firstname = :firstname, 
                lastname = :lastname, 
                sexe = :sexe, 
                birthday = :birthday
               WHERE id = :id;
            `;
            
            const result = await db.connection.run(update_sql, {
                ':firstname': firstname,
                ':lastname': lastname,
                ':sexe': sexe,
                ':birthday': birthday,
                ':id': id
            });
        
            return result;

        }
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


 
}

