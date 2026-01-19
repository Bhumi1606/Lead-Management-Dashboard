const mongoose = require('mongoose');
const Lead = require('./models/Lead');
require('dotenv').config();

const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const statuses = ['Active', 'Inactive', 'Converted'];
const sources = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Trade Show', 'Other'];
const companies = [
  'TechCorp', 'InnovateLabs', 'Digital Solutions', 'Cloud Services Inc', 'Data Systems',
  'Future Tech', 'Smart Solutions', 'Global Enterprises', 'NextGen Corp', 'Prime Industries',
  'Alpha Technologies', 'Beta Systems', 'Gamma Solutions', 'Delta Corp', 'Epsilon Industries'
];
const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Ashley',
  'James', 'Amanda', 'Christopher', 'Melissa', 'Daniel', 'Nicole', 'Matthew', 'Michelle', 'Anthony', 'Kimberly',
  'Mark', 'Amy', 'Donald', 'Angela', 'Steven', 'Stephanie', 'Paul', 'Laura', 'Andrew', 'Lisa'
];
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(name) {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'business.com'];
  const namePart = name.toLowerCase().replace(/\s+/g, '.');
  return `${namePart}@${getRandomElement(domains)}`;
}

function generatePhone() {
  return `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

function generateLead(index) {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const email = generateEmail(name);
  const phone = generatePhone();
  const company = getRandomElement(companies);
  const stage = getRandomElement(stages);
  const status = getRandomElement(statuses);
  const source = getRandomElement(sources);
  const value = Math.floor(Math.random() * 50000) + 1000;
  
  // Create date within last 6 months
  const createdAt = new Date();
  createdAt.setMonth(createdAt.getMonth() - Math.floor(Math.random() * 6));
  createdAt.setDate(Math.floor(Math.random() * 28) + 1);

  return {
    name,
    email,
    phone,
    company,
    stage,
    status,
    source,
    value,
    notes: `Lead ${index + 1}: Interested in our services. Follow up required.`,
    assignedTo: index % 3 === 0 ? 'Sales Team A' : index % 3 === 1 ? 'Sales Team B' : 'Unassigned',
    createdAt,
    updatedAt: createdAt
  };
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leadmanagement', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing leads
    await Lead.deleteMany({});
    console.log('Cleared existing leads');

    // Generate 500 leads
    const leads = [];
    for (let i = 0; i < 500; i++) {
      leads.push(generateLead(i));
    }

    await Lead.insertMany(leads);
    console.log(`Successfully seeded ${leads.length} leads`);

    // Display summary
    const total = await Lead.countDocuments();
    const byStage = await Lead.aggregate([
      { $group: { _id: '$stage', count: { $sum: 1 } } }
    ]);
    const byStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    console.log('\n=== Seeding Summary ===');
    console.log(`Total leads: ${total}`);
    console.log('\nBy Stage:');
    byStage.forEach(item => console.log(`  ${item._id}: ${item.count}`));
    console.log('\nBy Status:');
    byStatus.forEach(item => console.log(`  ${item._id}: ${item.count}`));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
