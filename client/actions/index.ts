// const { DATABASE_URL, DATABASE, OPTION } = require('../mongo-config');
import MONGO_CONFIG from '../mongoconfig';
// import { DATABASE_URL, DATABASE, OPTION } from '../mongoconfig';
const { DATABASE_URL, DATABASE, OPTION } = MONGO_CONFIG

// const MongoClient = require('mongodb').MongoClient;
// import　* as Mongodb from 'mongodb'
// console.log('MOngodb', Mongodb)
// const MongoClient = Mongodb.MongoClient
console.log("OPTION", OPTION)

// MongoClient.connect(DATABASE_URL, OPTION, async (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const db = client.db(DATABASE);
//   const boardsModel = await db.collection('boards').find();
//   console.log('baordsModel', boardsModel);
// });

// export const db: firebase.database.Database = firebase.database()
// export const storage: firebase.storage.Storage = firebase.storage()

// export const resetAll = () => {
//   return { type: RESET_ALL }
// }

// export const refreshAll = () => {
//   return { type: REFRESH_ALL }
// }