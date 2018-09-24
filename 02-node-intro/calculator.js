/*
calculator.js
calculator object
	add(x,y)
	subtract(x,y)
	multiply(x,y)
	divide(x,y)

Invoke all the methods for x = 100 and y = 50 and print the results
*/

var calculator = {
	add(x,y){
		return x + y;
	},
	subtract(x,y){
		return x - y;
	},
	multiply(x,y){
		return x * y;
	},
	divide(x,y){
		return x / y;
	}
};

var x = 100,
	y = 50;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));

