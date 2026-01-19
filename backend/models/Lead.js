const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  stage: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'],
    default: 'New'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Converted'],
    default: 'Active'
  },
  source: {
    type: String,
    enum: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Trade Show', 'Other'],
    default: 'Website'
  },
  value: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  },
  assignedTo: {
    type: String,
    default: 'Unassigned'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);
