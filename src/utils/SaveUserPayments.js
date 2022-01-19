import { executeSQLQuery } from '../utils/SQLUtil';
import { ItemTypes } from './ItemType';

const saveUserPurchases = async purchases => {
    for(let i = 0; i < purchases.length; i++)
    {
        const purchase = purchases[i];

        if( ! await itemPaymentExists(purchase.purchase_item_id))
        {
            //item does not exists.
            //save it to the database;
            await insertItemPayment(purchase);
        }
    }
}

const itemPaymentExists = async purchaseItemId => {
    const sql = "SELECT * FROM `purchases` where `purchase_item_id` = ?";
    const params = [ purchaseItemId ];

    const result = await executeSQLQuery(sql, params);

    if(result.length === 0)
    {
        return false;
    }
    else {
        return true;
    }
}

const insertItemPayment = async purchaseItemData => {
    //calculate the year if its a diary 
    let diaryYear = null;

    if(purchaseItemData.item_type == ItemTypes.DIARY){
        const parts = purchaseItemData.item_name.split(" ");
        diaryYear = parts[2];
    }

    const params = [
        purchaseItemData.id,
        purchaseItemData.user_id,
        purchaseItemData.purchase_item_id,
        purchaseItemData.item_name,
        purchaseItemData.customer_name,
        purchaseItemData.customer_tel,
        diaryYear,
        purchaseItemData.amount,
        purchaseItemData.item_type,
        purchaseItemData.created_at,
    ];

    //save it to the database.... 
    let sql = "INSERT INTO `purchases` "
        + " (`remote_id`, `user_id`, `purchase_item_id`, `item_name`,"
        + " `customer_name`, `customer_tel`, `diary_year`, `amount`, "
        + " `item_type`, `created_at` ) "
        + "  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ";

    const result = await executeSQLQuery(sql, params);
}

export {
    saveUserPurchases,
}