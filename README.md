# Claude YOLO

A wrapper for the Claude CLI that always enables danger mode by bypassing Docker and internet permission checks.

## Installation

```bash
npm install -g claude-yolo
```

## Usage

```bash
claude-yolo [options]
```

All arguments and options are passed directly to the Claude CLI.

This wrapper:
1. Checks for and automatically installs updates to the Claude package
2. Prints "YOLO" to the console
3. Creates a modified copy of the Claude CLI code to bypass permission checks
   - Replaces all `getIsDocker()` calls with `true`
   - Replaces all `hasInternetAccess()` calls with `false`
4. Leaves the original Claude CLI file untouched (won't affect your normal `claude` command)
5. Adds the `--dangerously-skip-permissions` flag to command line arguments
6. Imports the modified copy of the CLI

## New in Version 1.4.0

- **Auto-update**: Automatically checks for and installs updates to the Claude package at runtime
- **Non-destructive approach**: Creates a separate modified copy of the CLI file instead of modifying the original
- **Safe for global installations**: Your regular `claude` command will work normally even after installing claude-yolo
- **Debug mode**: Set the `DEBUG=1` environment variable to see detailed logs about the modifications

## Why?

Sometimes you just want to YOLO and skip those pesky permission checks. This tool lets you do that without modifying your original Claude CLI installation.

## Debugging

If you encounter any issues, you can run with debug output:

```bash
DEBUG=1 claude-yolo
```

This will show additional information about:
- Claude package update checks
- Current and latest available versions
- When updates are being installed
- Modifications being made to the CLI file

## Auto-Update Feature

Claude YOLO automatically checks for updates to the Claude package each time it runs:

1. When you run `claude-yolo`, it checks for the latest version of `@anthropic-ai/claude-code` on npm
2. If your installed version is outdated, it will:
   - Update your package.json with the latest version
   - Run npm install to get the newest version
   - Notify you that an update was applied
3. This ensures you're always using the latest Claude CLI features

## Disclaimer

This is an unofficial tool and not supported by Anthropic. Use at your own risk.