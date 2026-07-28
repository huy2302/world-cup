export type FormationType = "4-2-3-1" | "4-3-3" | "4-1-2-1-2" | "3-5-2" | "5-2-1-2";

export type CardSeason = "24TOTS" | "ICON" | "World Legend" | "CC" | "LN" | "SPL" | "BTB";

export interface FootballPlayer {
  id: string;
  name: string;
  shortName: string;
  portrait: string;
  overall: number;
  position: "GK" | "LB" | "CB" | "RB" | "LWB" | "RWB" | "CDM" | "CM" | "CAM" | "LM" | "RM" | "LW" | "RW" | "ST" | "CF";
  club: string;
  clubLogo: string;
  nationality: string;
  nationalityFlag: string;
  season: CardSeason;
  cardLevel: number; // e.g. 5 (+5 gold), 8 (+8), 10
  preferredFoot: "Left" | "Right";
  weakFoot: number; // 1-5
  skillMoves: number; // 1-5
  height: string;
  weight: string;
  workRate: string; // e.g. "High/Med"
  traits: string[];
  attributes: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
}

export interface TacticalSquad {
  formation: FormationType;
  teamValue: string;
  chemistry: number;
  startingXI: {
    slotPosition: string; // e.g., "ST", "CAM", "LCDM"
    player: FootballPlayer;
  }[];
  substitutes: FootballPlayer[];
}

export interface Competitor {
  id: string;
  nickname: string;
  fconlineUid?: string;
  teamName: string;
  clubLogo: string;
  avatar: string;
  rank: string; // e.g. "Super Champions #12"
  overallRating: number;
  squad: TacticalSquad;
}

export type MatchStatus = "UPCOMING" | "LIVE" | "FINISHED";

export interface Match {
  id: string;
  matchNumber: number;
  round: number; // 1, 2, 3, 4, etc.
  roundName: string; // "Round of 64", "Round of 32", "Round of 16", "Quarter-Finals", "Semi-Finals", "Final"
  bracketType: "WINNERS" | "LOSERS" | "FINALS";
  homePlayer: Competitor | null;
  awayPlayer: Competitor | null;
  homeScore: number | null;
  awayScore: number | null;
  winnerId: string | null;
  status: MatchStatus;
  scheduledTime?: string;
  liveMinute?: string;
}

export type TournamentSize = 8 | 16 | 32 | 64;

export interface Tournament {
  id: string;
  title: string;
  subtitle: string;
  status: "REGISTRATION" | "IN_PROGRESS" | "COMPLETED";
  currentRound: string;
  size: TournamentSize;
  prizePool: string;
  startDate: string;
  matches: Match[];
  registeredPlayers: Competitor[];
}
