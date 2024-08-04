import client from "../database";

export type order = {
    id:Number;
    productsID:Number;
    quantity:Number;
    UserID:Number;
    status:String;
}
