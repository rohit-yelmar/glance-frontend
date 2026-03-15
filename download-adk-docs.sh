#!/bin/bash
# Usage: bash download-adk-docs.sh
# Run from your project root. Saves all ADK docs to ./docs/adk/

BASE="https://google.github.io/adk-docs"
OUT="./docs/adk"
COUNT=0
FAIL=0

fetch() {
  local local_path="$1"
  local remote_path="$2"
  local target="$OUT/$local_path"
  mkdir -p "$(dirname "$target")"
  if curl -sf "$BASE/$remote_path" -o "$target"; then
    echo "  OK  $local_path"
    COUNT=$((COUNT + 1))
  else
    echo "  FAIL  $local_path"
    FAIL=$((FAIL + 1))
  fi
}

echo "Downloading Google ADK docs to $OUT/ ..."
echo ""

# get-started
fetch "get-started/overview.md"              "get-started/index.md"
fetch "get-started/about.md"                 "get-started/about/index.md"
fetch "get-started/installation.md"          "get-started/installation/index.md"
fetch "get-started/python.md"                "get-started/python/index.md"
fetch "get-started/quickstart.md"            "get-started/quickstart/index.md"
fetch "get-started/streaming.md"             "get-started/streaming/index.md"
fetch "get-started/streaming-quickstart.md"  "get-started/streaming/quickstart-streaming/index.md"

# tutorials
fetch "tutorials/overview.md"    "tutorials/index.md"
fetch "tutorials/agent-team.md"  "tutorials/agent-team/index.md"

# visual-builder
fetch "visual-builder/overview.md"  "visual-builder/index.md"

# agents
fetch "agents/overview.md"       "agents/index.md"
fetch "agents/config.md"         "agents/config/index.md"
fetch "agents/custom-agents.md"  "agents/custom-agents/index.md"
fetch "agents/llm-agents.md"     "agents/llm-agents/index.md"
fetch "agents/multi-agents.md"   "agents/multi-agents/index.md"

# agents/models
fetch "agents/models/overview.md"       "agents/models/index.md"
fetch "agents/models/anthropic.md"      "agents/models/anthropic/index.md"
fetch "agents/models/google-gemini.md"  "agents/models/google-gemini/index.md"
fetch "agents/models/litellm.md"        "agents/models/litellm/index.md"

# agents/workflow-agents
fetch "agents/workflow-agents/overview.md"          "agents/workflow-agents/index.md"
fetch "agents/workflow-agents/loop-agents.md"       "agents/workflow-agents/loop-agents/index.md"
fetch "agents/workflow-agents/parallel-agents.md"   "agents/workflow-agents/parallel-agents/index.md"
fetch "agents/workflow-agents/sequential-agents.md" "agents/workflow-agents/sequential-agents/index.md"

# integrations
fetch "integrations/overview.md"                "integrations/index.md"
fetch "integrations/atlassian.md"               "integrations/atlassian/index.md"
fetch "integrations/code-exec-agent-engine.md"  "integrations/code-exec-agent-engine/index.md"
fetch "integrations/code-execution.md"          "integrations/code-execution/index.md"
fetch "integrations/gitlab.md"                  "integrations/gitlab/index.md"

# tools
fetch "tools/limitations.md"  "tools/limitations/index.md"

# tools-custom
fetch "tools-custom/overview.md"       "tools-custom/index.md"
fetch "tools-custom/authentication.md" "tools-custom/authentication/index.md"
fetch "tools-custom/confirmation.md"   "tools-custom/confirmation/index.md"
fetch "tools-custom/function-tools.md" "tools-custom/function-tools/index.md"
fetch "tools-custom/mcp-tools.md"      "tools-custom/mcp-tools/index.md"
fetch "tools-custom/performance.md"    "tools-custom/performance/index.md"

# skills
fetch "skills/overview.md"  "skills/index.md"

# runtime
fetch "runtime/overview.md"       "runtime/index.md"
fetch "runtime/api-server.md"     "runtime/api-server/index.md"
fetch "runtime/command-line.md"   "runtime/command-line/index.md"
fetch "runtime/event-loop.md"     "runtime/event-loop/index.md"
fetch "runtime/resume.md"         "runtime/resume/index.md"
fetch "runtime/runconfig.md"      "runtime/runconfig/index.md"
fetch "runtime/web-interface.md"  "runtime/web-interface/index.md"

# deploy
fetch "deploy/overview.md"              "deploy/index.md"
fetch "deploy/cloud-run.md"             "deploy/cloud-run/index.md"
fetch "deploy/gke.md"                   "deploy/gke/index.md"
fetch "deploy/agent-engine-deploy.md"   "deploy/agent-engine/deploy/index.md"
fetch "deploy/agent-engine-test.md"     "deploy/agent-engine/test/index.md"

# observability
fetch "observability/overview.md"  "observability/index.md"
fetch "observability/logging.md"   "observability/logging/index.md"

# evaluate
fetch "evaluate/overview.md"  "evaluate/index.md"
fetch "evaluate/criteria.md"  "evaluate/criteria/index.md"

# safety
fetch "safety/overview.md"  "safety/index.md"

# context
fetch "context/overview.md"    "context/index.md"
fetch "context/caching.md"     "context/caching/index.md"
fetch "context/compaction.md"  "context/compaction/index.md"

# sessions
fetch "sessions/overview.md"        "sessions/index.md"
fetch "sessions/memory.md"          "sessions/memory/index.md"
fetch "sessions/state.md"           "sessions/state/index.md"
fetch "sessions/session.md"         "sessions/session/index.md"
fetch "sessions/session-migrate.md" "sessions/session/migrate/index.md"
fetch "sessions/session-rewind.md"  "sessions/session/rewind/index.md"

# callbacks
fetch "callbacks/overview.md"           "callbacks/index.md"
fetch "callbacks/design-patterns.md"    "callbacks/design-patterns-and-best-practices/index.md"
fetch "callbacks/types-of-callbacks.md" "callbacks/types-of-callbacks/index.md"

# misc components
fetch "artifacts/overview.md"  "artifacts/index.md"
fetch "events/overview.md"     "events/index.md"
fetch "apps/overview.md"       "apps/index.md"
fetch "plugins/overview.md"    "plugins/index.md"
fetch "mcp/overview.md"        "mcp/index.md"

# a2a
fetch "a2a/overview.md"              "a2a/index.md"
fetch "a2a/quickstart-consuming.md"  "a2a/quickstart-consuming/index.md"
fetch "a2a/quickstart-exposing.md"   "a2a/quickstart-exposing/index.md"

# streaming
fetch "streaming/overview.md"        "streaming/index.md"
fetch "streaming/configuration.md"   "streaming/configuration/index.md"
fetch "streaming/streaming-tools.md" "streaming/streaming-tools/index.md"
fetch "streaming/part1-intro.md"     "streaming/dev-guide/part1/index.md"
fetch "streaming/part2-messages.md"  "streaming/dev-guide/part2/index.md"
fetch "streaming/part3-events.md"    "streaming/dev-guide/part3/index.md"
fetch "streaming/part4-runconfig.md" "streaming/dev-guide/part4/index.md"
fetch "streaming/part5-av.md"        "streaming/dev-guide/part5/index.md"

# grounding
fetch "grounding/overview.md"               "grounding/index.md"
fetch "grounding/google-search-grounding.md" "grounding/google_search_grounding/index.md"

echo ""
echo "Done. $COUNT downloaded, $FAIL failed."
echo "Docs saved to $OUT/"
