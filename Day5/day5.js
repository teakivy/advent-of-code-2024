import fs from 'fs';

function part1() {
	let input = readInput().replaceAll('\r', '');
	let rules = input.split('\n\n')[0].split('\n');
	let updates = input.split('\n\n')[1].split('\n');

	let rulesMap = [];
	for (let i = 0; i < rules.length; i++) {
		let rule = rules[i].split('|');
		rulesMap.push([parseInt(rule[0]), parseInt(rule[1])]);
	}

	let safeUpdates = [];
	for (let update of updates) {
		let safe = true;
		let nums = update.split(',').map((num) => parseInt(num));
		for (let i = 0; i < nums.length; i++) {
			let num = nums[i];
			for (let j = i + 1; j < nums.length; j++) {
				let num2 = nums[j];
				if (!hasRule(rulesMap, num, num2)) {
					safe = false;
					break;
				}
			}
		}

		if (safe) {
			safeUpdates.push(nums);
		}
	}

	let sum = 0;
	for (let update of safeUpdates) {
		sum += centerNumber(update);
	}

	return sum;
}

function hasRule(rulesMap, input, output) {
	for (let i = 0; i < rulesMap.length; i++) {
		if (rulesMap[i][0] == input && rulesMap[i][1] == output) {
			return true;
		}
	}
	return false;
}

function centerNumber(nums) {
	let center = Math.floor(nums.length / 2);
	return nums[center];
}

function part2() {
	let input = readInput().replaceAll('\r', '');
	let rules = input.split('\n\n')[0].split('\n');
	let updates = input.split('\n\n')[1].split('\n');

	let rulesMap = [];
	for (let i = 0; i < rules.length; i++) {
		let rule = rules[i].split('|');
		rulesMap.push([parseInt(rule[0]), parseInt(rule[1])]);
	}

	let unsafeUpdates = [];
	for (let update of updates) {
		let safe = true;
		let nums = update.split(',').map((num) => parseInt(num));
		for (let i = 0; i < nums.length; i++) {
			let num = nums[i];
			for (let j = i + 1; j < nums.length; j++) {
				let num2 = nums[j];
				if (!hasRule(rulesMap, num, num2)) {
					safe = false;
					break;
				}
			}
		}

		if (!safe) {
			unsafeUpdates.push(nums);
		}
	}

	let sum = 0;
	for (let update of unsafeUpdates) {
		sum += centerNumber(order(rulesMap, update));
	}

	return sum;
}

function order(rulesMap, nums) {
	let ordered = [];
	for (let i = 0; i < nums.length; i++) {
		let n = allExceptAll(nums, ordered);
		for (let j = 0; j < n.length; j++) {
			if (hasRules(rulesMap, n[j], allExcept(n, n[j]))) {
				ordered.push(n[j]);
				break;
			}
		}
	}
	return ordered;
}

function allExcept(nums, num) {
	let except = [];
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] != num) {
			except.push(nums[i]);
		}
	}
	return except;
}

function allExceptAll(nums, nums2) {
	let except = [];
	for (let i = 0; i < nums.length; i++) {
		if (!nums2.includes(nums[i])) {
			except.push(nums[i]);
		}
	}
	return except;
}

function hasRules(rulesMap, input, output) {
	let has = true;
	for (let n of output) {
		if (!hasRule(rulesMap, input, n)) {
			has = false;
			break;
		}
	}
	return has;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day5/input.txt', 'utf8');
	return input;
}
