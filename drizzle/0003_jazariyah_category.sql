CREATE TABLE `__new_lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`summary` text NOT NULL,
	`arabic_text` text,
	`content` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	CONSTRAINT "lessons_category_check" CHECK("__new_lessons"."category" in ('tilawah', 'tajwid', 'tahfidz', 'jazariyah'))
);
--> statement-breakpoint
INSERT INTO `__new_lessons`("id", "slug", "title", "category", "summary", "arabic_text", "content", "position", "published", "created_at", "updated_at") SELECT "id", "slug", "title", "category", "summary", "arabic_text", "content", "position", "published", "created_at", "updated_at" FROM `lessons`;--> statement-breakpoint
DROP TABLE `lessons`;--> statement-breakpoint
ALTER TABLE `__new_lessons` RENAME TO `lessons`;--> statement-breakpoint
CREATE UNIQUE INDEX `lessons_slug_unique` ON `lessons` (`slug`);--> statement-breakpoint
CREATE INDEX `lessons_category_position_idx` ON `lessons` (`category`,`position`);