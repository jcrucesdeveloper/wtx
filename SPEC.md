# WTX Format Spec (v0.1)

WTX is a plain-text format for gym/lifting routines. It's designed to be
readable and writable by hand, with no special tooling required.

## File extension

- `.wtt` — Workout Template (a routine you plan to follow)
- `.wts` — Workout Session (a logged/completed workout)

## Template format (`.wtt`)

```
# Push Day

Bench Press | 4x8 | 60kg | rest 90s
Overhead Press | 3x10 | 30kg | rest 60s
Tricep Pushdown | 3x12 | 20kg
```

Rules:

- First line starting with `#` is the routine name.
- Blank lines are ignored.
- Each exercise is one line: `Name | Sets x Reps | Weight | Notes`
- `Weight` and `Notes` are optional.
- Fields are separated by ` | ` (space-pipe-space).

## Session format (`.wts`)

Same as a template, but each line records what actually happened, and the
file starts with a date instead of just a name:

```
# Push Day - 2026-08-21

Bench Press | 4x8 | 62.5kg | felt strong
Overhead Press | 3x9 | 30kg
Tricep Pushdown | 3x12 | 20kg
```

## Design goals

- Human-first: editable in any text editor, diffable in git.
- No nesting, no required schema validation to get started.
- Easy to parse line-by-line in any language.
