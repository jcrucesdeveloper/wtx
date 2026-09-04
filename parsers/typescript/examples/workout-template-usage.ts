import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { WorkoutExercise, WorkoutTemplate, WtxParser } from "../src/index.ts";

const here = dirname(fileURLToPath(import.meta.url));
const templateText = readFileSync(join(here, "leg-day.wtt"), "utf8");

const workout: WorkoutTemplate = WtxParser.parseTemplate(templateText);

// General information
workout.name; // "Leg Day"
workout.unit; // "kg"
workout.notes; // "Quads, hamstrings, and glutes."
workout.tags; // string[]
workout.totalTime; // seconds (timed exercises + prescribed rest)
workout.totalTimeHumanReadable; // "18m"
workout.exerciseCount; // 6
workout.estimatedVolume; // sets × reps × weight, summed
workout.muscleGroupsCovered; // string[]

const firstExercise: WorkoutExercise = workout.exercises[0];

// Information for a single exercise
firstExercise.name; // "Squat"
firstExercise.sets; // 4
firstExercise.targetReps; // 6
firstExercise.targetWeight; // 80
firstExercise.restSeconds; // 150
firstExercise.muscleGroup; // string | undefined

console.log(`${workout.name} — ${workout.exerciseCount} exercises, ~${workout.totalTimeHumanReadable}`);
console.log(`Estimated volume: ${workout.estimatedVolume} ${workout.unit ?? ""}`);
for (const exercise of workout.exercises) {
  console.log(`  ${exercise.name}: ${exercise.sets}×${exercise.targetReps ?? "-"} @ ${exercise.targetWeight ?? "BW"}`);
}
