const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const app = require('./app');
const connectDB = require('./config/db');
const Pincode = require('./models/pincode.model');
const fs = require('fs');
const csv = require('csv-parser');

const PORT = 5000;

// Function to auto-seed if empty
const autoSeedData = async () => {
  const count = await Pincode.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} records. Skipping seed.`);
    return;
  }

  console.log('Database is empty. Automatically seeding from CSV...');
  const results = [];
  
  await new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '../../pincodes_all.csv'))
      .pipe(csv())
      .on('data', (data) => {
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
          await Pincode.insertMany(results);
          console.log(`Successfully imported ${results.length} records!`);
          resolve();
        } catch (err) {
          console.error('Seeding failed:', err);
          reject(err);
        }
      });
  });
};

// Initialize DB, Auto-Seed, Start Server
connectDB().then(async () => {
  await autoSeedData();
  app.listen(PORT, () => {
    console.log(`✅ Backend Server securely running on http://localhost:${PORT}`);
    console.log(`✅ Your React frontend can now pull all the Dashboard stats!`);
  });
});
