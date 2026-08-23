# wtx

A dead-simple plain-text file format for tracking gym/lifting workouts.

- `.wtt` — Workout Template (a routine you plan to follow)
- `.wts` — Workout Session (a logged workout)

WTX is designed to be readable and writable by hand, with no special tooling
required. See [examples/](examples/) for sample files.

## Format

### Template format (`.wtt`)

```
# Push Day
unit: kg
description: Focuses mostly on chest.

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
- `description:` is an optional metadata line giving a free-text summary of the routine, e.g. `description: Focuses mostly on chest and triceps.`
- Blank lines are ignored.
- Exercise lines are `Name | <type> ... | Weight | rest Duration`.
- Type is `reps 4x8` (rep-based) or `time 1m30s` (time-based, e.g. warm-ups/cardio).
- Weight is a bare number (`60`, not `60kg`) — unit comes from the `unit:` metadata line.
- Durations are compact, no spaces, no `min` word: `1m30s`, `2m`, `15m20s`.
- Fields are separated by ` | ` (space-pipe-space).

### Session format (`.wts`)

Same as a template, but each line records what actually happened, and the
file starts with a date instead of just a name.

```
# Push Day - 2026-08-21
template: push-day.wtt
unit: kg

Bench Press | 4x8 | 62.5 | felt strong
W | 40 | 10
1 | 60 | 8
2 | 60 | 8
3 | 62.5 | 8
4 | 62.5 | 7
Overhead Press | 3x9 | 30
1 | 30 | 9
2 | 30 | 9
3 | 30 | 8
Tricep Pushdown | 3x12 | 20
1 | 20 | 12
2 | 20 | 12
3 | 20 | 11
```

Rules:

- First line starting with `#` is the routine name followed by a date, e.g. `# Push Day - 2026-08-21`.
- Metadata lines are `key: value`.
- `unit:` sets the weight unit for the file.
- `template:` names the `.wtt` file this session followed, e.g. `template: push-day.wtt`.
- `description:` is a free-text summary of the session.
- Blank lines are ignored.
- Exercise lines are `Name | SetsxReps | Weight | note`.
- Weight is a bare number (`60`, not `60kg`).
- The trailing field on an exercise line is a free-text note, not a rest duration.
- Each working set gets its own line right after the exercise line: `Label | Weight | Reps`.
- `Label` is `1`, `2`, ... for a working set — one line is required per working set.
- `Label` is `W` for an optional warm-up set.
- Fields are separated by ` | ` (space-pipe-space).

### Design goals

- No nesting, no required schema validation to get started.
- Easy to parse line-by-line in any language.

## Status

Version 1.0.0
Feedback and PRs welcome
