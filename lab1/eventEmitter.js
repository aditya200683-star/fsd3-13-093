import {EventEmitter} from 'node:events';
const task =  new EventEmitter();
const sayHi = (name)=>{
    console.log(`hi ${name}`);
}
task.on('greet', sayHi);
task.emit("greet", "Anil Pandey");