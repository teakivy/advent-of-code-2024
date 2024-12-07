import fs from 'fs';

function part1() {
	let input = readInput().replaceAll('\r', '');
	let rules = input.split('\n');
	for (let i = 0; i < rules.length; i++) {
		let value = parseInt(rules[i].split(': ')[0]);
		let nums = rules[i]
			.split(': ')[1]
			.split(' ')
			.map((num) => parseInt(num));

		rules[i] = { value, nums };
	}

	let sum = 0;
	for (let rule of rules) {
		if (isEquation(rule, ['+', '*'])) {
			sum += rule.value;
		}
	}
	return sum;
}

function isEquation(rule, operators) {
	let combinations = [];
	let n = rule.nums.length;
	let numOperators = operators.length;

	for (let i = 0; i < numOperators ** (n - 1); i++) {
		let combination = [];
		let temp = i;

		for (let j = 0; j < n - 1; j++) {
			combination.push(rule.nums[j]);
			combination.push(operators[temp % numOperators]);
			temp = Math.floor(temp / numOperators);
		}

		combination.push(rule.nums[n - 1]);
		combinations.push(combination);
	}

	for (let combination of combinations) {
		let total = evaluateEquation(combination, operators);
		if (total === rule.value) {
			return true;
		}
	}

	return false;
}

function evaluateEquation(equation) {
	let total = equation[0];
	for (let i = 1; i < equation.length; i++) {
		if (equation[i] === '+') {
			total += equation[i + 1];
		}
		if (equation[i] === '*') {
			total *= equation[i + 1];
		}
		if (equation[i] === '||') {
			total = parseInt(total.toString() + equation[i + 1].toString());
		}
	}
	return total;
}

function part2() {
	let input = readInput().replaceAll('\r', '');
	let rules = input.split('\n');
	for (let i = 0; i < rules.length; i++) {
		let value = parseInt(rules[i].split(': ')[0]);
		let nums = rules[i]
			.split(': ')[1]
			.split(' ')
			.map((num) => parseInt(num));

		rules[i] = { value, nums };
	}

	let sum = 0;
	for (let rule of rules) {
		if (isEquation(rule, ['+', '*', '||'])) {
			sum += rule.value;
		}
	}
	return sum;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day7/input.txt', 'utf8');
	return input;
}
