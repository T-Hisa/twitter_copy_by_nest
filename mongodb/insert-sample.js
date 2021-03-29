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

const insertUsers = async (db) => {
  await db.collection('users').insertMany([
    {
      _id: 'sample-id',
      username: 'test-user1',
      password: 'password', //"qwerty", // "77d1fb804f4e1e6059377122046c95de5e567cb9fd374639cb96e7f5cc07dba1"
      thumbnail: '',
      boards: [],
      repost_boards: [],
      like_boards: [],
      boards_count: 0,
      like_boards_count: 0,
      following_userids: [],
      follower_userids: [],
    },
    {
      _id: 'sample-id2',
      username: 'test-user2',
      password: 'password', //"qwerty", // "77d1fb804f4e1e6059377122046c95de5e567cb9fd374639cb96e7f5cc07dba1"
      boards: [],
      repost_boards: [],
      like_boards: [],
      boards_count: 0,
      like_boards_count: 0,
      following_userids: [],
      follower_userids: [],
    },
  ]);
};

var insertBoards = async (db) => {
  const users = await db.collection('users').find().toArray();
  const user1_Id = users[0]._id;
  const user2_Id = users[1]._id;
  // return Promise.all([
  await db.collection('boards').insertMany([
    {
      body: 'サンプル1',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: new Date().getTime(),
    },
    {
      body: 'サンプル2',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: new Date().getTime(),
    },
    {
      body: 'サンプル',
      user: user2_Id,
      like_users: [],
      like_count: 0,
      timestamp: new Date().getTime(),
    },
  ]);
  // await db.collection('users').updateMany({

  // })
  // db.collection("boards")
  //   .createIndex({ _id: 1 }, { unique: true, background: true })
  // ]);
};

const insertBoardIdToUsers = async (db) => {
  const boards = await db.collection('boards').find().toArray();
  let promises = [];
  if (boards.length > 0) {
    boards.map((board, i) => {
      promises.push(
        db.collection('users').updateOne(
          { _id: { $regex: board.user } },
          {
            $push: { boards: board._id },
            $inc: { boards_count: 1 },
          },
        ),
      );
      if (i == 0) {
        promises.push(
          db.collection('users').updateMany(
            {
              username: { $regex: 'test' },
            },
            {
              $push: { like_boards: board._id },
              $inc: { like_boards_count: 1 },
            },
          ),
        );
      }
    });
  }
  const users = await db.collection('users').find().toArray();
  if (users.length > 0) {
    users.map((user) => {
      console.log('user._id', user._id);
      promises.push(
        db.collection('boards').update(
          {
            _id: { $in: user.like_boards },
          },
          {
            $push: { like_users: user._id },
            $inc: { like_count: 1 },
          },
        ),
      );
    });
  }
  // const results = await Promise.all(promises);
  await Promise.all(promises);
  // console.log('results', results.pop());
  // console.log('resultsCoount', results.length);
};

MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
  var db = client.db(DATABASE);
  try {
    await db.dropDatabase();
    await insertUsers(db);
    await insertBoards(db);
    await insertBoardIdToUsers(db);
    // await insertBoard(db)
    // await insertDatas(db)
  } catch (e) {
    console.error('error has occured!!', e);
  }
  client.close();
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
