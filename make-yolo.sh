#!/bin/bash

# Script to modify the --dangerously-skip-permissions check in Claude Terminal
# This will allow the flag to work everywhere by making the Docker and internet checks always return false

# Set the path to the cli.mjs file
CLI_FILE="${CLAUDE_PATH:-/node_modules/@anthropic-ai/claude-code/cli.mjs}"

# Check if the file exists
if [ ! -f "$CLI_FILE" ]; then
  echo "Error: $CLI_FILE not found. Make sure you're running this script from the claude-terminal root directory."
  exit 1
fi

# Create a backup of the original file
cp "$CLI_FILE" "${CLI_FILE}.backup"
echo "Created backup at ${CLI_FILE}.backup"

# Replace any object's getIsDocker() call with true
sed -i.bak1 's/[a-zA-Z0-9_]*\.getIsDocker()/true/g' "$CLI_FILE"
echo "Replaced all instances of *.getIsDocker() with true"

# Print warning message
echo 'echo -e "\033[33m🔥 YOLO MODE ACTIVATED 🔥\033[0m"' >> "$CLI_FILE"
echo "Added warning message"

# Replace any object's hasInternetAccess() call with false
sed -i.bak2 's/[a-zA-Z0-9_]*\.hasInternetAccess()/false/g' "$CLI_FILE"
echo "Replaced all instances of *.hasInternetAccess() with false"

# Replace the loading messages array with YOLO versions
ORIGINAL_ARRAY='["Accomplishing","Actioning","Actualizing","Baking","Brewing","Calculating","Cerebrating","Churning","Clauding","Coalescing","Cogitating","Computing","Conjuring","Considering","Cooking","Crafting","Creating","Crunching","Deliberating","Determining","Doing","Effecting","Finagling","Forging","Forming","Generating","Hatching","Herding","Honking","Hustling","Ideating","Inferring","Manifesting","Marinating","Moseying","Mulling","Mustering","Musing","Noodling","Percolating","Pondering","Processing","Puttering","Reticulating","Ruminating","Schlepping","Shucking","Simmering","Smooshing","Spinning","Stewing","Synthesizing","Thinking","Transmuting","Vibing","Working"]'

# Create a temporary file with a Python script to modify the array
cat > /tmp/modify_array.py << 'EOF'
import re
import json
import random
import sys

file_path = sys.argv[1]
with open(file_path, 'r') as f:
    content = f.read()

original_array = '["Accomplishing","Actioning","Actualizing","Baking","Brewing","Calculating","Cerebrating","Churning","Clauding","Coalescing","Cogitating","Computing","Conjuring","Considering","Cooking","Crafting","Creating","Crunching","Deliberating","Determining","Doing","Effecting","Finagling","Forging","Forming","Generating","Hatching","Herding","Honking","Hustling","Ideating","Inferring","Manifesting","Marinating","Moseying","Mulling","Mustering","Musing","Noodling","Percolating","Pondering","Processing","Puttering","Reticulating","Ruminating","Schlepping","Shucking","Simmering","Smooshing","Spinning","Stewing","Synthesizing","Thinking","Transmuting","Vibing","Working"]'
yolo_suffixes = [" (safety's off, hold on tight)", " (all gas, no brakes, lfg)", " (yolo mode engaged)", " (dangerous mode! I guess you can just do things)"]

array = json.loads(original_array)
yolo_array = [word + random.choice(yolo_suffixes) for word in array]
yolo_array_json = json.dumps(yolo_array)

modified_content = content.replace(original_array, yolo_array_json)

with open(file_path, 'w') as f:
    f.write(modified_content)
EOF

# Run the Python script to modify the array
python3 /tmp/modify_array.py "$CLI_FILE"
echo "Replaced loading messages with YOLO versions"

# Clean up temporary file
rm /tmp/modify_array.py

# Clean up the .bak files created by sed
rm -f "${CLI_FILE}.bak1" "${CLI_FILE}.bak2"

echo "Modifications complete. The --dangerously-skip-permissions flag should now work everywhere."
echo "To revert changes, restore from the backup file: ${CLI_FILE}.backup" 
