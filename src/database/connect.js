const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}`;
        
        console.log('Connecting to MongoDB...');
        
        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            retryReads: true,
            w: 'majority',
            wtimeout: 2500
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        console.log('\nPlease make sure to:');
        console.log('1. Add your IP address to MongoDB Atlas whitelist');
        console.log('2. Check your MongoDB credentials');
        console.log('3. Verify your network connection');
        console.log('\nTo add your IP to MongoDB Atlas:');
        console.log('1. Go to MongoDB Atlas dashboard');
        console.log('2. Click "Network Access"');
        console.log('3. Click "Add IP Address"');
        console.log('4. Click "Add Current IP Address"\n');
        process.exit(1);
    }
};

module.exports = connectDB;
