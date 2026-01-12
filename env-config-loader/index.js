const fs = require('fs');

function init(requiredFields = []) {
  const content = fs.readFileSync('.env', 'utf-8');
  const lines = content.split('\n');
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

      config[key] = value;
      process.env[key] = value;
    }
  });

  requiredFields.forEach((field) => {
    if (!process.env[field]) {
      throw new Error(`CRITICAL ERROR: ${field} missing!`);
    }
  });

  console.log('Configuration Loaded!');
  return config;
}

module.exports = { init };
