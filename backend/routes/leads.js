const express = require('express');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all leads with search, filter, sort, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      stage = '',
      status = '',
      source = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};

    // Search across name, email, company, phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Filters
    if (stage) query.stage = stage;
    if (status) query.status = status;
    if (source) query.source = source;

    // Sort
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const leads = await Lead.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get analytics
router.get('/analytics', async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const leadsByStage = await Lead.aggregate([
      {
        $group: {
          _id: '$stage',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalValue = await Lead.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$value' }
        }
      }
    ]);

    res.json({
      totalLeads,
      convertedLeads,
      leadsByStage: leadsByStage.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      totalValue: totalValue[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lead by ID
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
