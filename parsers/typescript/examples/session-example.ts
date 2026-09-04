import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { WorkoutParser, WorkoutSession, WorkoutSessionExercise } from "../src/index.ts";

const here = dirname(fileURLToPath(import.meta.url));
const sessionText = readFileSync(join(here, "leg-day-2026-08-20.wts"), "utf8");

const session: WorkoutSession = WorkoutParser.parseSession(sessionText);

// General information
session.name; // "Leg Day"
session.date; // "2026-08-20"
session.template; // "leg-day.wtt"
session.unit; // "kg"
session.notes; // string | undefined
session.exerciseCount; // 6
session.totalWorkingSets; // 20
session.totalReps; // 214
session.totalVolume; // actual weight × reps, summed
session.isComplete; // true

const firstExercise: WorkoutSessionExercise = session.exercises[0];

// Information for a single exercise
firstExercise.name; // "Squat"
firstExercise.sets; // 4  (planned)
firstExercise.reps; // 6  (planned)
firstExercise.weight; // 80 (planned)
firstExercise.note; // "good depth"
firstExercise.loggedSets; // SessionSet[] (warm-ups included)
firstExercise.workingSets; // SessionSet[]
firstExercise.volume; // actual volume for this exercise
firstExercise.topSet; // heaviest logged working set

console.log(`${session.name} — ${session.date} (${session.exerciseCount} exercises)`);
console.log(
  `Total volume: ${session.totalVolume} ${session.unit ?? ""} over ${session.totalWorkingSets} sets, ` +
    `${session.totalReps} reps${session.isComplete ? "" : " (incomplete)"}`,
);
for (const exercise of session.exercises) {
  const top = exercise.topSet;
  console.log(
    `  ${exercise.name}: ${exercise.workingSets.length}/${exercise.sets} sets` +
      (top ? `, top ${top.weight}×${top.reps}` : ""),
  );
}
