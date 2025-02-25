const WebsiteStats = require("../modules/dashboard/websiteStats.model");

const trackVisitors = async (req, res, next) => {
    try {
        const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get user IP

        let websiteStats = await WebsiteStats.findOne();

        if (!websiteStats) {
            // Create stats record if none exists
            websiteStats = new WebsiteStats({
                totalVisitors: 1,
                uniqueVisitors: 1,
                visitorIPs: [userIP]
            });
        } else {
            websiteStats.totalVisitors += 1; // Always increase total visits

            if (!websiteStats.visitorIPs.includes(userIP)) {
                // If new unique visitor
                websiteStats.uniqueVisitors += 1;
                websiteStats.visitorIPs.push(userIP);
            }
        }

        await websiteStats.save();
    } catch (error) {
        console.error("Visitor tracking failed:", error);
    }
    next(); // Move to next middleware
};

module.exports = trackVisitors;
