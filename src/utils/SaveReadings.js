import { executeSQLQuery } from '../utils/SQLUtil';

const saveReadings = async (readings) => {
    if(readings.length === 0){
        return ;
    }

    //loop through the readings and save them 
    for( var i = 0; i < readings.length; i++)
    {
        const reading = readings[i];

        if( await readingExists(reading.date)){
            await updateReading(reading);
        }
        else{
            await insertReading(reading);
        }
        
    }
}

const readingExists = async date => {
    const sql = "SELECT * FROM `scriptures` where `date` = ?";

    const param = [ date ];

    const result = await executeSQLQuery(sql, param)

    let resultExits = true;

    // if the result is an empty array then this reading does not exist
    if(result.length === 0)
    {
        resultExits = false;
    }

    return resultExits;
}

const insertReading = async reading => {
    const sql = "INSERT INTO `scriptures` (`day`, `month`, `year`, `date`, `psalms`, `reading_one`,"
                    + "`reading_two`, `text`, `name`)"
                    + " VALUES (?,?,?,?,?,?,?,?,?)";

    const params = [
        reading.day,
        reading.month,
        reading.year,
        reading.date,
        reading.psalms,
        reading.reading_one,
        reading.reading_two,
        reading.reading_text,
        reading.name
    ];

    const result = await executeSQLQuery(sql, params);
}

const updateReading = async reading => {
    const sql = "UPDATE `scriptures` SET `day` = ?, `month` = ?, `year` = ?,"
                + "`date` = ?, `psalms` = ?, `reading_one` = ?, `reading_two` = ?,"
                + "`text` = ?, `name` = ?"
                + "WHERE `date` = ?";

    const params = [
        reading.day,
        reading.month,
        reading.year,
        reading.date,
        reading.psalms,
        reading.reading_one,
        reading.reading_two,
        reading.reading_text,
        reading.name,
        reading.date,
    ];

    const results = await executeSQLQuery(sql, params);

}

export {
    saveReadings,
}