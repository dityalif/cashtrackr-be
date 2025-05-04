const mongoose = require('mongoose');
const Category = require('./models/Category');
const Summary = require('./models/Summary');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedCategories = async () => {
  const categories = ['Makanan', 'Transportasi', 'Hiburan', 'Belanja', 'Tagihan'];
  await Category.insertMany(categories.map((name) => ({ name })));
  console.log('Categories seeded');
};

const seedSummary = async () => {
  const summary = {
    balance: 1000000,
    totalIncome: 5000000,
    totalExpense: 4000000,
    transactionCount: 20,
  };
  await Summary.create(summary);
  console.log('Summary seeded');
};

const seedDatabase = async () => {
  try {
    await seedCategories();
    await seedSummary();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();