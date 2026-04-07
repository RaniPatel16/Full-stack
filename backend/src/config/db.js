const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const connectDB = async () => {
  try {
    // THIS LINE is where the magic happens! It reads the URI from your .env file!
    const connUrl = process.env.MONGO_URI;

    if (!connUrl || connUrl === 'mongodb://127.0.0.1:27017/pincodes_db') {
      console.log('⚠️ WARNING: You are attempting to connect to a local database.');
      console.log('⚠️ If you do not have MongoDB installed on your computer, this will crash!');
      console.log('⚠️ Please paste your MONGODB ATLAS link into your .env file!');
    }

    await mongoose.connect(connUrl);
    console.log('✅ Successfully connected to MongoDB Database at:', connUrl);
  } catch (err) {
    console.error("RAW_ERROR_OCCURRED:");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
