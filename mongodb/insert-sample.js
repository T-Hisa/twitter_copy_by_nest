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
      bookmark_boards: [],
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
      bookmark_boards: [],
    },
  ]);
};

var insertBoards = async (db) => {
  const users = await db.collection('users').find().toArray();
  const user1_Id = users[0]._id;
  const user2_Id = users[1]._id;
  await db.collection('boards').insertMany([
    {
      body: 'サンプル1',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now(),
      reply_count: 0,
      repost_count: 0,
    },
    {
      body: 'サンプル2',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 1,
      reply_count: 0,
      repost_count: 0,
    },
    {
      body: 'サンプル3',
      user: user2_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 2,
      reply_count: 0,
      repost_count: 0,
    },
  ]);
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
        db.collection('boards').updateMany(
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
  await Promise.all(promises);
};

const replyBoard = async (db) => {
  const users = await db.collection('users').find().toArray();
  const user1_Id = users[0]._id;
  const board = await db.collection('boards').find().next();
  const board_id = board._id;
  await db.collection('boards').insertOne({
    body: 'サンプル4',
    user: user1_Id,
    like_users: [],
    like_count: 0,
    timestamp: Date.now(),
    reply_to: board_id,
    reply_count: 0,
    repost_count: 0,
  });
  await db.collection('boards').updateOne(
    { _id: board_id },
    {
      $inc: { reply_count: 1 },
    },
  );
};

const repostBoardGenerate = async (db) => {
  const user = await db.collection('users').find().next();
  const uid = user._id;
  const board = await db.collection('boards').find().next();
  const board_id = board._id;
  const origin_timestamp = board.timestamp;
  const repost_boards = await db.collection('boards').insertMany([
    {
      origin_board: board_id,
      user: uid,
      timestamp: Date.now(),
      origin_timestamp: origin_timestamp,
    },
    {
      origin_board: board_id,
      user: uid,
      timestamp: Date.now() + 1,
      body: 'リツイートサンプル1',
      like_users: [],
      like_count: 0,
      reply_count: 0,
      repost_count: 0,
    },
  ]);
  console.log('repost_boards.ops', repost_boards.ops);
  const repost_1 = repost_boards.ops[0];
  const repost_2 = repost_boards.ops[1];
  const repost_user_id = repost_1.user;
  console.log('repoost_user', repost_user_id);
  await db.collection('users').updateOne(
    {
      _id: repost_user_id,
    },
    {
      $push: {
        repost_boards: repost_1._id,
      },
    },
  );
  await db.collection('users').updateOne(
    {
      _id: repost_user_id,
    },
    {
      $push: {
        repost_boards: repost_2._id,
      },
    },
  );
  await db.collection('boards').updateOne(
    {
      _id: repost_1._id,
    },
    {
      $inc: { repost_count: 2 },
    },
  );
};

MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
  const db = client.db(DATABASE);
  try {
    await db.dropDatabase();
    await insertUsers(db);
    await insertBoards(db);
    await insertBoardIdToUsers(db);
    await replyBoard(db);
    await repostBoardGenerate(db);
    // await sample(db)
  } catch (e) {
    console.error('error has occured!!', e);
  }
  client.close();
});
