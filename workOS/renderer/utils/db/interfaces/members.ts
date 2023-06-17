export interface I_MembersModel {
  name: string;
  _id: string | number;
  created_at: Date;
  email?: string;
  role?: string;
  status: "active" | "paused" | "vacation";
  age?: string;
  avatar?: string;
  ctc: string;
  title: string;
}
