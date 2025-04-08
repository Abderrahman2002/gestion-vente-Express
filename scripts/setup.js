const fs = require('fs');
const path = require('path');

const dirs = [
    'backups',
    'src',
    'views'
];

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
        console.log(`Creating directory: ${dir}`);
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

console.log('Setup complete!');
