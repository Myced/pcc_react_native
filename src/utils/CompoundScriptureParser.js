import ScriptureTextParser from './ScriptureTextParser';

class CompoundScriptureParser
{
	scripture = null;
	queryParams = [];

	constructor(scripture)
	{
		this.scripture = this.cleanScripture(scripture);
		this.parseReadings();
	}

	cleanScripture(reading)
	{
		return reading.replace(/ /g, "");
	}

	parseReadings()
	{
		const reading = this.scripture;

		//split to get the different readings 
		const readings = reading.split('&');

		//loop through the readings and create sql queries. 
		let currentBook = '';
		let currentChapter = '';

		for(let i = 0; i < readings.length; i ++)
		{
			const currentReading = String(readings[i]);
						
			let params = [];
			let queryParamObject = {
				reading: "",
				params: [],
			};

			//parse the first reading.. 
			if( i === 0 )
			{
				const firstReding = new ScriptureTextParser(currentReading);

				currentBook = firstReding.book;
				currentChapter = firstReding.chapter;

				params = [firstReding.book, firstReding.floatVerseStart, firstReding.floatVerseEnd];

				let myreading = currentReading;

				queryParamObject.params = params;
				queryParamObject.reading = myreading;

				this.queryParams.push(queryParamObject);
			}
			else{

				//check if it has a chapter. 
				if(this.hasBook(currentReading))
				{
					//it means its a complete reading 
					let parser = new ScriptureTextParser(currentReading);

					//set the current chapter and book to be this book 
					currentBook = parser.book;
					currentChapter = parser.chapter;

					params = [parser.book, parser.floatVerseStart, parser.floatVerseEnd];

					let myreading = "";

					console.log(parser);
					

					if(parser.isCompleteChapter)
					{
						myreading = parser.book + ". "
									+ parser.chapter;
					}
					else{
						console.log("complete book: " + myreading);
						myreading = parser.book + ". "
									+ parser.chapter + ": ";

						if(parser.verseEnd === parser.verseStart)
						{
							myreading = myreading + parseInt(parser.verseStart);
						}
						else
						{
							myreading = myreading + parseInt(parser.verseStart)
										+ "-" + parseInt(parser.verseEnd);
						}
					}

					
					

					queryParamObject.params = params;
					queryParamObject.reading = myreading;

					this.queryParams.push(queryParamObject);
				}
				else{

					//has no book.. check if it has a chapter. 
					if(this.hasChapter(currentReading))
					{	
						const parts = this.getParts(currentReading, ':');
						
						const chapter = parts[0];
						const verses = parts[1];
						const formattedVerses = this.formatVerses(verses);
						const floatVerseStart = parseFloat(chapter + "." + formattedVerses[0]);
						const floatVerseEnd = parseFloat(chapter + "." + formattedVerses[1]);

						currentChapter = chapter;

						params = [currentBook, floatVerseStart, floatVerseEnd];

						let reading = currentBook + ". "
										+ chapter + ": ";

						if(floatVerseEnd === floatVerseStart)
						{
							reading = reading + parseInt(formattedVerses[0]);
						}
						else
						{
							reading = reading + parseInt(formattedVerses[0])
										+ "-" + parseInt(formattedVerses[1]);
						}

						queryParamObject.params = params;
						queryParamObject.reading = reading;

						this.queryParams.push(queryParamObject);

					}
					else{
						//has no chapter 
						//then only verses. 
						
						const chapter = currentChapter;
						const formattedVerses = this.formatVerses(currentReading);
						const floatVerseStart = parseFloat(chapter + "." + formattedVerses[0]);
						const floatVerseEnd = parseFloat(chapter + "." + formattedVerses[1]);

						params = [currentBook, floatVerseStart, floatVerseEnd];

						let reading = currentBook + ". "
										+ chapter + ": ";

						if(floatVerseEnd === floatVerseStart)
						{
							reading = reading + parseInt(formattedVerses[0]);
						}
						else
						{
							reading = reading + parseInt(formattedVerses[0])
										+ "-" + parseInt(formattedVerses[1]);
						}

						queryParamObject.params = params;
						queryParamObject.reading = reading;

						this.queryParams.push(queryParamObject);
					}

				}

			}
		}
	}

	hasBook(reading)
	{
		if(reading.includes('.'))
			return true;

		return false;
	}

	hasChapter(reading)
	{
		if(reading.includes(':'))
			return true;

		return false;
	}

	getParts(reading, separator)
	{
		const parts = reading.split(separator);

		return parts;
	}

	formatVerses(verses)
	{
		let start = '';
		let end = '';
		if(verses.includes('-'))
		{
			const parts = this.getParts(verses, '-');

			start = parts[0];
			end = parts[1];
		}
		else{
			start = verses;
			end = verses;
		}

		return [
			this.formatToThreeDigits(start),
			this.formatToThreeDigits(end)
		];
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

export default CompoundScriptureParser;