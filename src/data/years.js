let years = [];

const startYear = 2018;
const endYear = new Date().getFullYear();

for(let i = startYear; i <= endYear + 1; i++)
{
	years.push(""+i+"");
}

export default years;