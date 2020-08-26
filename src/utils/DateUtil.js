
class DateUtil
{
	date = "";
	monthName = "";
	dayName = "";
	year = "";
	day = "";

	constructor(date)
	{
		this.date = date;
		this.parseDate();
	}

	parseDate()
	{
		let date = new Date(this.date);

		const day = date.getDate();
		
		if( ! isNaN(day) )
		{
			
			const dayNumber = date.getDay();
			const monthNumber = date.getMonth();
			const year = date.getFullYear();

			this.year = year;
			this.day = day;
			this.monthName = this.getMonthName(monthNumber);
			this.dayName = this.getDayName(dayNumber);
		}

	}

	getDayName(dayNumber)
	{
		return this.getDays()[dayNumber];
	}

	getMonthName(monthNumber)
	{
		return this.getMonths()[monthNumber];
	}

	getDays()
	{
		return [
			"Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday", "Sunday"
		];
	}

	getMonths()
	{
		return [
			"January", "February", "March", "April",
			"May", "June", "July", "August", "September",
			"October", "November", "December"
		];
	}
}


export {
	DateUtil
}