import * as SQLite from 'expo-sqlite';
import { database } from '../config/Config';

const executeSQLQuery = async (sql, params = []) => {

	return new Promise((resolve, reject) => {

		const version = '1.0.0';
		const db = SQLite.openDatabase(database.name, version);

		db.transaction(tx => {
			tx.executeSql(
				sql,
				params,
	
				(_, resultSet) => {
					resolve(resultSet.rows._array);
				},
	
				(_, error) => {
					console.log("Sql error");
					
					reject(error)
				},
				
			)
			
			},
			(error) => { 
					reject(error)
				} 
			,
			() => console.log("Transaction success")
		);

	});
}

export {
	executeSQLQuery,
}