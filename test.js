let number = "0505050505";
let res = number.replace(/\B(?=(\d{2})+(?!\d))/g, "&thinsp;");
console.log(res);