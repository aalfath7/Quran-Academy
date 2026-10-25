"use client";

import { emptyProgress, parseProgress, PRACTICE_PROGRESS_KEY } from "@/lib/practice-progress";
import { createLocalStore } from "../use-local-store";

/** Practice progress saved automatically in this browser; it renders empty on the server and fills in after hydration. */
export const usePracticeProgress = createLocalStore(PRACTICE_PROGRESS_KEY, parseProgress, emptyProgress);
