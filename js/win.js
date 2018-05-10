// Getting (on the next page)
var rate = sessionStorage.rating.split(/[,]+/);
console.log(rate);
document.getElementById('rating').innerHTML = rate[0];
document.getElementById('time').innerHTML = rate[1];