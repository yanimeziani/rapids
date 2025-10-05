#!/usr/bin/env node
import { register } from 'tsx/esm/api';
import { pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const registered = register();
await import(pathToFileURL(join(__dirname, 'update.tsx')).href);
