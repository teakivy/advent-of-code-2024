import fs from 'fs';

function part1() {
	let lines = readInput().replaceAll('\r', '').split('\n');

	let safe = 0;
	for (let line of lines) {
		let nums = line.split(' ');
		nums = nums.map((n) => parseInt(n));

		let isSafe = true;
		let increasing = nums[0] < nums[1];
		for (let i = 1; i < nums.length; i++) {
			// if increasing, check if the next number is greater than the current number
			if (increasing && nums[i] < nums[i - 1]) {
				isSafe = false;
				break;
			} else if (!increasing && nums[i] > nums[i - 1]) {
				isSafe = false;
				break;
			}
			let diff = Math.abs(nums[i] - nums[i - 1]);
			if (diff > 3 || diff <= 0) {
				isSafe = false;
				break;
			}
		}
		if (isSafe) safe++;
	}

	return safe;
}

function part2() {
	let lines = readInput().replaceAll('\r', '').split('\n');
	for (let i = 0; i < lines.length; i++) {
		lines[i] = possibleSplits(lines[i]);
	}

	let safety = [];
	for (let l of lines) {
		let lSafe = false;
		for (let line of l) {
			let nums = line.split(' ');
			nums = nums.map((n) => parseInt(n));

			let isSafe = true;
			let increasing = nums[0] < nums[1];
			for (let i = 1; i < nums.length; i++) {
				// if increasing, check if the next number is greater than the current number
				if (increasing && nums[i] < nums[i - 1]) {
					isSafe = false;
					break;
				} else if (!increasing && nums[i] > nums[i - 1]) {
					isSafe = false;
					break;
				}
				let diff = Math.abs(nums[i] - nums[i - 1]);
				if (diff > 3 || diff <= 0) {
					isSafe = false;
					break;
				}
			}
			if (isSafe) {
				lSafe = true;
				break;
			}
		}
		safety.push(lSafe);
	}

	let safe = 0;
	for (let s of safety) {
		if (s) safe++;
	}

	return safe;
}

function possibleSplits(line) {
	let arr = line.split(' ');
	let splits = [line];
	for (let i = 0; i < arr.length; i++) {
		let copy = arr.slice();
		copy.splice(i, 1);
		splits.push(copy.join(' '));
	}

	return splits;
}

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day2/input.txt', 'utf8');
	return input;
}

export default { part1, part2 };
