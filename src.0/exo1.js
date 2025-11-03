import http from "node:http";
//import fs from "node:fs/promises";
import fs from "node:fs";
import Stream from "node:stream";

/**
 *  GET /students -> Students list
 *  GET /student/id -> Student details
 *  POST /students -> Student created
 *  PUT|PATCH /student/id -> student updated
 *  DELETE /student/id -> Student deleted
 */



//création de serveur
const server = http.createServer((req,res)=>{
    // console.log(req);
    // console.log(req.method);

    // console.log(req.url);
    res.writeHead(200,{
        'content-type': 'text/plain'
    })

    if (req.method === 'GET' && req.url === '/students'){
        res.end(JSON.stringify("Liste des étudiants" ));
    }

    if (req.method === 'POST' && req.url === '/students'){
        res.end(JSON.stringify("Ajouter un étudiant"));
    }

    if (req.method === 'GET' && req.url.startsWith('/students/')){
        const id = req.url.split('/')[1];
        res.end(JSON.stringify(`L'étudiant dont l'id est: ${id}`));
    }

    if (req.method === 'PUT' && req.url.startsWith('/students/')){
        const id = req.url.split('/')[1];
        res.end(JSON.stringify(`L'étudiant dont l'id est: ${id} va être modifié`));
    }

    if (req.method === 'PATCH' && req.url.startsWith('/students/')){
        const id = req.url.split('/')[1];
        res.end(JSON.stringify(`L'étudiant dont l'id est: ${id} va être modifié`));
    }

    if (req.method === 'DELETE' && req.url.startsWith('/students/')){
        const id = req.url.split('/')[1];
        res.end(JSON.stringify(`L'étudiant dont l'id est:" ${id} a bien été supprimé`));
    }

    
    // const eleve ={
    //     "name" : "Tamba",
    //     "tel" : "95236415"
    // }

    //Par rapport à la portée il est obligé de créer le read file  ici

    //const html_content = await fs.readFile('./src/index.html','utf8');
    // const stream  = fs.createReadStream('./src/index.html')
    // let html = "";
    // stream.on('data',(chunk) => {
    //     html += chunk;
    // })

    // stream.on('close', ()=>{
    //  res.end(html)// end() prend toujours un string
    // })

    //Meilleur moyen

    //stream.pipe(res);

    
});

//démarrer le serveur
server.listen(3000,()=>{
    console.log("serveur start...");
});