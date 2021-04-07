const CONNECTION_URL = 'mongodb://localhost:27017/';
const DATABASE = 'sample';
const OPTIONS = {
  useUnifiedTopology: true,
  family: 4,
};

const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;


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

MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
  const db = client.db(DATABASE);
  try {
    await db.dropDatabase();
    await insertUsers(db);

  } catch (e) {
    console.error('error has occured!!', e);
  }
  client.close();
});
