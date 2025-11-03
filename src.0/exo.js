import {readFile , writeFile} from "node:fs/promises" ;


const path = "data.json"
const newPersonnes = [
    {
        name: "Dado",
        tel: "90646424",   
        email: "socrate123@gmail.com"
    },
    
    {
        name: "Kangni",
        tel: "90695190",   
        email: "damien01@gmail.com"
    }
]

try {
    const data = await readFile(path, "utf8");
    const contents = JSON.parse(data);

    contents.push(newPersonnes); 

    await writeFile(path, JSON.stringify(contents, null, 2));
    console.log("Nouvelles personnes ajoutées !");
} catch (err) {
    console.error(err);
}


