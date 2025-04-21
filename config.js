require('dotenv').config();

const BACKSTAGE_API_URL = process.env.BACKSTAGE_API_URL;
const BACKSTAGE_API_KEY = process.env.BACKSTAGE_API_KEY;

if (!BACKSTAGE_API_URL) {
  console.error('Missing BACKSTAGE_API_URL environment variable');
  console.error('Please set it as an environment variable.');
  console.error(
    'Example: export BACKSTAGE_API_URL="https://your-backstage-instance/api"'
  );
  process.exit(1);
}

if (!BACKSTAGE_API_KEY) {
  console.error('Missing BACKSTAGE_API_KEY environment variable');
  console.error(
    'Please set it in your .env file or as an environment variable.'
  );
  console.error('Example: export BACKSTAGE_API_KEY="your-backstage-api-key"');
  process.exit(1);
}

module.exports = {
  BACKSTAGE_API_URL,
  BACKSTAGE_API_KEY,
};
