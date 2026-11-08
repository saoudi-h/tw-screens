# AUTONOMOS PROTOCOL (v0.7.0-alpha)

> This file defines the project's AI workflow contract. The workflows execute it. Do not duplicate workflow steps here.

## Quick Reference

| Action                           | How                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| Start a session                  | Read the `/session` workflow                                                       |
| Start a task                     | Read the `/task` workflow                                                          |
| Triage a problem or proposal     | Read the optional `/issue` workflow                                                |
| Adopt existing project knowledge | Read the optional `/adopt` workflow                                                |
| Reconcile drift and archive history          | Read the `/reconcile` workflow                                                     |
| Design or critique a surface     | Read the optional `/design` workflow                                               |
| End a session                    | Read the `/crystallize` workflow                                                   |
| Get context                      | Read root `AGENT.md`, then only the selected scope's ancestor chain                |
| Resolve objective                | Explicit user request first; otherwise resume `[/]` or pick highest-priority `[ ]` |
| Log session work                 | Create `.autonomos/worklogs/YYYY-MM-DD-[TASK_ID].md`                               |

## File Map

| File            | Location                   | Role                                              |
| --------------- | -------------------------- | ------------------------------------------------- |
| `AGENT.md`      | Root + any subdirectory    | Durable guidance for its directory scope          |
| `TASKS.md`      | `.autonomos/TASKS.md`      | Current task state and optional Current direction             |
| `ISSUES.md`     | `.autonomos/ISSUES.md`     | Optional problem, proposal, and question intake   |
| `worklogs/`     | `.autonomos/worklogs/`     | Historical session evidence, not current guidance |
| `archive/`     | `.autonomos/archive/`     | Optional history, searched only when justified     |
| `specs/`        | `.autonomos/specs/`        | Optional project-owned normative target state     |
| `decisions/`    | `.autonomos/decisions/`    | Optional project-owned decision records (ADRs)    |
| `DESIGN.md`     | Root or target scope      | Optional project-owned visual/interaction direction |
| `PROTOCOL.md`   | `.autonomos/PROTOCOL.md`   | This file — read-only reference                   |
| `manifest.json` | `.autonomos/manifest.json` | Protocol version metadata                         |

## Design Direction Boundary

`DESIGN.md` is optional project-owned direction, not a managed protocol
artifact. Use `/design` when a surface needs direction, critique, or
design-knowledge extraction; keep the project's identity and examples local.
The workflow supplies routing and evidence rules, not a universal visual style.

## AGENT.md Format Rules

Store only stable guidance that will affect different future tasks. Keep transient evidence in worklogs and operational explanations in component documentation. Use the narrowest applicable `AGENT.md`; consolidate or replace obsolete entries instead of appending history. Preserve valid subclaims in mixed paragraphs. Check the resulting text for completed-action narratives, task progress and unsupported prohibitions; these do not belong in operating guidance.

**Root `AGENT.md`** — Must use the structured template (frontmatter + sections: Context, Workflow, Stack, Key Directories, Constraints).

**Local `AGENT.md`** (in any subdirectory) — Free format. One line is enough if it is clear. What matters: the next session can use it. Example:

```markdown
# AGENT: packages/core

- Stack: TypeScript, Vitest, tsdown
- Conventions: exports via src/index.ts, tests co-located (\*.test.ts)
- Constraint: template changes require workflow test updates
```

## Issue, Specification, Decision, and Task Rules

Issues describe evidence, impact, and a desired outcome without choosing implementation; proposed directions remain hypotheses until an approach is accepted. Specifications describe accepted target behavior or requirements that may guide multiple tasks. A decision record (commonly ADR, Architecture Decision Record) captures one technical choice and its rationale. Tasks describe an accepted intervention and completion criteria. Use optional `ISSUES.md`, `specs/`, and `decisions/` only when they provide value; direct, clear changes may become tasks immediately. Link related issues, specs, decisions, and tasks in both directions.

## Specification and Decision Rules

- `.autonomos/specs/` and `.autonomos/decisions/` are optional, project-owned, first-use directories; `init`, `update`, and artifact-integrity checks do not create or overwrite them.
- Keep one Markdown file per bounded specification or decision. Include status, scope, provenance, acceptance criteria or consequences, and replacement links where relevant; no parser or independent version is required initially.
- Specification status is `draft`, `accepted`, or `superseded`. Only `accepted` is normative; `superseded` points to its successor. Acceptance does not mean implementation is complete.
- Decision records use `proposed`, `accepted`, or `superseded`; they preserve rationale and alternatives rather than duplicating the full specification.
- Keep stable agent operating rules in `AGENT.md`, user/developer reference in `docs/`, execution state in `TASKS.md`, and historical evidence in `worklogs/`.
- Read only relevant accepted records at task start. Use `/adopt` to extract legacy knowledge; never rewrite historical worklogs, issues, or tasks to create current artifacts.

The protocol-facing name is **decision record**. **ADR** (Architecture Decision Record) is a common convention for the same kind of document, not a required external standard. Use these lightweight Markdown shapes as a starting point; they are conventions, not parser-enforced schemas:

```markdown
# SPEC-001 — Concise target-state title

- Status: draft | accepted | superseded
- Scope: component, capability, or boundary
- Provenance: issue, discussion, or source links
- Related decisions: ADR-001, ...
- Superseded by: SPEC-002 (when applicable)

## Intent

## Requirements

## Acceptance criteria

## Out of scope
```

```markdown
# ADR-001 — Concise decision title

- Status: proposed | accepted | superseded
- Scope: component or technical boundary
- Provenance: issue, task, or investigation links
- Related specs: SPEC-001, ...
- Superseded by: ADR-002 (when applicable)

## Context

## Decision

## Alternatives considered

## Consequences
```

Only user/project governance accepts a specification or decision as normative. Agents may draft and link records, but must not silently promote them; acceptance is separate from implementation completion.

## Current Context and Archival Lifecycle

- Current context must support ordinary work without archives. Keep applicable guidance, accepted requirements/decisions, unresolved work, dependencies and necessary next actions discoverable. Acceptance is independent of implementation; dated temporary directives remain active until lifted or their stated end condition is met.
- A completed task or resolved/declined issue is an archival candidate only when its own scope is settled and still-needed outcomes/constraints/references are retained in current context. Explicitly abandoned work may be archived with its reason, without claiming it was completed. A completed child does not satisfy unmet parent acceptance criteria.
- Record new task completion dates as `Completed: YYYY-MM-DD`; do not infer missing old dates from worklog filenames. Age, a checkbox, absent code or a newer statement alone is not proof of obsolescence.
- Group archival at coherent completed-work boundaries, not per task or calendar interval. No Sprint object or scheduled maintenance is required. Correct certain in-scope drift proactively during normal work; use `/reconcile` for investigation, consolidation and archival.
- Before moving history, consolidate current knowledge in its existing narrowest home. Optional `Current direction` in `TASKS.md` explains present aims, recent consequential outcomes and next work; rewrite it rather than append chronology. Keep progress out of `AGENT.md`.
- Create project-owned `.autonomos/archive/README.md` and meaningful batch directories on first use only. A batch can contain `TASKS.md`, `ISSUES.md`, `worklogs/` and provenance for retired guidance. Group/split batches by useful scope; there is no fixed age, size or mandatory per-record schema.
- Archive means move, not delete or rewrite conclusions. Preserve historical record content, identifiers and provenance; repair relative paths when necessary. Preserve original mixed-source text when retiring only some claims. Applicable specs/decisions stay current independently of execution records. Extraction into new normative artifacts still uses `/adopt`.
- The archive index maps batch topics to records, not a second task journal. Search by ID or subject only when a specific question requires history; neither archives nor their entire index are routine startup context. Keep only necessary dependency/outcome pointers in current records, not a permanent stub for every completed task.
- Archived task and issue IDs remain reserved. Before assigning an ID, search current and archived registries. With a CLI, `readTaskRegistry(root, { history: true })` exposes task references and duplicates; plain Markdown search works without it.
- Verify exact source text before edits, retained current knowledge, IDs and resolvable references after moves. Do not confuse tool annotations with file content or historical validation with a current observation. Re-read shared files before writing and preserve unrelated concurrent changes. Stop when a second pass yields no deterministic correction.
- `autonomos status` summarizes the current task registry; `--history` adds separate archived counts and read/collision diagnostics. Archived means historical, not necessarily completed. History uses batch `TASKS.md` files, not arbitrary worklog checklists.
- Archives are project-owned, like specs and decisions. Initialization, updates and integrity checks neither create empty archives nor overwrite, relocate or judge their contents. Installing a new protocol performs no automatic cleanup. Version-control policy stays project-owned; Git is not required for archival or retrieval.

Example (only files needed by a batch are created):

```text
.autonomos/
  TASKS.md
  ISSUES.md
  archive/
    README.md
    realtime-experiment-retirement/
      TASKS.md
      ISSUES.md
      worklogs/
```

## Task Format

`- [Status] **[ID]** Title \`Priority\` \`Complexity\``

| Status            | Priority      | Complexity |
| ----------------- | ------------- | ---------- |
| `[ ]` Todo        | `🔴 Critical` | `S` Small  |
| `[/]` In Progress | `🟠 High`     | `M` Medium |
| `[x]` Done        | `🔵 Medium`   | `L` Large  |
| `[!]` Blocked     | `⚪ Low`      | `XL` Huge  |

## Metadata Rules

- **Language:** English unless AGENT.md says otherwise.
- **Tone:** Technical, concise, fact-based.
- **Continuity:** Refer to previous work as "we" or "the project".
