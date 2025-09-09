import Document from './document';

if (!process.argv[2]) {
	console.error('Error: No input file specified.');
	process.exit(1);
}
const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'output';

try {
	const doc = new Document(inputFile);
	doc.writeHTML(outputFile);
} catch (error) {
	console.error(`Error: ${(error as Error).message}`);
	process.exit(1);
}

console.log(`Converted ${inputFile} to ${outputFile}.html`);
