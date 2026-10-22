CREATE TABLE `ayahs` (
	`id` integer PRIMARY KEY NOT NULL,
	`surah_number` integer NOT NULL,
	`number` integer NOT NULL,
	`juz` integer NOT NULL,
	`page` integer NOT NULL,
	`arabic` text NOT NULL,
	`latin` text NOT NULL,
	`translation` text NOT NULL,
	`footnotes` text,
	`tafsir_wajiz` text,
	`tafsir_tahlili` text,
	FOREIGN KEY (`surah_number`) REFERENCES `surahs`(`number`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ayahs_surah_number_idx` ON `ayahs` (`surah_number`,`number`);--> statement-breakpoint
CREATE TABLE `surahs` (
	`number` integer PRIMARY KEY NOT NULL,
	`name_arabic` text NOT NULL,
	`name_latin` text NOT NULL,
	`transliteration` text NOT NULL,
	`translation` text NOT NULL,
	`ayah_count` integer NOT NULL,
	`location` text NOT NULL,
	`page` integer NOT NULL,
	`introduction` text,
	CONSTRAINT "surahs_location_check" CHECK("surahs"."location" in ('Makkiyah', 'Madaniyah'))
);
