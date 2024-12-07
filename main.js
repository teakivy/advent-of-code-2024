import inquirer from 'inquirer';
import day1 from './Day1/day1.js';
import day2 from './Day2/day2.js';
import day3 from './Day3/day3.js';
import day4 from './Day4/day4.js';
import day5 from './Day5/day5.js';
import day6 from './Day6/day6.js';
import day7 from './Day7/day7.js';

let aoc = {
	day1: {
		part1: true,
		part2: true,
		obj: day1,
		day: 1,
	},
	day2: {
		part1: true,
		part2: true,
		obj: day2,
		day: 2,
	},
	day3: {
		part1: true,
		part2: true,
		obj: day3,
		day: 3,
	},
	day4: {
		part1: true,
		part2: true,
		obj: day4,
		day: 4,
	},
	day5: {
		part1: true,
		part2: true,
		obj: day5,
		day: 5,
	},
	day6: {
		part1: true,
		part2: true,
		obj: day6,
		day: 6,
	},
	day7: {
		part1: true,
		part2: true,
		obj: day7,
		day: 7,
	},
};

function getDayChoices() {
	let choices = [];
	for (let day in aoc) {
		let d = aoc[day];
		choices.push({
			name: `Day ${d.day} - ${d.part1 ? '⭐' : '⚫'} ${d.part2 ? '⭐' : '⚫'}`,
			value: `${day}`,
		});
	}
	return choices;
}

async function main() {
	let question = [
		{
			type: 'list',
			name: 'day',
			message: 'Which day would you like to run?',
			choices: getDayChoices(),
		},
	];

	let day;
	await inquirer.prompt(question).then((answers) => {
		day = aoc[answers.day];
	});

	if (!day.part1 && !day.part2) {
		console.log();
		console.log(`Day ${day.day} is not yet completed.`);
		console.log();
		return;
	}

	if (day.part1 && !day.part2) {
		console.log();

		console.log(`Day ${day.day} - Part 1:`);
		console.log(day.obj.part1());

		console.log();
		return;
	}

	if (!day.part1 && day.part2) {
		console.log();

		console.log(`Day ${day.day} - Part 2:`);
		console.log(day.obj.part2());

		console.log();
		return;
	}

	if (day.part1 && day.part2) {
		console.log();

		console.log(`Day ${day.day} - Part 1:`);
		console.log(day.obj.part1());

		console.log();

		console.log(`Day ${day.day} - Part 2:`);
		console.log(day.obj.part2());

		console.log();
		return;
	}
}

function test() {
	console.log();
	console.log('Part 1:');
	console.log(day7.part1());
	console.log();
	console.log('Part 2:');
	console.log(day7.part2());
	console.log();
}

main();
// test();
