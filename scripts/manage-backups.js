const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const listBackups = () => {
    try {
        console.log('Listing backups in container...');
        const result = execSync('docker exec gestion-vente-app ls -l /usr/src/app/backups').toString();
        console.log(result);
    } catch (error) {
        console.error('Error listing backups:', error.message);
    }
};

const copyBackupsToLocal = () => {
    try {
        // Create local backups directory if it doesn't exist
        const localBackupDir = path.join(__dirname, '../local-backups');
        if (!fs.existsSync(localBackupDir)) {
            fs.mkdirSync(localBackupDir);
        }

        console.log('Copying backups from container to local directory...');
        execSync('docker cp gestion-vente-app:/usr/src/app/backups/. ./local-backups');
        console.log('Backups copied to local-backups directory');
        
        // List copied files
        const files = fs.readdirSync(localBackupDir);
        console.log('\nLocal backups:');
        files.forEach(file => {
            const stats = fs.statSync(path.join(localBackupDir, file));
            console.log(`- ${file} (${(stats.size/1024).toFixed(2)} KB)`);
        });
    } catch (error) {
        console.error('Error copying backups:', error.message);
    }
};

// Execute based on command line argument
const command = process.argv[2];
switch (command) {
    case 'list':
        listBackups();
        break;
    case 'copy':
        copyBackupsToLocal();
        break;
    default:
        console.log('Usage: node manage-backups.js [list|copy]');
}
