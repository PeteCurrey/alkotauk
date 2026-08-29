/**
 * Mess Quest — Official Playlist Constants
 * 
 * The canonical source of all Mess Quest episode content is the official
 * Alkota YouTube playlist. Do NOT fabricate episode data.
 */

export const MESS_QUEST_PLAYLIST_ID = 'PLKaGYY0CshvoC0ES9SQh7gqjF5p79V43N';
export const MESS_QUEST_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${MESS_QUEST_PLAYLIST_ID}`;
export const MESS_QUEST_EMBED_URL = `https://www.youtube-nocookie.com/embed/videoseries?list=${MESS_QUEST_PLAYLIST_ID}&rel=0&modestbranding=1`;

/**
 * Legacy type kept for any admin tooling that may reference it.
 */
export type MessQuestEpisode = {
  id: number;
  slug: string;
  youtubeId: string;
  title: string;
  subtitle: string;
  description: string;
  machine: string;
  industry: string;
  operatingSpec: string;
  duration: string;
  location: string;
};

/**
 * Episode data is managed via the official YouTube playlist.
 * See MESS_QUEST_PLAYLIST_URL above.
 */
export const messQuestEpisodes: MessQuestEpisode[] = [];
