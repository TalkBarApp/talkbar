/** Background colour profiles. Each has a light and a muted dark version (global.css, "Shot frame"). */
export const SHOT_FRAME_PROFILES = ['sky', 'peach', 'mint', 'sun', 'lavender', 'rose'] as const;
export type ShotFrameProfile = (typeof SHOT_FRAME_PROFILES)[number];
