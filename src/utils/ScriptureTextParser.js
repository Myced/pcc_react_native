
class ScriptureTextParser
{
	reading = "";
	parsedReading = "";
	book = "";
	chapter = "";
	verseStart = "";
	verseEnd = "";
	floatVerseStart = 0.0;
	floatVerseEnd = 0.0;

	constructor(reading)
	{
		let clearReading = reading.replace(/ /g, "");

		this.reading = clearReading;
		this.parseReading();
	}

	parseReading()
	{
		const reading = this.reading;

		const readingParts = reading.split(".");
		const book = readingParts[0];
		this.book = book;

		let verses = readingParts[1];
		verses = verses.replace(/[a-z]+/g, "");

		//parse the second part of the reading. 
		this.parseChapter(verses);
	}

	parseChapter(text)
	{
		const chapterParts = text.split(':');

		const chapter = chapterParts[0];

		this.chapter = chapter;

		this.parseVerse(chapterParts[1]);
	}

	parseVerse(text)
	{
		let start, end, verseStart, verseEnd = "";

		//check if there are many verses.
		if(text.includes('-'))
		{
			//there is only one chapter.
			let verseParts = text.split("-");
			start = verseParts[0];
			end = verseParts[1];
		}
		else{
			start = text;
			end = text;
		}

		verseStart = this.formatToThreeDigits(start);
		verseEnd = this.formatToThreeDigits(end);

		this.verseStart = verseStart;
		this.verseEnd = verseEnd;

		//conver the values to float 
		const startingVerse = this.chapter + "." + verseStart;
		const endingVerse = this.chapter + "." + verseEnd;
		
		this.floatVerseStart = parseFloat(startingVerse);
		this.floatVerseEnd = parseFloat(endingVerse);
	}

	formatToThreeDigits(text)
	{
		if(text.length === 1)
		{
			return "00" + text;
		}
		else if (text.length === 2)
		{
			return "0" + text;
		}
		else{
			return text;
		}
	}
}

export default ScriptureTextParser;