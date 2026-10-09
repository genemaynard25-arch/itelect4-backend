import type { Types } from "mongoose";

// FROM SESSION 1: the three interfaces, copied from itelect4-project-IT4B's
// src/types/index.ts. The schemas in src/models/ are these interfaces again,
// written a second time in a form the database can enforce.

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor"; // only these values
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number; // ? means this field is optional
}

// ---------------------------------------------------------------------
// What the database actually stores.
//
// Session 1 wrote `id: number` because there was no database yet. MongoDB
// numbers rows itself, with a 24-character hex string, so every id here is
// a string. Both types are DERIVED from the interface with Omit (Session 2),
// so Submission stays the single source of truth.
// ---------------------------------------------------------------------

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

// studentId is an ObjectId, not a string. It only becomes a string when the
// document is turned into JSON.
export type SubmissionDoc = Omit<Submission, "id" | "studentId"> & {
  studentId: Types.ObjectId;
};

// The body a client sends to create one. The server reads studentId off the
// token instead of trusting the request.
export type NewSubmissionBody = Pick<Submission, "courseCode" | "repoUrl">;
