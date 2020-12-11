/*
 * notion-icons
 * (c) 2019 jayhxmo (https://jaymo.io/)
 * under the MIT license
 */

const fs = require('fs');
const args = process.argv.slice(2);

if (args[0]) {
	const iconDirectory = args[0].slice(-1) == '/' ? args[0].slice(0, args[0].length - 1) : args[0];

	let iconCounter = 0,
		iconSetName = iconDirectory.split('/').pop(),
		fileNames = [];

	fs.readdirSync(iconDirectory).forEach(file => {
		const fileExtension = file.split('.').pop();
		if (
			fileExtension == 'png' ||
			fileExtension == 'jpeg' ||
			fileExtension == 'jpg' ||
			fileExtension == 'gif' ||
			fileExtension == 'svg'
		) {
			fileNames.push(file.toLowerCase().split('.')[0].split(/[- _]/));
			const sourceFile = `${iconDirectory}/${file}`,
				newFile = `${iconDirectory}/${iconSetName}_${iconCounter}.${fileExtension}`;
			console.log('Renaming ', sourceFile, ' -> ', newFile);
			fs.renameSync(sourceFile, newFile);
			iconCounter++;
		}
	});
	if (fileNames) {
		fs.writeFileSync(`${iconDirectory}/filters.json`, JSON.stringify(fileNames));
		console.log(`Filters written in: { ${iconDirectory}/filters.json }`);
	}
} else {
	console.log('please include the icon folder name (e.g. FC)');
}
