import fs from 'fs';

function part1() {
	let input = readInput().replaceAll('\r', '');
	let lines = input.split('\n').map((line) => line.split(''));
	let map = {};
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			if (lines[i][j] !== '.') {
				map[lines[i][j]] = [{ x: j, y: i }, ...(map[lines[i][j]] || [])];
			}
		}
	}

	let antinodes = [];
	for (let key in map) {
		if (map[key].length > 1) {
			antinodes = [...antinodes, ...findAntiNode(lines, map[key])];
		}
	}
	let uniqueAntinodes = [
		...new Set(antinodes.map((a) => JSON.stringify(a))),
	].map((a) => JSON.parse(a));
	return uniqueAntinodes.length;
}

function findAntiNode(map, nodes) {
	let combinations = findCombinations(nodes);
	let antinodes = [];
	for (let c of combinations) {
		let distance1 = distance(c[0], c[1]);
		antinodes.push(add(c[0], distance1));

		let distance2 = distance(c[1], c[0]);
		antinodes.push(add(c[1], distance2));
	}

	let newAntinodes = [];
	for (let a of antinodes) {
		if (!isInMap(map, a.x, a.y)) {
			continue;
		}
		newAntinodes.push(a);
	}

	return newAntinodes;
}

function findCombinations(nodes) {
	// find all possible combinations of 2 nodes
	let combinations = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			combinations.push([nodes[i], nodes[j]]);
		}
	}
	return combinations;
}

function distance(a, b) {
	let distance = { x: a.x - b.x, y: a.y - b.y };
	return distance;
}

function add(a, b) {
	return { x: a.x + b.x, y: a.y + b.y };
}

function isInMap(map, x, y) {
	return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function part2() {
	let input = readInput().replaceAll('\r', '');
	let lines = input.split('\n').map((line) => line.split(''));
	let map = {};
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			if (lines[i][j] !== '.') {
				map[lines[i][j]] = [{ x: j, y: i }, ...(map[lines[i][j]] || [])];
			}
		}
	}

	let antinodes = [];
	for (let key in map) {
		if (map[key].length > 1) {
			antinodes = [...antinodes, ...findAntiNode2(lines, map[key])];
		}
	}
	let uniqueAntinodes = [
		...new Set(antinodes.map((a) => JSON.stringify(a))),
	].map((a) => JSON.parse(a));
	return uniqueAntinodes.length;
}

function findAntiNode2(map, nodes) {
	let combinations = findCombinations(nodes);
	let antinodes = [];
	for (let c of combinations) {
		antinodes.push(c[0]);
		antinodes.push(c[1]);
		let c0 = c[0];
		let c1 = c[1];
		let distance1 = distance(c[0], c[1]);
		let distance2 = distance(c[1], c[0]);
		while (isInMap(map, add(c0, distance1).x, add(c0, distance1).y)) {
			c0 = add(c0, distance1);
			antinodes.push(c0);
		}

		while (isInMap(map, add(c1, distance2).x, add(c1, distance2).y)) {
			c1 = add(c1, distance2);
			antinodes.push(c1);
		}
	}

	let newAntinodes = [];
	for (let a of antinodes) {
		if (!isInMap(map, a.x, a.y)) {
			continue;
		}
		newAntinodes.push(a);
	}

	return newAntinodes;
}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day8/input.txt', 'utf8');
	return input;
}
