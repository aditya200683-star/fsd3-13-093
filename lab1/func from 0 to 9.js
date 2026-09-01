const words = [
    "zero","one","two","three","four",
    "five","six","seven","eight","nine"
];

function toWords(num) {
    if (num === 0) return;

    toWords(Math.floor(num / 10));
    console.log(words[num % 10]);
}

toWords(123);