import fs from 'fs';
import { parse } from 'path';

function part1() {
	let input = readInput().replaceAll('\r', '');
	let parsed = [];
	let free = false;
	let index = 0;

	for (let i = 0; i < input.length; i++) {
		if (free) {
			for (let n = 0; n < parseInt(input[i]); n++) {
				parsed.push(-1);
			}
			free = false;
			continue;
		}
		for (let n = 0; n < parseInt(input[i]); n++) {
			parsed.push(index);
		}

		index++;
		free = true;
	}

	while (canDoMove(parsed)) {
		parsed = doMove(parsed);
	}

	let checksum = 0;
	let i = 0;
	while (parsed[i] !== -1) {
		checksum += i * parsed[i];
		i++;
	}
	return checksum;
}

function canDoMove(parsed) {
	let hasFree = false;
	for (let i = 0; i < parsed.length; i++) {
		if (parsed[i] === -1) {
			hasFree = true;
			continue;
		}
		if (hasFree) {
			return true;
		}
	}
	return false;
}

function doMove(parsed) {
	let moveTo = -1;
	let moveFrom = -1;

	for (let i = 0; i < parsed.length; i++) {
		if (moveTo === -1 && parsed[i] === -1) {
			moveTo = i;
			break;
		}
	}

	for (let i = parsed.length - 1; i >= 0; i--) {
		if (moveFrom === -1 && parsed[i] !== -1) {
			moveFrom = i;
			break;
		}
	}

	parsed[moveTo] = parsed[moveFrom];
	parsed[moveFrom] = -1;
	return parsed;
}

function part2() {
	let input = readInput().replaceAll('\r', '');
	let parsed = [];
	let free = false;
	let index = 0;

	for (let i = 0; i < input.length; i++) {
		if (free) {
			for (let n = 0; n < parseInt(input[i]); n++) {
				parsed.push(-1);
			}
			free = false;
			continue;
		}
		for (let n = 0; n < parseInt(input[i]); n++) {
			parsed.push(index);
		}

		index++;
		free = true;
	}

	let files = [];
	let size = 0;
	let value = -1;
	for (let i = 0; i < parsed.length; i++) {
		if (parsed[i] === -1) {
			if (size > 0) {
				files.push({ value, size, start: i - size });
			}
			size = 0;
			value = -1;
			continue;
		}
		if (parsed[i] === value) {
			size++;
		} else {
			if (size > 0) {
				files.push({ value, size, start: i - size });
			}
			size = 1;
			value = parsed[i];
		}
	}
	if (size > 0) {
		files.push({ value, size, start: parsed.length - size });
	}
	files.sort((a, b) => b.value - a.value);

	for (let f of files) {
		let loc = findMoveLocation(parsed, f);
		if (loc !== -1) {
			moveFile(parsed, f, loc + 1);
		}
	}

	let checksum = 0;
	for (let i = 0; i < parsed.length; i++) {
		if (parsed[i] === -1) continue;
		checksum += i * parsed[i];
	}

	return checksum;
}

function findMoveLocation(parsed, file) {
	let loc = -1;
	let freeSize = 0;
	for (let i = 0; i < file.start; i++) {
		if (parsed[i] === -1) {
			freeSize++;
		} else {
			freeSize = 0;
			continue;
		}
		if (freeSize === file.size) {
			loc = i - file.size;
			break;
		}
	}
	return loc;
}

function moveFile(parsed, file, loc) {
	for (let i = file.start; i < file.start + file.size; i++) {
		parsed[i] = -1;
	}
	for (let i = 0; i < file.size; i++) {
		parsed[loc + i] = file.value;
	}
}

function canDoMove2(parsed) {}

export default { part1, part2 };

function readInput() {
	// read input from "input.txt" file
	let input = fs.readFileSync('./Day9/input.txt', 'utf8');
	return input;
}
