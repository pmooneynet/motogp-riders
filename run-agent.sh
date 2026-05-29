#!/bin/bash

# MotoGP Riders — Background Agent
# Run this in a separate terminal window.
# Add tasks to BACKLOG.md from the main chat window; this agent will pick them up.

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

clear
echo "================================================"
echo "  🏍️  MotoGP Riders — Background Agent"
echo "================================================"
echo "  Project : $PROJECT_DIR"
echo "  Backlog : BACKLOG.md"
echo "  Brief   : AGENT_BRIEF.md"
echo "================================================"
echo ""

# Resolve claude binary — check common locations in order
CLAUDE_BIN=$(which claude 2>/dev/null)
if [ -z "$CLAUDE_BIN" ]; then
  CLAUDE_BIN="$HOME/.npm-global/bin/claude"
fi
if [ ! -f "$CLAUDE_BIN" ] && [ "$CLAUDE_BIN" != "claude" ]; then
  # Fall back to any claude found in npx cache
  CLAUDE_BIN=$(find "$HOME/.npm/_npx" -name "claude" -type f 2>/dev/null | head -1)
fi
if [ -z "$CLAUDE_BIN" ]; then
  echo "❌  claude not found. Run: npm install -g @anthropic-ai/claude-code"
  exit 1
fi
echo "  Using  : $CLAUDE_BIN"
echo ""

$CLAUDE_BIN "
Read AGENT_BRIEF.md first — it contains the full project context, file structure, and design system.

Then read BACKLOG.md and work through every Pending task in order:
  1. Move the task from Pending to In Progress in BACKLOG.md
  2. Implement the change in the source files
  3. Move the task from In Progress to Done in BACKLOG.md
  4. Print a short summary of what you did
  5. Pick up the next Pending task

Keep going until there are no more Pending tasks.
If the backlog is empty, print 'Backlog is clear — waiting for tasks.' and exit cleanly.
"
