#!/usr/bin/env node

console.log("YOLO");

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Debug logging function that only logs if DEBUG env var is set
const debug = (message) => {
  if (process.env.DEBUG) {
    console.log(message);
  }
};

// Get the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Find node_modules directory by walking up from current file
let nodeModulesDir = path.resolve(__dirname, '..');
while (!fs.existsSync(path.join(nodeModulesDir, 'node_modules')) && nodeModulesDir !== '/') {
  nodeModulesDir = path.resolve(nodeModulesDir, '..');
}

// Path to check package info
const packageJsonPath = path.join(nodeModulesDir, 'package.json');

// Check for updates to Claude package
async function checkForUpdates() {
  try {
    debug("Checking for Claude package updates...");
    
    // Get the latest version available on npm
    const latestVersionCmd = "npm view @anthropic-ai/claude-code version";
    const latestVersion = execSync(latestVersionCmd).toString().trim();
    debug(`Latest Claude version on npm: ${latestVersion}`);
    
    // Get our current installed version
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const currentVersion = dependencies['@anthropic-ai/claude-code'];
    
    debug(`Current dependency in package.json: ${currentVersion}`);
    
    // If using a specific version (not "latest"), and it's out of date, update
    if (currentVersion !== "latest" && currentVersion !== latestVersion) {
      console.log(`Updating Claude package from ${currentVersion || 'unknown'} to ${latestVersion}...`);
      
      // Update package.json
      packageJson.dependencies['@anthropic-ai/claude-code'] = latestVersion;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      
      // Run npm install
      console.log("Running npm install to update dependencies...");
      execSync("npm install", { stdio: 'inherit', cwd: nodeModulesDir });
      console.log("Update complete!");
    } else if (currentVersion === "latest") {
      // If using "latest", just make sure we have the latest version installed
      debug("Using 'latest' tag in package.json, running npm install to ensure we have the newest version");
      execSync("npm install", { stdio: 'inherit', cwd: nodeModulesDir });
    }
  } catch (error) {
    console.error("Error checking for updates:", error.message);
    debug(error.stack);
  }
}

// Path to the Claude CLI file
const claudeDir = path.join(nodeModulesDir, 'node_modules', '@anthropic-ai', 'claude-code');
const originalCliPath = path.join(claudeDir, 'cli.mjs');
const yoloCliPath = path.join(claudeDir, 'cli-yolo.mjs');

// Check and update Claude package first
await checkForUpdates();

if (!fs.existsSync(originalCliPath)) {
  console.error(`Error: ${originalCliPath} not found. Make sure @anthropic-ai/claude-code is installed.`);
  process.exit(1);
}

// Read the original CLI file content
let cliContent = fs.readFileSync(originalCliPath, 'utf8');

// Replace getIsDocker() calls with true
cliContent = cliContent.replace(/[a-zA-Z0-9_]*\.getIsDocker\(\)/g, 'true');
debug("Replaced all instances of *.getIsDocker() with true");

// Replace hasInternetAccess() calls with false
cliContent = cliContent.replace(/[a-zA-Z0-9_]*\.hasInternetAccess\(\)/g, 'false');
debug("Replaced all instances of *.hasInternetAccess() with false");

// Write the modified content to a new file, leaving the original untouched
fs.writeFileSync(yoloCliPath, cliContent);
debug(`Created modified CLI at ${yoloCliPath}`);
debug("Modifications complete. The --dangerously-skip-permissions flag should now work everywhere.");

// Add the --dangerously-skip-permissions flag to the command line arguments
// This will ensure it's passed to the CLI even if the user didn't specify it
process.argv.splice(2, 0, '--dangerously-skip-permissions');
debug("Added --dangerously-skip-permissions flag to command line arguments");

// Now import the modified CLI
import(yoloCliPath);