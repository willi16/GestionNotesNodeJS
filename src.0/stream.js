 import {createReadStream,createWriteStream} from 'node:fs';
 import {stat} from 'node:fs/promises';


 const stream = createReadStream('data.json');

 const newStream = createWriteStream('data-copy.json')

 const fileSize = (await stat('data.json')).size
 
 let percent = 0;

// // stream.on("readable", ()=>{
// //     const part = stream.read();
// //     console.log("Readable....",part);
// // })

 //stream.pipe(newStream);

stream.on("data", (chunk)=>{
     const chunk_size = chunk.length;
     percent += (chunk_size/fileSize)*100
     console.log(Math.round(percent));
     newStream.write(chunk);
    
})

stream.on('close', ()=>{
     console.log("Stream closed....");
})


// import { createReadStream, createWriteStream, statSync } from 'node:fs';
// import ProgressBar from 'progress';

// const bar = new ProgressBar('[:bar] :percent :etas', {
//   total: statSync('data.json').size,
//   width: 50
// });

// const stream = createReadStream('data.json');
// stream.pipe(createWriteStream('data-copy.json'));
// stream.on('data', (chunk) => bar.tick(chunk.length));