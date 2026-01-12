const fs = require('fs');
const content = fs.readFileSync('.env', 'utf-8');
// console.log(content);

const lines = content.split('\n');
// console.log(lines);

const config = {};

lines.forEach((line) => {
  const cleanLine = line.trim();
  if (cleanLine.length > 0) {
    const parts = cleanLine.split('=');
    const key = parts[0].trim();
    let value = parts[1].trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // console.log('Name:', key, '| Value:', value);
    config[key] = value;
    process.env[key] = value;
  }
});

// console.log(config);
// console.log('Check process.env PORT:', process.env.PORT);

const requiredFields = ['PORT', 'DB_URL', 'RANDOM'];
requiredFields.forEach((field) => {
  if (!process.env[field]) {
    // console.log(field, 'not found');
    throw new Error(`CRITICAL ERROR: ${field} not found!`);
  } else {
    // console.log(field, 'found');
    console.log(`${field} found successfully!`);
  }
});

console.log('All settings are perfect!');
