function numberToWord(num) {
    switch (num) {
        case 0:
            return "zero";
        case 1:
            return "One";
        case 2:
            return "Two";
        case 3:
            return "Three";
        case 4:
            return "Four";
        case 5:
            return "Five";
        case 6:
            return "Six";
        case 7:
            return "Seven";
        case 8:
            return "Eight";
        case 9:
            return "Nine";
        default:
            return "Invalid Input";
    }
}

function rollNoToWords(rollNo) {
    let  result = "";
    while(rollNo > 0){
        let n = rollNo % 10;
        result = numberToWord(n) + " " + result;
        rollNo = Math.floor(rollNo / 10);
         
    }
     return result.trim();
}
let rollNo=2503201000093;
console.log(rollNoToWords(rollNo));

