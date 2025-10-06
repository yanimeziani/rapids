/**
 * RAPIDS v4.0.0 - Doctor Command Wrapper
 * Entry point for standalone doctor command
 */

import { doctor } from './doctor.js';

// Execute doctor command
doctor().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
