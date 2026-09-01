import { writeFile } from "fs/promises";
await writeFile('stud.txt', 'Name : Aditya Dubey');
console.log("File written");