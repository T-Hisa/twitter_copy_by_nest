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
      body: '返信0',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now(),
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      body: '返信1 フォロー外ユーザー',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 1,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      body: '返信1 フォロー内ユーザー',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 2,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      body: '返信0・リツイート1',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 3,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      body: '返信0・引用リツイート1',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 4,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      body: '返信0・リツイート1・引用リツイート1',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 5,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      body: '返信0・いいね1',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 6,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
  ]);
};

const replyBoard = async (db) => {
  const users = await db.collection('users').find().toArray();
  const user1_Id = users[0]._id;
  const user2_Id = users[1]._id;
  const inner_follower_board = await db
    .collection('boards')
    .findOne({ body: /フォロー内ユーザ/ });
  const inner_follower_board_id = inner_follower_board._id;
  const outer_follower_board = await db
    .collection('boards')
    .findOne({ body: /フォロー外ユーザ/ });
  const outer_follower_board_id = outer_follower_board._id;
  await db.collection('boards').insertMany([
    {
      body: '返信コメント by 本人',
      user: user1_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now(),
      reply_to: inner_follower_board_id,
      reply_count: 0,
      repost_count: 0,
    },
    {
      body: '返信コメント by フォロー外',
      user: user2_Id,
      like_users: [],
      like_count: 0,
      timestamp: Date.now() + 1,
      reply_to: outer_follower_board_id,
      reply_count: 0,
      repost_count: 0,
    },
  ]);
  await db.collection('boards').updateMany(
    { _id: { $in: [inner_follower_board_id, outer_follower_board_id] } },
    {
      $inc: { reply_count: 1 },
    },
  );
};

const repostBoardGenerate = async (db) => {
  const user = await db.collection('users').find().next();
  const uid = user._id;
  const onlyRetweetBoard = await db
    .collection('boards')
    .findOne({ body: '返信0・リツイート1' });
  const onlyRetweetBoardId = onlyRetweetBoard._id;
  const origin_timestamp_1 = onlyRetweetBoard.timestamp;

  const onlyQuoteTweetBoard = await db
    .collection('boards')
    .findOne({ body: '返信0・引用リツイート1' });
  const onlyQuoteTweetBoardId = onlyQuoteTweetBoard._id;

  const retweetAndQuoteTweetBoard = await db
    .collection('boards')
    .findOne({ body: '返信0・リツイート1・引用リツイート1' });
  const retweetAndQuoteTweetBoardId = retweetAndQuoteTweetBoard._id;
  const origin_timestamp_3 = retweetAndQuoteTweetBoard.timestamp;
  await db.collection('boards').insertMany([
    {
      origin_board: onlyRetweetBoardId,
      user: uid,
      timestamp: Date.now(),
      origin_timestamp: origin_timestamp_1,
    },
    {
      origin_board: onlyQuoteTweetBoardId,
      user: uid,
      timestamp: Date.now() + 1,
      body: '引用ツイートのみ',
      like_users: [],
      like_count: 0,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
    {
      origin_board: retweetAndQuoteTweetBoardId,
      user: uid,
      timestamp: Date.now(),
      origin_timestamp: origin_timestamp_3,
    },
    {
      origin_board: retweetAndQuoteTweetBoardId,
      user: uid,
      timestamp: Date.now() + 1,
      body: 'リツイート含めた引用ツイート',
      like_users: [],
      like_count: 0,
      reply_count: 0,
      full_repost_count: 0,
      repost_count: 0,
      quote_post_count: 0,
    },
  ]);
  await db.collection('boards').updateOne(
    {
      _id: onlyRetweetBoardId,
    },
    {
      $inc: { full_repost_count: 1, repost_count: 1 },
    },
  );
  await db.collection('boards').updateOne(
    {
      _id: onlyQuoteTweetBoardId,
    },
    {
      $inc: { full_repost_count: 1, quote_post_count: 1 },
    },
  );
  await db.collection('boards').updateOne(
    {
      _id: retweetAndQuoteTweetBoardId,
    },
    {
      $inc: { full_repost_count: 2, repost_count: 1, quote_post_count: 1 },
    },
  );
};

const likeBoard = async (db) => {
  const board = await db
    .collection('boards')
    .findOne({ body: { $regex: /.*いいね.*/ } });
  await db.collection('users').updateOne(
    { _id: { $regex: board.user } },
    {
      $push: { like_boards: board._id },
      $inc: { like_boards_count: 1 },
    },
  );
  const like_user = await db.collection('users').findOne({ _id: board.user });
  await db.collection('boards').updateMany(
    {
      _id: { $in: like_user.like_boards },
    },
    {
      $push: { like_users: like_user._id },
      $inc: { like_count: 1 },
    },
  );
};

const insertBoardIdToUsers = async (db) => {
  const boards = await db.collection('boards').find().toArray();
  let promises = [];
  if (boards.length > 0) {
    boards.map((board) => {
      promises.push(
        db.collection('users').updateOne(
          { _id: { $regex: board.user } },
          {
            $push: { boards: board._id },
            $inc: { boards_count: 1 },
          },
        ),
      );
      if (!board.body) {
        promises.push(
          db.collection('users').updateOne(
            { _id: board.user },
            {
              $push: { repost_boards: board._id },
            },
          ),
        );
      }
    });
  }
  await Promise.all(promises);
};

MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
  const db = client.db(DATABASE);
  try {
    await db.dropDatabase();
    await insertUsers(db);
    await insertBoards(db);
    await replyBoard(db);
    await repostBoardGenerate(db);
    await likeBoard(db);
    await insertBoardIdToUsers(db);
    // await sample(db)
  } catch (e) {
    console.error('error has occured!!', e);
  }
  client.close();
});
