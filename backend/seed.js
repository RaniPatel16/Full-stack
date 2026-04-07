require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Pincode = require('./src/models/pincode.model');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pincodes_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const seedData = () => {
  const results = [];
  fs.createReadStream(path.join(__dirname, '../pincodes_all.csv'))
    .pipe(csv())
    .on('data', (data) => {
      // Map CSV columns correctly
      results.push({
        officeName: data['Office Name'],
        pincode: data['PIN Code'],
        officeType: data['Office Type'],
        deliveryStatus: data['Delivery Status'],
        division: data['Division'],
        region: data['Region'],
        circle: data['Circle'],
        taluk: data['Taluk'],
        district: data['District'],
        state: data['State']
      });
    })
    .on('end', async () => {
      try {
        await Pincode.deleteMany(); // Clear existing
        await Pincode.insertMany(results);
        console.log('Database successfully seeded with CSV data');
        process.exit();
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    });
};

seedData();
