const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const restoreDB = async (backupFile) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}`);
        
        // Read backup file
        const backupPath = path.join(__dirname, '../backups', backupFile);
        const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        
        // Restore each collection
        for (const [collectionName, documents] of Object.entries(backup)) {
            const collection = mongoose.connection.collection(collectionName);
            
            // Clear existing documents
            await collection.deleteMany({});
            
            // Insert backup documents
            if (documents.length > 0) {
                await collection.insertMany(documents);
            }
            
            console.log(`Restored collection: ${collectionName}`);
        }
        
        console.log('Database restore completed successfully');
        
    } catch (error) {
        console.error('Restore failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

// Get backup file name from command line argument
const backupFile = process.argv[2];
if (!backupFile) {
    console.error('Please specify backup file name');
    process.exit(1);
}

restoreDB(backupFile);
