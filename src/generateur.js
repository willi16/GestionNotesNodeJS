export default function* uuid(start_index){
    // const fruits = ["mangue","banane","papaye"]
    // for (let index = 0; index < fruits.length; index++) {
    //     yield fruits[index];
        
    // }

    // for (let index = 0; index < 10; index++) {
    //     yield fruits[index];
        
    // }
    // console.log("Hello my sweety");
    // yield "Hello";
    // console.log("Hello my sweety2");

    let i = start_index;
    while (true){ 
        yield i++;
    }

}

// const uuidgen =uuid();

// console.log(uuidgen.next());
// console.log(uuidgen.next());
// console.log(uuidgen.next());
// console.log(uuidgen.next());
