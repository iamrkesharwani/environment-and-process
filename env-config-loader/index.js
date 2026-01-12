const fs = require('fs');
const content = fs.readFileSync('.env', 'utf-8');
// console.log(content);

const lines = content.split('\n');
// console.log(lines);

lines.forEach((line) => {
  const parts = line.split('=');
  const key = parts[0];
  const value = parts[1];

  // console.log('Name:', key, '| Value:', value);
});
