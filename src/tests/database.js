import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb () {
  return open({
    filename: '/home/socrate/semestre5/NodeJs/gestion_note/src/db.sqlite',
    driver: sqlite3.Database
  })
}

const db = await openDb();
const ddl = `
    CREATE TABLE IF NOT EXISTS students(
        id integer PRIMARY KEY autoincrement,
        firstname TEXT,
        lastname TEXT,
        sexe TEXT,
        birthday DATE,
        check(sexe in ('M','F'))
    );
`;

const dml = `
    INSERT INTO students(firstname,lastname,sexe,birthday) 
    VALUES('socrate','DADO','M','1995-06-16'),
        ('Jean','SAGBO','M','1994-11-08'),
        ('Adel','AMOUR','F','1997-09-15'),
        ('Mansour','YERIMA','M','2004-07-11'),
        ('Judith','NOUMONVI','F','1992-05-17')
`;
await db.exec(ddl);
await db.exec(dml);


console.log(db);



