drop table if exists students;

CREATE TABLE IF NOT EXISTS students(
        id integer PRIMARY KEY autoincrement,
        firstname TEXT,
        lastname TEXT,
        sexe TEXT,
        birthday DATE,
        check(sexe in ('M','F'))
    );