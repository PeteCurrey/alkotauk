import { getLobbyArticles, getLobbyResources } from '@/lib/lobby';
import AskTheLobbyHero from '@/components/lobby/AskTheLobbyHero';
import LatestIntelligence from '@/components/lobby/LatestIntelligence';
import RegulatoryWatch from '@/components/lobby/RegulatoryWatch';
import IndustryNews from '@/components/lobby/IndustryNews';
import TrainingAndLearning from '@/components/lobby/TrainingAndLearning';
import IndustryEvents from '@/components/lobby/IndustryEvents';
import IndustryHubs from '@/components/lobby/IndustryHubs';
import MessQuestLobbySection from '@/components/lobby/MessQuestLobbySection';
import TechnicalLibrary from '@/components/lobby/TechnicalLibrary';
import LobbyTools from '@/components/lobby/LobbyTools';
import LobbyBrief from '@/components/lobby/LobbyBrief';

export const revalidate = 3600; // 1 hour ISR

export default async function LobbyHubPage() {
  const [articles, resources] = await Promise.all([
    getLobbyArticles(),
    getLobbyResources(),
  ]);

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A18] font-normal selection:bg-[#FF6900] selection:text-white">
      {/* 01. FULL-PAGE LOBBY HERO + ASK THE LOBBY AI */}
      <AskTheLobbyHero />

      {/* 02. LATEST INTELLIGENCE (EDITORIAL LEAD STORY & DISPATCHES) */}
      <div id="latest">
        <LatestIntelligence articles={articles} />
      </div>

      {/* 03. REGULATORY WATCH (ENVIRONMENT AGENCY & BS EN 858 TRACKER) */}
      <div id="regulatory">
        <RegulatoryWatch />
      </div>

      {/* 04. INDUSTRY NEWS & MARKET DEVELOPMENTS */}
      <IndustryNews />

      {/* 05. TRAINING & PROFESSIONAL LEARNING */}
      <div id="training">
        <TrainingAndLearning />
      </div>

      {/* 06. INDUSTRY EVENTS & FIELD DEMO CALENDAR */}
      <div id="events">
        <IndustryEvents />
      </div>

      {/* 07. APPLICATION & INDUSTRY HUBS */}
      <IndustryHubs />

      {/* 08. FROM THE FIELD / MESS QUEST DOCUMENTARY */}
      <MessQuestLobbySection />

      {/* 09. TECHNICAL LIBRARY & DOWNLOADS */}
      <div id="technical">
        <TechnicalLibrary resources={resources} />
      </div>

      {/* 10. THE SPEC DESK & ENGINEERING TOOLS */}
      <LobbyTools />

      {/* 11. THE LOBBY BRIEF WEEKLY DISPATCH */}
      <LobbyBrief />
    </div>
  );
}
