const cron = require('node-cron');
const axios = require('axios');

cron.schedule('*/20 * * * *', async () => {
    console.log("⏳ Triggering deployment...");
    try {
        const response = await axios.get('https://api.render.com/deploy/srv-cvd4tot2ng1s73dqb7cg?key=heBx4FUMjf4');
        console.log("✅ Deploy Triggered Successfully:", response.data);
    } catch (error) {
        console.error("❌ Failed to Trigger Deploy:", error.message);
    }
}, {
    timezone: "Asia/Kolkata" 
});

console.log("🚀 Cron job initialized to trigger deploy every 20 minutes...");
