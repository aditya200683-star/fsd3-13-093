import {readFile, writeFile, appendFile, unlink} from "fs/promises";
const writedata = async (fname, contents) => {
    await writeFile(fname, contents);
    console.log("File written");
};
const readData = async (fname) => {
    const data = await readFile(fname, "utf-8");
    console.log("file contents");
    console.log(data);
}
const appendData = async (fname, contents) => {
    await appendFile(fname, "\n" + contents);
}
const deletedata = async (fname) =>{
    await unlink(fname);
    console.log(`${fname} file is deleted`)
}
await writedata("happy.txt", "I am very happy");
await readData("happy.txt");
await appendData("happy.txt", "FSD is intresting");
await readData("happy.txt");
await deletedata("happy.txt");
