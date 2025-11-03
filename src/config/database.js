import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'node:fs/promises';
import path from 'node:path';



// import {dirname,join} from 'node:path'
// const url = new URL(import.meta.url);

// const parent_directory = dirname(url.pathname);

// const base_directory = join(parent_directory, '../../');

// const file_path = join(base_directory,'database.js')

export default class Database{
    connection;

    static instance;
    static base_dir_db = path.dirname((new URL(import.meta.url)).pathname);
    static db_path = path.join(this.base_dir_db,'../db.sqlite3');

    constructor(){}

    static async getDatabaseInstance(){
        if (Database.instance === undefined){
            Database.instance = new Database();
            await Database.instance.openDb(Database.db_path)
        }
        return Database.instance;
    }

    

    async openDb (db_path) {

        this.connection = await open({
            filename: db_path,
            driver: sqlite3.Database
        });
        await this.initDb();
    }


    

    async initDb(){
        //Créer les tables ddl.sql
        const base_dir = path.dirname((new URL(import.meta.url)).pathname); 
        const ddl_sql = await fs.readFile(path.join(base_dir,'ddl.sql'),{encoding:'utf-8'});
        await this.connection.exec(ddl_sql);
    

        //Insérer des n-uplets
        const dml_sql = await fs.readFile(path.join(base_dir,'dml.sql'),{encoding:'utf-8'});
        await this.connection.exec(dml_sql);
        
    }

}


