import type { HeadingLevel, ParagraphType } from './types';

export default class Paragraph {
	text: string;
	type: ParagraphType;
	level: HeadingLevel | null;

	constructor(
		text: string,
		type: ParagraphType = 'regular',
		level: HeadingLevel | null = null
	) {
		this.text = text;
		this.type = type;
		this.level = level;
	}

	toHTML(): string {
		if (this.type === 'heading' && this.level) {
			return `<h${this.level}>${this.text}</h${this.level}>`;
		}
		if (this.type === 'code') {
			return `<pre><code>${this.text}</code></pre>`;
		}
		return `<p>${this.text}</p>`;
	}
}
