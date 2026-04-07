const Pincode = require('../models/pincode.model');

exports.getAllStates = async (req, res) => {
  try {
    const states = await Pincode.distinct('state');
    res.json(states.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDistrictsByState = async (req, res) => {
  try {
    const districts = await Pincode.distinct('district', { state: req.params.state });
    res.json(districts.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaluksByDistrict = async (req, res) => {
  try {
    const taluks = await Pincode.distinct('taluk', {
      state: req.params.state,
      district: req.params.district
    });
    res.json(taluks.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPincodes = async (req, res) => {
  try {
    const { state, district, taluk, page = 1, limit = 20 } = req.query;
    let query = {};
    if (state) query.state = state;
    if (district) query.district = district;
    if (taluk) query.taluk = taluk;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const data = await Pincode.find(query).skip(skip).limit(parseInt(limit));
    const total = await Pincode.countDocuments(query);

    res.json({
      data,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchPincodes = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const regex = new RegExp(q, 'i');
    const data = await Pincode.find({
      $or: [
        { officeName: regex },
        { pincode: regex },
        { district: regex },
        { taluk: regex },
        { state: regex }
      ]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPincodeDetails = async (req, res) => {
  try {
    const data = await Pincode.find({ pincode: req.params.pincode });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPincodes = await Pincode.countDocuments();
    const states = await Pincode.distinct('state');
    const deliveryOffices = await Pincode.countDocuments({ deliveryStatus: "Delivery" });
    const nonDeliveryOffices = await Pincode.countDocuments({ deliveryStatus: "Non-Delivery" });

    res.json({
      totalPincodes,
      totalStates: states.length,
      deliveryOffices,
      nonDeliveryOffices
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStateDistribution = async (req, res) => {
  try {
    const distribution = await Pincode.aggregate([
      { $group: { _id: "$state", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(distribution.map(d => ({ state: d._id, count: d.count })).filter(d => d.state));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeliveryDistribution = async (req, res) => {
  try {
    const delivery = await Pincode.countDocuments({ deliveryStatus: "Delivery" });
    const nonDelivery = await Pincode.countDocuments({ deliveryStatus: "Non-Delivery" });
    res.json({ delivery, nonDelivery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const { state } = req.query;
    let query = {};
    if (state) query.state = state;

    const data = await Pincode.find(query).select('-_id -__v').lean();
    if (data.length === 0) return res.status(404).send('No data found');

    const headers = Object.keys(data[0]).join(',');
    const csvData = data.map(row => {
      return Object.values(row).map(val => `"${val || ''}"`).join(',');
    }).join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('pincodes.csv');
    return res.send(`${headers}\n${csvData}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
