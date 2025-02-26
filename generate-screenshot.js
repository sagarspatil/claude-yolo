#!/usr/bin/env node

// This script simulates what users will see during installation
// Run this script and take a screenshot to include in the README

import readline from 'readline';

// ANSI color codes
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`\n${BOLD}${YELLOW}🔥 CLAUDE-YOLO INSTALLATION CONSENT REQUIRED 🔥${RESET}\n`);
console.log(`${CYAN}----------------------------------------${RESET}`);
console.log(`${BOLD}What is claude-yolo?${RESET}`);
console.log(`This package creates a wrapper around the official Claude CLI tool that:`);
console.log(`  1. ${RED}BYPASSES safety checks${RESET} by automatically adding the --dangerously-skip-permissions flag`);
console.log(`  2. Automatically updates to the latest Claude CLI version`);
console.log(`  3. Adds colorful YOLO-themed loading messages\n`);

console.log(`${BOLD}${RED}⚠️ IMPORTANT SECURITY WARNING ⚠️${RESET}`);
console.log(`The ${BOLD}--dangerously-skip-permissions${RESET} flag was designed for use in containers`);
console.log(`and bypasses important safety checks. This includes ignoring file access`);
console.log(`permissions that protect your system and privacy.\n`);

console.log(`${BOLD}By using claude-yolo:${RESET}`);
console.log(`  • You acknowledge these safety checks are being bypassed`);
console.log(`  • You understand this may allow Claude CLI to access sensitive files`);
console.log(`  • You accept full responsibility for any security implications\n`);

console.log(`${CYAN}----------------------------------------${RESET}\n`);

console.log(`${YELLOW}Do you consent to installing claude-yolo with these modifications? (yes/no): ${RESET}`);

// Wait 10 seconds to give time for taking a screenshot
setTimeout(() => {
  console.log("\nThis is just for generating a screenshot for the README.");
  console.log("When the real postinstall script runs, users will need to type 'yes' to continue.");
  process.exit(0);
}, 10000);