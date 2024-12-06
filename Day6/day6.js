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
	let actuallyDone = false;
	let positions = new Set();
	let infinite = 0;
	let infinitePos = new Set();
	while (patrolling || !actuallyDone) {
		if (!patrolling) actuallyDone = true;
		positions.add(`${guard.x},${guard.y}:${direction.x},${direction.y}`);
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
			if (newMap[guard.y][guard.x] !== 'O') {
				newMap[guard.y][guard.x] = 'X';
			}

			if (checkInfiniteLoop(map, guard, direction)) {
				infinitePos.add(`${guard.x},${guard.y}:${direction.x},${direction.y}`);
			}
			continue;
		}
	}

	console.log(positions.size);

	console.log(infinitePos);
	return infinitePos.size;
}

function checkInfiniteLoop(map, guard, direction) {
	direction = getNextDir(direction);
	let initalPos = `${guard.x},${guard.y}:${direction.x},${direction.y}`;
	let patrolling = true;
	let positions = new Set();
	while (patrolling) {
		positions.add(`${guard.x},${guard.y}:${direction.x},${direction.y}`);
		if (
			initalPos === `${guard.x},${guard.y}:${direction.x},${direction.y}` &&
			positions.size > 1
		) {
			return true;
		}
		let next = { x: guard.x + direction.x, y: guard.y + direction.y };
		if (!isInMap(map, next.x, next.y)) {
			patrolling = false;
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
