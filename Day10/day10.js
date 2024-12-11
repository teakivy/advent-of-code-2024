import fs from 'fs';

function part1() {
	let input = readInput().replaceAll('\r', '');
	let map = input
		.split('\n')
		.map((row) => row.split('').map((cell) => parseInt(cell)));
	let trailheads = [];
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === 0) {
				let up = getTile(map, { x, y }, 'up');
				let right = getTile(map, { x, y }, 'right');
				let down = getTile(map, { x, y }, 'down');
				let left = getTile(map, { x, y }, 'left');
				let forks = [up, right, down, left];
				let followForks = [];
				for (let f of forks) {
					if (f === null) {
						continue;
					}
					if (f.value === '.') {
						continue;
					}
					if (f !== null && f.value === 1) {
						followForks.push(f);
					}
				}

				trailheads.push({
					x,
					y,
					value: 0,
					ends: [],
					forks: followForks,
				});
			}
		}
	}

	for (let trailhead of trailheads) {
		while (trailhead.forks.length > 0) {
			let fork = trailhead.forks.pop();
			if (fork === null) {
				continue;
			}
			let up = getTile(map, fork, 'up');
			let right = getTile(map, fork, 'right');
			let down = getTile(map, fork, 'down');
			let left = getTile(map, fork, 'left');
			let forks = [up, right, down, left];
			for (let f of forks) {
				if (f === null) {
					continue;
				}
				if (f.value === '.') {
					continue;
				}
				if (f !== null && f.value - fork.value === 1) {
					if (f.value === 9) {
						trailhead.ends.push(f);
					} else {
						trailhead.forks.push(f);
					}
				}
			}
		}
	}

	let sum = 0;
	for (let trailhead of trailheads) {
		let endsSet = new Set();
		for (let end of trailhead.ends) {
			endsSet.add(`${end.x},${end.y}`);
		}
		sum += endsSet.size;
	}

	return sum;
}

function getTile(map, node, direction) {
	let x = node.x;
	let y = node.y;
	let dx = 0;
	let dy = 0;

	switch (direction) {
		case 'up':
			dy = -1;
			break;
		case 'right':
			dx = 1;
			break;
		case 'down':
			dy = 1;
			break;
		case 'left':
			dx = -1;
			break;
	}

	x += dx;
	y += dy;

	if (!isInMap(map, { x, y })) {
		return null;
	}

	return { x, y, value: map[y][x] };
}

function isInMap(map, node) {
	return (
		node.x >= 0 && node.x < map[0].length && node.y >= 0 && node.y < map.length
	);
}

function part2() {
	let input = readInput().replaceAll('\r', '');
	let map = input
		.split('\n')
		.map((row) => row.split('').map((cell) => parseInt(cell)));
	let trailheads = [];
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === 0) {
				let up = getTile(map, { x, y }, 'up');
				let right = getTile(map, { x, y }, 'right');
				let down = getTile(map, { x, y }, 'down');
				let left = getTile(map, { x, y }, 'left');
				let forks = [up, right, down, left];
				let followForks = [];
				for (let f of forks) {
					if (f === null) {
						continue;
					}
					if (f.value === '.') {
						continue;
					}
					if (f !== null && f.value === 1) {
						followForks.push(f);
					}
				}

				trailheads.push({
					x,
					y,
					value: 0,
					ends: [],
					forks: followForks,
				});
			}
		}
	}

	let totalRating = 0;
	for (let trailhead of trailheads) {
		let rating = 0;

		while (trailhead.forks.length > 0) {
			let fork = trailhead.forks.pop();
			if (fork === null) {
				continue;
			}
			let up = getTile(map, fork, 'up');
			let right = getTile(map, fork, 'right');
			let down = getTile(map, fork, 'down');
			let left = getTile(map, fork, 'left');
			let forks = [up, right, down, left];
			for (let f of forks) {
				if (f === null) {
					continue;
				}
				if (f.value === '.') {
					continue;
				}
				if (f !== null && f.value - fork.value === 1) {
					if (f.value === 9) {
						rating++;
					} else {
						trailhead.forks.push(f);
					}
				}
			}
		}

		totalRating += rating;
	}

	return totalRating;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day10/input.txt', 'utf8');
	return input;
}
