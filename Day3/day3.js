import fs from 'fs';

function part1() {
	let input = readInput();

	let muls = input.split('mul(');

	let numsCheck = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	let mults = [];

	let lastNum = '';
	let currentNum = '';
	for (let i = 1; i < muls.length; i++) {
		let mStr = muls[i];
		if (!numsCheck.includes(mStr[0])) continue;

		while (numsCheck.includes(mStr[0])) {
			currentNum += mStr[0];
			mStr = mStr.slice(1);

			if (mStr.length == 0) break;
		}

		if (currentNum.length == 0) continue;

		lastNum = currentNum;
		currentNum = '';

		if (mStr.length == 0) continue;

		if (mStr[0] == ',') {
			mStr = mStr.slice(1);
		}

		if (mStr.length == 0) continue;

		while (numsCheck.includes(mStr[0])) {
			currentNum += mStr[0];
			mStr = mStr.slice(1);

			if (mStr.length == 0) break;
		}

		if (currentNum.length == 0) continue;

		if (mStr.length == 0) continue;

		if (mStr[0] == ')') {
			mults.push([lastNum, currentNum]);
		}

		lastNum = '';
		currentNum = '';
	}

	let sum = 0;

	for (let i = 0; i < mults.length; i++) {
		let m = mults[i];
		let num1 = parseInt(m[0]);
		let num2 = parseInt(m[1]);

		sum += num1 * num2;
	}

	return sum;
}

function part2() {
	let input = readInput();

	let muls = input.split('mul(');

	let numsCheck = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	let mults = [];

	let lastNum = '';
	let currentNum = '';

	let doing = true;
	for (let i = 1; i < muls.length; i++) {
		let mStr = muls[i];
		if (!numsCheck.includes(mStr[0])) {
			while (mStr.length > 0) {
				if (mStr.startsWith('do()')) {
					mStr = mStr.slice(4);
					doing = true;
				}

				if (mStr.startsWith("don't()")) {
					mStr = mStr.slice(7);
					doing = false;
				}

				mStr = mStr.slice(1);
			}
			continue;
		}

		while (numsCheck.includes(mStr[0])) {
			currentNum += mStr[0];
			mStr = mStr.slice(1);

			if (mStr.length == 0) break;
		}

		if (currentNum.length == 0) {
			while (mStr.length > 0) {
				if (mStr.startsWith('do()')) {
					mStr = mStr.slice(4);
					doing = true;
				}

				if (mStr.startsWith("don't()")) {
					mStr = mStr.slice(7);
					doing = false;
				}

				mStr = mStr.slice(1);
			}
			continue;
		}

		lastNum = currentNum;
		currentNum = '';

		if (mStr.length == 0) {
			while (mStr.length > 0) {
				if (mStr.startsWith('do()')) {
					mStr = mStr.slice(4);
					doing = true;
				}

				if (mStr.startsWith("don't()")) {
					mStr = mStr.slice(7);
					doing = false;
				}

				mStr = mStr.slice(1);
			}
			continue;
		}

		if (mStr[0] == ',') {
			mStr = mStr.slice(1);
		}

		if (mStr.length == 0) {
			while (mStr.length > 0) {
				if (mStr.startsWith('do()')) {
					mStr = mStr.slice(4);
					doing = true;
				}

				if (mStr.startsWith("don't()")) {
					mStr = mStr.slice(7);
					doing = false;
				}

				mStr = mStr.slice(1);
			}
			continue;
		}

		while (numsCheck.includes(mStr[0])) {
			currentNum += mStr[0];
			mStr = mStr.slice(1);

			if (mStr.length == 0) break;
		}

		if (currentNum.length == 0) {
			while (mStr.length > 0) {
				if (mStr.startsWith('do()')) {
					mStr = mStr.slice(4);
					doing = true;
				}

				if (mStr.startsWith("don't()")) {
					mStr = mStr.slice(7);
					doing = false;
				}

				mStr = mStr.slice(1);
			}
			continue;
		}

		if (mStr.length == 0) {
			while (mStr.length > 0) {
				if (mStr.startsWith('do()')) {
					mStr = mStr.slice(4);
					doing = true;
				}

				if (mStr.startsWith("don't()")) {
					mStr = mStr.slice(7);
					doing = false;
				}

				mStr = mStr.slice(1);
			}
			continue;
		}

		if (mStr[0] == ')') {
			if (doing) mults.push([lastNum, currentNum]);
		}

		lastNum = '';
		currentNum = '';

		while (mStr.length > 0) {
			if (mStr.startsWith('do()')) {
				mStr = mStr.slice(4);
				doing = true;
			}

			if (mStr.startsWith("don't()")) {
				mStr = mStr.slice(7);
				doing = false;
			}

			mStr = mStr.slice(1);
		}
	}

	let sum = 0;

	for (let i = 0; i < mults.length; i++) {
		let m = mults[i];
		let num1 = parseInt(m[0]);
		let num2 = parseInt(m[1]);

		sum += num1 * num2;
	}

	return sum;
}

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day3/input.txt', 'utf8');
	return input;
}

export default { part1, part2 };
