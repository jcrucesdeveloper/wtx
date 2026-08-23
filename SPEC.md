# WTX Format Spec (v0.1)

WTX is a plain-text format for gym/lifting routines. It's designed to be
readable and writable by hand, with no special tooling required.

## File extension

- `.wtt` — Workout Template (a routine you plan to follow)
- `.wts` — Workout Session (a logged/completed workout)

## Template format (`.wtt`)

```
# Push Day 
Warm up | 1m30s
Bench Press | 4x8 | 60kg | rest 1m30s
Incline Bench Press (Dumbbbell) | 4x10 | 20kg | rest 2min 30s
Butterfly (Pec Deck) | 3x10 | 65kg | rest 2min 30s
Seated Shoulder Press (Machine) | 4x36 | 10 | rest 2m
Lateral Raise (Dumbbell) | 3x12 | rest 1m 30s
Tricep Rope Pushdown | 4x10 | 21.25kg
Running | 15m20s

```

Rules:

- First line starting with `#` is the routine name.
- Blank lines are ignored.

## Session format (`.wts`)

Same as a template, but each line records what actually happened, and the
file starts with a date instead of just a name:

```
# Push Day - 2026-08-21

Bench Press | 4x8 | 62.5kg | felt strong
W | 40kg | 10 
1 | 40kg | 8
2 | 30kg | 3
Overhead Press | 3x9 | 30kg
Tricep Pushdown | 3x12 | 20kg
```

## Design goals
- No nesting, no required schema validation to get started.
- Easy to parse line-by-line in any language.
