const CONNECTION_URL = 'mongodb://localhost:27017/';
const DATABASE = 'sample';
const OPTIONS = {
  useUnifiedTopology: true,
  family: 4,
};

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
// var MongoClient = require("mongodb").MongoClient;

// const dropCollections = function(db) {
//   return Promise.all([
//     db.dropCollection("boards"),
//     db.dropCollection("users")
//   ])

const insertUsers = async db => {
  await db.collection('users').insertMany([
    {
      _id: 'sample-id',
      username: 'test-user1',
      password: 'password', //"qwerty", // "77d1fb804f4e1e6059377122046c95de5e567cb9fd374639cb96e7f5cc07dba1"
      boards: [{}],
      repost_boards: [{}],
      like_boards: [{}],
      following_users: [{}],
    },
    {
      _id: 'sample-id2',
      username: 'test-user2',
      password: 'password', //"qwerty", // "77d1fb804f4e1e6059377122046c95de5e567cb9fd374639cb96e7f5cc07dba1"
      boards: [{}],
      repost_boards: [{}],
      like_boards: [{}],
      following_users: [{}],
    },
])
}

var insertBoards = async (db) => {
  const users = await db.collection("users").find().toArray()
  const user1_Id = users[0]._id
  const user2_Id = users[1]._id
  // return Promise.all([
  await db.collection('boards').insertMany([
    {
      body: 'サンプル1',
      user: user1_Id,
      like_users: [{}],
    },
    {
      body: 'サンプル2',
      user: user1_Id,
      like_users: [{}],
    },
    {
      body: 'サンプル',
      user: user2_Id,
      like_users: [{}],
    },
  ])
  // await db.collection('users').updateMany({

  // })
    // db.collection("boards")
    //   .createIndex({ _id: 1 }, { unique: true, background: true })
  // ]);
};

// const insertBoard = (db) => {
//   // var query = {
//   //   $or: [{ boydy: regexp }, { content: regexp }],
//   // };
//   return db
//     .collection('users')
//     .find()
//     .toArray()
//     .then((result) => {
//       console.log('result', result);
//     });
// };

// var insertPrivileges = function (db) {
//   return Promise.all([
//     db.collection("privileges").insertMany([
//       { role: "default", permissions: ["read"] },
//       { role: "owner", permissions: ["readWrite"] }
//     ]),
//     db.collection("privileges")
//       .createIndex({ role: 1 }, { unique: true, background: true })
//   ]);
// };

MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
  var db = client.db(DATABASE);
  try {
    await db.dropDatabase()
    await insertUsers(db)
    await insertBoards(db)
    // await insertBoard(db)
    // await insertDatas(db)
  } catch (e) {
    console.error('error has occured!!', e)
  }
  client.close()
});
// MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
//   var db = client.db(DATABASE);
//   db.dropDatabase().then(() => {
//     Promise.all([
//       // dropCollections(db),
//       insertBoards(db),
//       insertUsers(db),
//       // insertPrivileges(db)
//     ])
//       .then(() => {
//         insertBoard(db);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         client.close();
//       });
//   });
// });
