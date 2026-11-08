---
name: protocol-crystallize
description: 'Close work with durable knowledge, truthful state and bounded current context.'
---

# /crystallize — End session

> **CRITICAL:** You MUST NOT ask the user what to crystallize. Reflect, decide, write, then report.
> **Authority:** If the user limited the work to read-only or no changes, do not modify any artifact; deliver the substantive answer and report that crystallization was skipped.

## STEP 1 — Worklog

Create `.autonomos/worklogs/YYYY-MM-DD-[TASK_ID].md`: work performed, decisions and reasons, files changed, validation and next steps.

## STEP 2 — Consolidate knowledge

For each candidate ask: **Would this still guide a different future task?** Does it already exist, replace a claim, or belong in a narrower scope?

- Keep observations, measurements, chronology and completed actions in the worklog; update existing component documentation for operational explanation.
- Route stable operating guidance to the narrowest `AGENT.md`, target requirements to `specs/`, and decision rationale to `decisions/`; update existing knowledge instead of duplicating it.
- Consolidate or replace superseded and disproven guidance claim by claim, preserving valid restrictions in mixed paragraphs. Do not turn a current choice into a broader prohibition.
- Do not turn historical worklogs, issues, or tasks into current specs/decisions without `/adopt`. Never create an `AGENT.md` based on file count alone.
- Keep progress in `TASKS.md`; rewrite optional Current direction only when it helps the next session. Do not append a completed-task journal there or in `AGENT.md`.

## STEP 3 — Close the work boundary

Mark `[x]` only if complete, `[!]` only if an unresolved dependency prevents progress, or keep `[/]` for partial work. Record new completion dates; never fabricate old ones. Check linked issue acceptance separately.
At a coherent completed-work boundary, run a bounded `/reconcile` archival pass when eligible history needs moving. Do not reorganize archives mechanically after every task or by calendar age.
Verify the actual resulting text and links, not just the intended change; preserve unrelated concurrent edits.

## STEP 4 — User response

First deliver a self-contained answer to the original request: outcome, evidence, limitations, and relevant next step.
Then append this supplementary handoff:

`Crystallization — Task: [x] / [/] / [!] — [ID] | Worklog: .autonomos/worklogs/... | AGENT.md updated: [yes / no — reason]`
