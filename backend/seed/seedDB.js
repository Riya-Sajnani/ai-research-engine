const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const LegalProvision = require('../models/LegalProvision');
const Precedent = require('../models/Precedent');
const OutcomeStat = require('../models/OutcomeStat');

const statutes = require('./statutes.json');
const cases = require('./cases.json');
const outcomeStats = require('./outcomeStats.json');

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing data
    await LegalProvision.deleteMany({});
    await Precedent.deleteMany({});
    await OutcomeStat.deleteMany({});
    console.log('Cleared existing data...');

    // Insert new data
    await LegalProvision.insertMany(statutes);
    console.log(`✅ Inserted ${statutes.length} legal provisions`);

    await Precedent.insertMany(cases);
    console.log(`✅ Inserted ${cases.length} precedents`);

    await OutcomeStat.insertMany(outcomeStats);
    console.log(`✅ Inserted ${outcomeStats.length} outcome stats`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();