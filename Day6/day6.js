import fs from 'fs';

function part1() {
	let input = readInput().replaceAll('\r', '');
	let map = input.split('\n').map((group) => group.split(''));
	let newMap = map.map((row) => [...row]);
	let guard = { x: 0, y: 0 };
	let direction = { x: 0, y: -1 };
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === '^') {
				guard.x = j;
				guard.y = i;

				newMap[i][j] = 'X';
			}
		}
	}

	let patrolling = true;
	let positions = new Set();
	while (patrolling) {
		positions.add(`${guard.x},${guard.y}`);
		let next = { x: guard.x + direction.x, y: guard.y + direction.y };
		if (!isInMap(map, next.x, next.y)) {
			patrolling = false;
			newMap[guard.y][guard.x] = 'X';

			break;
		}
		let nextTile = map[next.y][next.x];

		if (nextTile === '#') {
			direction = getNextDir(direction);
			continue;
		}

		if (nextTile === '.' || nextTile === '^') {
			guard.x = next.x;
			guard.y = next.y;
			newMap[guard.y][guard.x] = 'X';
			continue;
		}
	}

	return positions.size;
}

function isInMap(map, x, y) {
	return x >= 0 && y >= 0 && x < map[0].length && y < map.length;
}

function getNextDir(direction) {
	if (direction.x === 0 && direction.y === -1) {
		return { x: 1, y: 0 };
	}
	if (direction.x === 1 && direction.y === 0) {
		return { x: 0, y: 1 };
	}
	if (direction.x === 0 && direction.y === 1) {
		return { x: -1, y: 0 };
	}
	if (direction.x === -1 && direction.y === 0) {
		return { x: 0, y: -1 };
	}
}

function part2() {
	let input = readInput().replaceAll('\r', '');
	let map = input.split('\n').map((group) => group.split(''));
	let guard = { x: 0, y: 0 };
	let direction = { x: 0, y: -1 };
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === '^') {
				guard.x = j;
				guard.y = i;
			}
		}
	}

	let infiniteLoops = 0;
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			let testMap = map.map((row) => [...row]);
			testMap[i][j] = '#';
			let testGuard = { x: guard.x, y: guard.y };
			let testDirection = { x: direction.x, y: direction.y };
			if (checkInfiniteLoop(testMap, testGuard, testDirection)) {
				infiniteLoops++;
			}
		}
	}

	return infiniteLoops;
}

function checkInfiniteLoop(map, guard, direction) {
	let newMap = map.map((row) => [...row]);
	newMap[guard.y][guard.x] = 'X';

	let patrolling = true;
	let positions = new Set();
	while (patrolling) {
		let positionString = `${guard.x},${guard.y}:${direction.x},${direction.y}`;
		if (positions.has(positionString)) {
			return true;
		}

		positions.add(positionString);
		let next = { x: guard.x + direction.x, y: guard.y + direction.y };
		if (!isInMap(map, next.x, next.y)) {
			patrolling = false;
			newMap[guard.y][guard.x] = 'X';

			break;
		}
		let nextTile = map[next.y][next.x];

		if (nextTile === '#') {
			direction = getNextDir(direction);
			continue;
		}

		if (nextTile === '.' || nextTile === '^') {
			guard.x = next.x;
			guard.y = next.y;
			newMap[guard.y][guard.x] = 'X';
			continue;
		}
	}

	return false;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day6/input.txt', 'utf8');
	return input;
}
