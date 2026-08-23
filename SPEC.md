# WTX Format Spec (v0.1)

WTX is a plain-text format for gym/lifting routines. It's designed to be readable and writable by hand, with no special tooling required.

## File extension

- `.wtt` — Workout Template (a routine you plan to follow)
- `.wts` — Workout Session (a logged/completed workout)

## Template format (`.wtt`)

```
# Push Day
unit: kg

Warm up | time 1m30s
Bench Press | reps 4x8 | 60 | rest 1m30s
Incline Bench Press (Dumbbell) | reps 4x10 | 20 | rest 2m30s
Butterfly (Pec Deck) | reps 3x10 | 65 | rest 2m30s
Seated Shoulder Press (Machine) | reps 4x36 | 10 | rest 2m
Lateral Raise (Dumbbell) | reps 3x12 | rest 1m30s
Tricep Rope Pushdown | reps 4x10 | 21.25
Running | time 15m20s
```

Rules:

- First line starting with `#` is the routine name.
- Metadata lines are `key: value`, e.g. `unit: kg` sets the weight unit for the whole file.
- Blank lines are ignored.
- Exercise lines are `Name | <type> ... | Weight | rest Duration`.
- Type is `reps 4x8` (rep-based) or `time 1m30s` (time-based, e.g. warm-ups/cardio).
- Weight is a bare number (`60`, not `60kg`) — unit comes from the `unit:` metadata line.
- Durations are compact, no spaces, no `min` word: `1m30s`, `2m`, `15m20s`.
- Fields are separated by ` | ` (space-pipe-space).

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
