const mongoose = require('mongoose');

const websiteStatsSchema = new mongoose.Schema({
    totalVisitors: { type: Number, default: 0 },  // Total visits
    uniqueVisitors: { type: Number, default: 0 }, // Unique visits (across all time)
    visitorIPs: { type: [String], default: [] }, // Stores unique IPs
}, { timestamps: true });

const WebsiteStats = mongoose.model('WebsiteStats', websiteStatsSchema);
module.exports = WebsiteStats;
