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
		let html = '';
		if (this.type === 'heading' && this.level) {
			html = `<h${this.level}>${this.text}</h${this.level}>`;
		} else if (this.type === 'code') {
			html = `<pre><code>${this.text}</code></pre>`;
		} else {
			html = `<p>${this.text}</p>`;
		}
		return html.replaceAll('\n', '<br>');
	}
}
