function accumulatorFactory(initResult){
	var result = initResult;

	var accumulator = {
		add(x){
			result += x;
		},
		divide(x){
			result /= x;
		},
		multiply(x){
			result *= x;
		},
		subtract(x){
			result -= x;
		},
		getResult(){
			return result;
		}
	};

	return accumulator;
}

module.exports = accumulatorFactory;