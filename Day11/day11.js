import fs from 'fs';

function part1() {
	let input = readInput().replaceAll('\r', '');

	return loop(input, 25);
}

function part2() {
	let input = readInput().replaceAll('\r', '');

	return loop(input, 75);
}

function loop(input, loops) {
	let stones = input.split(' ').map((stone) => parseInt(stone));
	let stoneMap = new Map();
	// store the stones in a map, the key is the stone value and the value is the number of stones with that value
	for (let stone of stones) {
		if (stoneMap.has(stone)) {
			stoneMap.set(stone, stoneMap.get(stone) + 1);
		} else {
			stoneMap.set(stone, 1);
		}
	}

	for (let i = loops; i > 0; i--) {
		let newStoneMap = new Map();
		for (let [stone, count] of stoneMap.entries()) {
			if (stone === 0) {
				if (newStoneMap.has(1)) {
					newStoneMap.set(1, newStoneMap.get(1) + count);
				} else {
					newStoneMap.set(1, count);
				}
				continue;
			}
			let stoneStr = stone.toString();
			if (stoneStr.length % 2 === 0) {
				let mid = stoneStr.length / 2;
				let left = parseInt(stoneStr.slice(0, mid));
				let right = parseInt(stoneStr.slice(mid));
				if (newStoneMap.has(left)) {
					newStoneMap.set(left, newStoneMap.get(left) + count);
				} else {
					newStoneMap.set(left, count);
				}
				if (newStoneMap.has(right)) {
					newStoneMap.set(right, newStoneMap.get(right) + count);
				} else {
					newStoneMap.set(right, count);
				}
				continue;
			}
			if (newStoneMap.has(stone * 2024)) {
				newStoneMap.set(stone * 2024, newStoneMap.get(stone * 2024) + count);
			} else {
				newStoneMap.set(stone * 2024, count);
			}
		}

		stoneMap = new Map(newStoneMap);
	}

	let sum = 0;
	for (let count of stoneMap.values()) {
		sum += count;
	}

	return sum;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day11/input.txt', 'utf8');
	return input;
}
