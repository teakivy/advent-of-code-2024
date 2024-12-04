import fs from 'fs';

function part1() {
	let input = readInput();
	input = input.replaceAll('\r', '');
	let lines = input.split('\n');
	let instances = 0;
	for (let i = 0; i < lines.length; i++) {
		instances += countXMAS(lines[i]);
	}

	let columns = [];
	for (let i = 0; i < lines[0].length; i++) {
		let column = '';
		for (let j = 0; j < lines.length; j++) {
			column += lines[j][i];
		}
		columns.push(column);
	}

	for (let i = 0; i < columns.length; i++) {
		instances += countXMAS(columns[i]);
	}

	let diagTopLeft = [];

	for (let i = 0; i < lines.length; i++) {
		let diag = '';
		for (let j = 0; j <= i; j++) {
			diag += lines[j][i - j];
		}
		diagTopLeft.push(diag);
	}

	for (let i = 1; i < lines[0].length; i++) {
		let diag = '';
		for (let j = 0; j < lines.length - i; j++) {
			diag += lines[j + i][lines[0].length - 1 - j];
		}
		diagTopLeft.push(diag);
	}

	for (let i = 0; i < diagTopLeft.length; i++) {
		instances += countXMAS(diagTopLeft[i]);
	}

	let diagTopRight = [];

	for (let i = 0; i < lines.length; i++) {
		let diag = '';
		for (let j = 0; j <= i; j++) {
			diag += lines[j][lines[0].length - 1 - i + j];
		}
		diagTopRight.push(diag);
	}

	for (let i = 1; i < lines[0].length; i++) {
		let diag = '';
		for (let j = 0; j < lines.length - i; j++) {
			diag += lines[j + i][j];
		}
		diagTopRight.push(diag);
	}

	for (let i = 0; i < diagTopRight.length; i++) {
		instances += countXMAS(diagTopRight[i]);
	}

	return instances;
}

function countXMAS(line) {
	let instances = 0;
	instances += occurrences(line, 'XMAS', true);
	instances += occurrences(line, 'SAMX', true);
	return instances;
}

function occurrences(string, subString, allowOverlapping) {
	string += '';
	subString += '';
	if (subString.length <= 0) return string.length + 1;

	var n = 0,
		pos = 0,
		step = allowOverlapping ? 1 : subString.length;

	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
}

function part2() {
	let input = readInput();
	input = input.replaceAll('\r', '');
	let lines = [];
	// split input into a 2D array
	for (let i = 0; i < input.split('\n').length; i++) {
		let line = input.split('\n')[i].split('');
		lines.push(line);
	}

	let instances = 0;
	for (let y = 1; y < lines.length - 1; y++) {
		for (let x = 1; x < lines[0].length - 1; x++) {
			if (checkXMAS(lines, x, y)) {
				instances++;
			}
		}
	}

	return instances;
}

function checkXMAS(lines, x, y) {
	if (lines[y][x] != 'A') return false;
	if (lines[y + 1][x - 1] == 'M') {
		if (lines[y - 1][x + 1] != 'S') return false;
	}
	if (lines[y + 1][x - 1] == 'S') {
		if (lines[y - 1][x + 1] != 'M') return false;
	}

	if (lines[y + 1][x + 1] == 'M') {
		if (lines[y - 1][x - 1] != 'S') return false;
	}
	if (lines[y + 1][x + 1] == 'S') {
		if (lines[y - 1][x - 1] != 'M') return false;
	}

	let allowed = ['M', 'S'];
	if (!allowed.includes(lines[y - 1][x - 1])) return false;
	if (!allowed.includes(lines[y - 1][x + 1])) return false;
	if (!allowed.includes(lines[y + 1][x - 1])) return false;
	if (!allowed.includes(lines[y + 1][x + 1])) return false;

	return true;
}

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day4/input.txt', 'utf8');
	return input;
}

export default { part1, part2 };
