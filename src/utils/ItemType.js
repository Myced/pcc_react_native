let ItemTypes = {};

ItemTypes.HYMN = "HYMN";
ItemTypes.DIARY = "DIARY";
ItemTypes.ECHO = "ECHO";
ItemTypes.MESSENGER = "MESSENGER";

const costs = {
	HYMN: 1000,
	DIARY: 500,
	ECHO: 100,
	MESSENGER: 500
};

const getItemCost = (itemType) => {

	//return the cost of the items 
	if(typeof costs[itemType] !== 'undefined' )
	{
		return costs[itemType];
	}

	return 0;

}

export {
	ItemTypes,
	costs,
	getItemCost
}