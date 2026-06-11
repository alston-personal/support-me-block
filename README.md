# Support-Me-Block

**Category:** Product &nbsp;|&nbsp; **Priority:** 5 &nbsp;|&nbsp; **Status:** Execution (Blocked)

## Overview

This is a scaffolding repository for the **AgentOS** ecosystem. It provides the structural backbone for the Brain-Body distributed architecture, using symlinks to connect to shared agent data and agent management infrastructure.

## Architecture

This repo follows the **Logic/Data Separation** principle:

- **Logic (source code):** Code, configs, and workflows stored in this directory.
- **Data (agent-data):** Progress tracked in `STATUS.md`, memory files, and logs stored in the data layer (`/home/ubuntu/agent-data/`).

### Symlink Map

| Path | → Links To |
|------|-----------|
| `.agent/` | `/home/ubuntu/agentmanager/.agent` |
| `.aider.instructions.md` | `/home/ubuntu/agent-data/templates/.aider.instructions.md` |
| `.cursorrules` | `/home/ubuntu/agent-data/templates/.cursorrules` |
| `CLAUDE.md` | `/home/ubuntu/agent-data/templates/CLAUDE.md` |
| `STATUS.md` | `/home/ubuntu/agent-data/projects/support-me-block/STATUS.md` |
| `memory/` | `/home/ubuntu/agent-data/projects/support-me-block/memory` |

## File Structure

```
.
├── .agent/             # Symlink → agentmanager .agent directory
├── .claude/            # Claude Code configuration (local settings)
├── .gitignore          # Excludes agent data files (STATUS.md, memory/, .agent)
├── CLAUDE.md           # Symlink → project directives
├── STATUS.md           # Symlink → project status tracking
├── .aider.instructions.md   # Symlink → AI editor instructions
└── .cursorrules        # Symlink → Cursor IDE rules
```

## Quick Start

No build or install steps required. The repository is self-describing through:

1. **CLAUDE.md** — Contains AgentOS core directives and onboarding context.
2. **STATUS.md** — Tracks project lifecycle, priority, and activity log.

## Troubleshooting

- **Service fails:** Run `/reboot`
- **Out of sync:** Run `/sync`

## Git History

| Commit | Message |
|--------|---------|
| `0a44fe4` | chore: add latest commit to README git history table |
| `4e51f2d` | chore: add latest commit to README git history table |
| `bf1dea5` | chore: finalize README git history table |
| `a0fd357` | chore: finalize README git history table |
| `cd0a02e` | chore: finalize README git history table |
| `9b3fff6` | chore: finalize README git history table |
| `ddfbca5` | docs: update README git history with latest commits |
| `0e90280` | chore: add memory symlink to README and fix file tree diagram |
| `b60c8f8` | docs: update README git history section with both commits |
| `cc8dda9` | chore: add README, CLAUDE.md, and template symlinks to repo |
| `7d5337a` | clean: add agent data to .gitignore |
