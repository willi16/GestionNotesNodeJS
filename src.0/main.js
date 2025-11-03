import {readFile,writeFile,} from 'node:fs/promises'
import {dirname,join} from 'node:path'
const url = new URL(import.meta.url);

const parent_directory = dirname(url.pathname);

const base_directory = join(parent_directory, '..');

const file_path = join(base_directory,'eleves.txt')


//console.log(file_path);


//Lire et Ecrire dans un fichier avec un module de manière syncrone
// const file_path = '/home/socrate/semestre5/NodeJs/gestion_note/eleves.txt';

try {
    const contents =await readFile(file_path,'utf8');
    console.log(contents);
} catch (error) {
    console.log(error);
}