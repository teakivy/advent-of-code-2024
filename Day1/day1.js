import fs from 'fs';

function part1() {
	let input = readInput();

	let left = [];
	let right = [];

	let lines = input.split('\n');
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let l = line.split('   ');
		left.push(parseInt(l[0]));
		right.push(parseInt(l[1]));
	}

	left = left.sort((a, b) => a - b);
	right = right.sort((a, b) => a - b);

	let distance = 0;
	for (let i = 0; i < left.length; i++) {
		distance += Math.abs(left[i] - right[i]);
	}

	return distance;
}

function part2() {
	let input = readInput();

	let left = [];
	let right = [];

	let lines = input.split('\n');
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let l = line.split('   ');
		left.push(parseInt(l[0]));
		right.push(parseInt(l[1]));
	}

	let similarity = 0;
	for (let num of left) {
		let count = 0;
		for (let num2 of right) {
			if (num == num2) {
				count++;
			}
		}

		similarity += num * count;
	}

	return similarity;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day1/input.txt', 'utf8');
	return input;
}
