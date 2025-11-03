export default  class Repository {
    constructor() {
        if (new.target === Repository){
        throw new Error("Repository est une classe abstraite. Elle ne peut pas être instanciée directement.");

        }
        // console.log(new.target)
    }

    save(student){}
    find(id){}
    findAll(){}
    update(id,student){}
    delete(id){}
}


 