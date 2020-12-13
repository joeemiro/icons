/*
 * notion-icons
 * (c) 2020 jayhxmo (https://jaymo.io/)
 * (c) 2020 CloudHill
 * under the MIT license
 */

const fs = require('fs');
const args = process.argv.slice(2);

if (args[0]) {
	const iconDir = args[0].slice(-1) == '/' 
		? args[0].slice(0, args[0].length - 1)
		: args[0];

	let iconCounter = 0,
		iconSetName = iconDir.split('/').pop(),
		filter = [];

	fs.readdirSync(iconDir).forEach(file => {
		const ext = file.split('.').pop();
		if (
			['png', 'jpeg', 'jpg', 'gif', 'svg'].includes(ext)
		) {
			filter.push(file.toLowerCase().split('.')[0].split(/[ -_]/));

			const sourceFile = `${iconDir}/${file}`,
				newFile = `${iconDir}/${iconSetName}_${iconCounter}.${ext}`;
			
			console.log(`renaming ${sourceFile} -> ${newFile}`);
			
			fs.renameSync(sourceFile, newFile);
			iconCounter++;
		}
	});
	fs.writeFileSync(`${iconDir}/filter.json`, JSON.stringify(filter));
	console.log(`filters written in: { ${iconDir}/filter.json }`);
} else {
	console.log('please include the icon folder name (e.g. FC)');
}
