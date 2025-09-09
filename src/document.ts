import Paragraph from './paragraph';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import type { HeadingLevel } from './types';
import { HTML_WRAPPER } from './constants';

export default class Document {
	paragraphs: Paragraph[];
	private fileName: string;

	constructor(fileName: string) {
		if (!fileName.length) {
			throw new Error('File name cannot be empty');
		}
		this.fileName = fileName;
		this.paragraphs = [];
		this.load();
	}

	load(): void {
		if (!existsSync(this.fileName)) {
			throw new Error(`File not found: ${this.fileName}`);
		}

		const content = readFileSync(this.fileName, 'utf-8');
		const lines = content.split(/\r?\n\r?\n/);
		for (const line of lines) {
			if (!line.startsWith('#') && !line.startsWith('  ')) {
				this.paragraphs.push(new Paragraph(line.trim()));
				continue;
			}

			if (line.startsWith('  ')) {
				this.paragraphs.push(new Paragraph(line.trim(), 'code'));
				continue;
			}

			const headingMatch = line.match(/^(#{1,6})\s*(.*)$/);
			if (headingMatch) {
				const level = headingMatch[1].length as HeadingLevel;
				const text = headingMatch[2].trim();
				this.paragraphs.push(new Paragraph(text, 'heading', level));
			}
		}
	}

	writeHTML(fileName: string): void {
		if (!fileName.length) {
			throw new Error('File name cannot be empty');
		}
		fileName = fileName.replace(/\.html?$/i, '');

		const htmlContent = this.paragraphs.map((p) => p.toHTML()).join('');
		const fullHtml = HTML_WRAPPER.replace(
			'</body>',
			`${htmlContent}</body>`
		).replace('output', fileName);

		if (!existsSync('dist')) {
			mkdirSync('dist');
		}
		writeFileSync(`dist/${fileName}.html`, fullHtml, 'utf-8');
	}
}
