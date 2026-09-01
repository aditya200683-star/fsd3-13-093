import{EventEmitter} from "node:events";
const task=new EventEmitter();
const sayhi=(name)=>{
    console.log(`Welcome to ${name}`);

};
const starts=()=>{
    console.log("system Started");
    
};
task.on("greet",starts);
task.on("greet",sayhi);
task.emit("greet","Aditya patel");

