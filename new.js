const f1 = () => {
    f2();
    console.log("f1");
};

const f2 = () => {
    f3();
    console.log("f2");
};

const f3 = () => {
    console.log("f3");
};

const writeData = () => {
    console.log("writeData");
};

const main = () => {
    console.log("main");

    writeData();

    setTimeout(f2, 0);
    setTimeout(f3);

    process.nextTick(f1);

    console.log("end");

    new Promise((resolve, reject) => {
        console.log("i am new promise1");
    });

    new Promise((resolve, reject) => {
        console.log("i am new promise2");
    });
};

main();