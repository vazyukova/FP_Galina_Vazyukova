const { range } = rxjs;

function isPrime(num) {
    if (num <= 1) {
      return false;
    }
  
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
  
    return true;
  }
  
const numberStream$ = range(0, 100)
let simpleNumbers = "";

numberStream$.subscribe(i => {
    if (isPrime(i)) {
        simpleNumbers += i + " ";
      }
})

console.log(simpleNumbers)
