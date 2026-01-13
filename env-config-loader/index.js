const fs = require('fs');

function init(requiredFields = []) {
  // Read .env file
  const content = fs.readFileSync('.env', 'utf-8');
  const lines = content.split('\n');
  const config = {};

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (cleanLine.length > 0) {
      // Split KEY=VALUE
      const parts = cleanLine.split('=');
      const key = parts[0].trim();
      let value = parts[1].trim();

      // Remove surrounding quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Store in config and process.env
      config[key] = value;
      process.env[key] = value;
    }
  });

  // Validate required env fields
  requiredFields.forEach((field) => {
    if (!process.env[field]) {
      throw new Error(`CRITICAL ERROR: ${field} missing!`);
    }
  });

  console.log('Configuration Loaded!');
  return config;
}

module.exports = { init };
