import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ign: z.string().min(2, "FC Online Coach Name is required"),
  discordTag: z.string().optional(),
  squadValue: z.number().min(0, "Squad value cannot be negative").default(1000000000),
  favoriteClub: z.string().optional().default("Real Madrid"),
  role: z.enum(["PLAYER", "ADMIN"]).default("PLAYER"),
});

export const tournamentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  format: z.enum(["SINGLE_ELIMINATION", "DOUBLE_ELIMINATION", "GROUP_STAGE", "ROUND_ROBIN", "SWISS"]),
  maxPlayers: z.number().min(4).max(128),
  prizePool: z.string().min(2, "Prize pool info required"),
  rules: z.string().min(10, "Rules must be specified"),
  bannerUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required"),
  checkInMinutes: z.number().min(5).max(180).default(30),
});

export const matchScoreSchema = z.object({
  matchId: z.string(),
  homeScore: z.number().min(0).max(99),
  awayScore: z.number().min(0).max(99),
  proofUrl: z.string().optional(),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.input<typeof registerSchema>;
export type TournamentInput = z.input<typeof tournamentSchema>;
export type MatchScoreInput = z.infer<typeof matchScoreSchema>;
