CREATE TABLE `registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`whatsapp` text NOT NULL,
	`age` integer NOT NULL,
	`city` text,
	`class_id` text NOT NULL,
	`reading_level` text NOT NULL,
	`notes` text,
	`wave` integer NOT NULL,
	`paid` integer DEFAULT false NOT NULL,
	`paid_at` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	CONSTRAINT "registrations_class_check" CHECK("registrations"."class_id" in ('tahsin', 'tajwid', 'tahfidz'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_wave_whatsapp_idx` ON `registrations` (`wave`,`whatsapp`);