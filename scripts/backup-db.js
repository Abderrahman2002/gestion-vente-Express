const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const backupDB = async () => {
    try {
        console.log('Starting backup...');
        // Connect to MongoDB
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}`);
        
        // Get all collections
        const collections = await mongoose.connection.db.collections();
        
        // Create backup directory if it doesn't exist
        const backupDir = path.join(__dirname, '../backups');
        if (!fs.existsSync(backupDir)){
            console.log('Creating backups directory...');
            fs.mkdirSync(backupDir);
        }

        const backup = {};
        
        // Backup each collection
        for (const collection of collections) {
            const documents = await collection.find({}).toArray();
            backup[collection.collectionName] = documents;
        }

        // Save to file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `backup-${timestamp}.json`;
        const filePath = path.join(backupDir, fileName);
        
        fs.writeFileSync(filePath, JSON.stringify(backup, null, 2));
        
        console.log(`Backup saved to: ${filePath}`);
        
        console.log('Available backups:');
        fs.readdirSync(backupDir).forEach(file => {
            console.log(`- ${file}`);
        });
        
    } catch (error) {
        console.error('Backup failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

backupDB();
