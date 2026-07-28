"use server";
import { db } from "@/lib/db";
import { comparePassword, createToken, hashPassword, removeSessionCookie, setSessionCookie, getSession } from "@/lib/auth";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "@/lib/zod-schemas";

export async function loginUser(input: LoginInput) {
  const parse = loginSchema.safeParse(input);
  if (!parse.success) {
    return { error: parse.error.issues[0].message };
  }

  const { username, password } = parse.data;
  const user = await db.user.findFirst({
    where: {
      OR: [{ username }, { email: username }],
    },
  });

  if (!user) {
    return { error: "Invalid username or password" };
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    return { error: "Invalid username or password" };
  }

  const token = await createToken({
    id: user.id,
    username: user.username,
    role: user.role as "ADMIN" | "PLAYER",
    ign: user.ign,
  });

  await setSessionCookie(token);

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      ign: user.ign,
      avatarUrl: user.avatarUrl,
    },
  };
}

export async function registerUser(input: RegisterInput) {
  const parse = registerSchema.safeParse(input);
  if (!parse.success) {
    return { error: parse.error.issues[0].message };
  }

  const data = parse.data;

  const existing = await db.user.findFirst({
    where: {
      OR: [{ username: data.username }, { email: data.email }],
    },
  });

  if (existing) {
    return { error: "Username or Email already registered" };
  }

  const passwordHash = await hashPassword(data.password);

  const newUser = await db.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash,
      role: data.role || "PLAYER",
      ign: data.ign,
      discordTag: data.discordTag,
      squadValue: BigInt(data.squadValue || 1000000000),
      favoriteClub: data.favoriteClub || "Real Madrid",
    },
  });

  const token = await createToken({
    id: newUser.id,
    username: newUser.username,
    role: newUser.role as "ADMIN" | "PLAYER",
    ign: newUser.ign,
  });

  await setSessionCookie(token);

  return {
    success: true,
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      ign: newUser.ign,
    },
  };
}

export async function logoutUser() {
  await removeSessionCookie();
  return { success: true };
}

export async function getCurrentUser() {
  return getSession();
}
