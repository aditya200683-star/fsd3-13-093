const f1 = () => {
    console.log("f1");
}
const f2 = () => {
    console.log("f2");
}
const f3 = () => {
    console.log("f3");
}
const main = () => {
    console.log("main");
    f1();
    // setTimeout(f2, 5000);
    setInterval(f2, 1);
    f3();
    console.log("end");
}
main();