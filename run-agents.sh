#!/bin/bash

# =============================================================================
# MotoGP Riders — Multi-Agent Runner
# Watches inbox files and automatically triggers the right Claude agent
# when the Master writes a new task to BUILDER_INBOX.md or TESTER_INBOX.md
#
# Usage:
#   chmod +x run-agents.sh
#   ./run-agents.sh builder    ← run in Terminal 2
#   ./run-agents.sh tester     ← run in Terminal 3
#   ./run-agents.sh master     ← run in Terminal 1
# =============================================================================

ROLE=$1
DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$ROLE" ]; then
  echo "Usage: ./run-agents.sh [master|builder|tester]"
  exit 1
fi

echo "================================================"
echo "  MotoGP Riders — Agent Runner"
echo "  Role: $ROLE"
echo "  Watching for tasks in: $DIR"
echo "================================================"
echo ""

# -----------------------------------------------------------------------------
# MASTER — watches for BUILDER_DONE.md and TEST_RESULTS.md updates
# -----------------------------------------------------------------------------
if [ "$ROLE" = "master" ]; then
  echo "Master Agent starting..."
  echo "Sending initial brief to Claude..."
  echo ""

  # Start the master with its brief
  claude --print "Read $DIR/MASTER_AGENT_BRIEF.md and $DIR/BACKLOG.md and $DIR/TEST_RESULTS.md and $DIR/MASTER_LOG.md. Begin your workflow now."

  echo ""
  echo "Master Agent is now watching for BUILDER_DONE.md..."
  echo ""

  while true; do
    # Watch for builder completing a task
    if [ -f "$DIR/BUILDER_DONE.md" ]; then
      echo "[$(date +%H:%M:%S)] Builder finished a task — triggering Master review..."
      DONE_CONTENT=$(cat "$DIR/BUILDER_DONE.md")
      rm "$DIR/BUILDER_DONE.md"
      claude --print "Read $DIR/MASTER_AGENT_BRIEF.md. The Builder just completed a task. Their report: ---
$DONE_CONTENT
---
Now write an instruction to $DIR/TESTER_INBOX.md telling the Tester what to test. Then update $DIR/MASTER_LOG.md."
      echo "[$(date +%H:%M:%S)] Master has briefed the Tester."
    fi

    # Watch for tester completing a test run
    if [ -f "$DIR/TESTER_DONE.md" ]; then
      echo "[$(date +%H:%M:%S)] Tester finished — triggering Master review of results..."
      rm "$DIR/TESTER_DONE.md"
      claude --print "Read $DIR/MASTER_AGENT_BRIEF.md and $DIR/TEST_RESULTS.md and $DIR/BACKLOG.md. The Tester has just completed a test run. Review the results. If all pass, mark the current In Progress task as Done in $DIR/BACKLOG.md and update $DIR/MASTER_LOG.md. If any fail, write a fix instruction to $DIR/BUILDER_INBOX.md."
      echo "[$(date +%H:%M:%S)] Master has reviewed test results."
    fi

    sleep 5
  done
fi

# -----------------------------------------------------------------------------
# BUILDER — watches BUILDER_INBOX.md for tasks from the Master
# -----------------------------------------------------------------------------
if [ "$ROLE" = "builder" ]; then
  echo "Builder Agent ready. Watching $DIR/BUILDER_INBOX.md for tasks..."
  echo ""

  # Clear any stale done file
  rm -f "$DIR/BUILDER_DONE.md"

  LAST_TASK=""

  while true; do
    if [ -f "$DIR/BUILDER_INBOX.md" ]; then
      TASK=$(cat "$DIR/BUILDER_INBOX.md")

      # Only act if the task has changed and isn't the placeholder
      if [ "$TASK" != "$LAST_TASK" ] && ! echo "$TASK" | grep -q "No task assigned"; then
        LAST_TASK="$TASK"
        echo "[$(date +%H:%M:%S)] New task received! Starting work..."
        echo ""
        echo "--- TASK ---"
        echo "$TASK"
        echo "------------"
        echo ""

        # Clear the inbox and run claude with the task
        echo "# Builder Inbox
_No task assigned yet. Waiting for Master Agent._" > "$DIR/BUILDER_INBOX.md"

        claude --print "Read $DIR/AGENT_BRIEF.md. Your task from the Master Agent:
---
$TASK
---
Implement this task now. When done, write a brief summary of what you changed to $DIR/BUILDER_DONE.md."

        echo ""
        echo "[$(date +%H:%M:%S)] Task complete. Waiting for next task..."
      fi
    fi
    sleep 5
  done
fi

# -----------------------------------------------------------------------------
# TESTER — watches TESTER_INBOX.md for tasks from the Master
# -----------------------------------------------------------------------------
if [ "$ROLE" = "tester" ]; then
  echo "Testing Agent ready. Watching $DIR/TESTER_INBOX.md for tasks..."
  echo ""

  rm -f "$DIR/TESTER_DONE.md"

  LAST_TASK=""

  while true; do
    if [ -f "$DIR/TESTER_INBOX.md" ]; then
      TASK=$(cat "$DIR/TESTER_INBOX.md")

      if [ "$TASK" != "$LAST_TASK" ] && ! echo "$TASK" | grep -q "No task assigned"; then
        LAST_TASK="$TASK"
        echo "[$(date +%H:%M:%S)] Test task received! Running tests..."
        echo ""

        # Clear inbox
        echo "# Tester Inbox
_No task assigned yet. Waiting for Master Agent._" > "$DIR/TESTER_INBOX.md"

        claude --print "Read $DIR/TESTING_AGENT_BRIEF.md and $DIR/TEST_SCRIPTS.md. The Master Agent has asked you to run tests:
---
$TASK
---
Run all relevant automated checks and update $DIR/TEST_RESULTS.md with the results. When done, create a file $DIR/TESTER_DONE.md with a one-line summary."

        echo ""
        echo "[$(date +%H:%M:%S)] Tests complete. Waiting for next task..."
      fi
    fi
    sleep 5
  done
fi
