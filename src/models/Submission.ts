import { Schema, model } from "mongoose";
import type { SubmissionDoc } from "../types/index";

const submissionSchema = new Schema<SubmissionDoc>({
  // Holds the _id of a User document; ref says which collection it points into.
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseCode: {
    type: String,
    required: [true, "courseCode is required"],
    uppercase: true,
    trim: true,
  },

  // The same rule Session 8's Zod .refine() enforces in the browser, now
  // enforced here as well. The browser check is a courtesy; this is the rule.
  repoUrl: {
    type: String,
    required: [true, "repoUrl is required"],
    match: [/^https:\/\/github\.com\/.+/, "repoUrl must start with https://github.com/"],
  },

  submittedAt: { type: Date, default: Date.now },

  // Optional in the interface, so no `required` here. An interface can say
  // "a number"; only a schema can say "a number between 0 and 100".
  score: { type: Number, min: 0, max: 100 },
});

// The frontend (src/types/index.ts ApiSubmission) reads `id`, a string, and
// ISO date strings. This transform closes the gap between Mongo's _id and it.
submissionSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Submission = model<SubmissionDoc>("Submission", submissionSchema);
