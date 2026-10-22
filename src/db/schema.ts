import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from "drizzle-orm/sqlite-core";
import { lessonCategories } from "../lib/categories";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    role: text("role", { enum: ["user", "admin"] }).notNull().default("user"),
    passwordHash: text("password_hash"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`)
  },
  (table) => [check("users_role_check", sql`${table.role} in ('user', 'admin')`)]
);

export const userProfiles = sqliteTable("user_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  arabicFontScale: integer("arabic_font_scale").notNull().default(100),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
});

export const sessions = sqliteTable(
  "sessions",
  {
    // SHA-256 of the session token; the raw token only lives in the cookie.
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`)
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)]
);

export const lessons = sqliteTable(
  "lessons",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    category: text("category", { enum: lessonCategories }).notNull(),
    summary: text("summary").notNull(),
    arabicText: text("arabic_text"),
    content: text("content").notNull(),
    position: integer("position").notNull().default(0),
    published: integer("published", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`)
  },
  (table) => [
    check("lessons_category_check", sql`${table.category} in ('tilawah', 'tajwid', 'tahfidz')`),
    index("lessons_category_position_idx").on(table.category, table.position)
  ]
);

// Mushaf data imported from the Kemenag dataset (scripts/import-quran.mjs).
export const surahs = sqliteTable(
  "surahs",
  {
    number: integer("number").primaryKey(),
    nameArabic: text("name_arabic").notNull(),
    nameLatin: text("name_latin").notNull(),
    transliteration: text("transliteration").notNull(),
    translation: text("translation").notNull(),
    ayahCount: integer("ayah_count").notNull(),
    location: text("location", { enum: ["Makkiyah", "Madaniyah"] }).notNull(),
    page: integer("page").notNull(),
    introduction: text("introduction")
  },
  (table) => [check("surahs_location_check", sql`${table.location} in ('Makkiyah', 'Madaniyah')`)]
);

export const ayahs = sqliteTable(
  "ayahs",
  {
    // Sequential ayah number across the whole mushaf (1–6236).
    id: integer("id").primaryKey(),
    surahNumber: integer("surah_number")
      .notNull()
      .references(() => surahs.number, { onDelete: "cascade" }),
    number: integer("number").notNull(),
    juz: integer("juz").notNull(),
    page: integer("page").notNull(),
    arabic: text("arabic").notNull(),
    latin: text("latin").notNull(),
    translation: text("translation").notNull(),
    footnotes: text("footnotes"),
    tafsirWajiz: text("tafsir_wajiz"),
    tafsirTahlili: text("tafsir_tahlili")
  },
  (table) => [uniqueIndex("ayahs_surah_number_idx").on(table.surahNumber, table.number)]
);

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(userProfiles)
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id]
  })
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserProfile = typeof userProfiles.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;
export type Surah = typeof surahs.$inferSelect;
export type Ayah = typeof ayahs.$inferSelect;
