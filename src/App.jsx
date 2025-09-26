import React, { useState, useEffect } from "react";
import BadgeIcon from "./components/BadgeIcon.jsx";

// Import badge SVGs
import Bronze from "./badges/Bronze.jsx";
import Silver from "./badges/Silver.jsx";
import Gold from "./badges/Gold.jsx";
import Epic from "./badges/Epic.jsx";
import Mythic from "./badges/Mythic.jsx";

// --- BADGE DEFINITIONS ---
const BADGES = {
  BUG_BOPPER: { threshold: 30, label: "Bug Bopper", color: "bg-orange-700", icon: Bronze },
  CREEPER_CRUSHER: { threshold: 40, label: "Creeper Crusher", color: "bg-orange-700", icon: Bronze },
  LANTERNFLY_SWATTER: { threshold: 50, label: "Lanternfly Swatter", color: "bg-orange-700", icon: Bronze },
  PEST_PATROLLER: { threshold: 60, label: "Pest Patroller", color: "bg-orange-700", icon: Bronze },
  BUG_BASHER: { threshold: 70, label: "Bug Basher", color: "bg-orange-700", icon: Bronze },
  SWARM_SMASHER: { threshold: 80, label: "Swarm Smasher", color: "bg-orange-700", icon: Bronze },
  INSECT_STOPPER: { threshold: 90, label: "Insect Invader Stopper", color: "bg-orange-700", icon: Bronze },
  TREE_PROTECTOR: { threshold: 100, label: "Tree Protector", color: "bg-orange-700", icon: Bronze },
  BUG_HUNTER: { threshold: 120, label: "Bug Hunter", color: "bg-orange-700", icon: Bronze },
  INFESTATION_FIGHTER: { threshold: 150, label: "Infestation Fighter", color: "bg-orange-700", icon: Bronze },

  EXTERMINATOR_ELITE: { threshold: 200, label: "Exterminator Elite", color: "bg-gray-400", icon: Silver },
  PEST_PUNISHER: { threshold: 250, label: "Pest Punisher", color: "bg-gray-400", icon: Silver },
  WING_BREAKER: { threshold: 300, label: "Wing Breaker", color: "bg-gray-400", icon: Silver },
  INSECT_NEMESIS: { threshold: 350, label: "Insect Nemesis", color: "bg-gray-400", icon: Silver },

  ECO_DEFENDER: { threshold: 400, label: "Eco Defender", color: "bg-yellow-400", icon: Gold },
  LANTERNFLY_SLAYER: { threshold: 450, label: "Lanternfly Slayer", color: "bg-yellow-400", icon: Gold },
  NATURE_GUARDIAN: { threshold: 500, label: "Nature’s Guardian", color: "bg-yellow-400", icon: Gold },
  PEST_ANNIHILATOR: { threshold: 600, label: "Pest Annihilator", color: "bg-yellow-400", icon: Gold },

  BUGSTORM_BREAKER: { threshold: 700, label: "Bugstorm Breaker", color: "bg-purple-600", icon: Epic },
  ECO_AVENGER: { threshold: 800, label: "Eco Avenger", color: "bg-purple-600", icon: Epic },
  PLANET_PROTECTOR: { threshold: 850, label: "Planet Protector", color: "bg-purple-600", icon: Epic },
  GALACTIC_HERO: { threshold: 900, label: "Galactic Hero", color: "bg-purple-600", icon: Epic },

  UNIVERSE_UNBUGGER: { threshold: 950, label: "Universe Unbugger", color: "bg-indigo-800", icon: Mythic },
  LEGENDARY_EXTERMINATOR: { threshold: 975, label: "Legendary Exterminator", color: "bg-indigo-800", icon: Mythic },
  MYTHIC_PEST_SLAYER: { threshold: 1000, label: "Mythic Pest Slayer", color: "bg-indigo-800", icon: Mythic },
};

// --- APP COMPONENT ---
export default function App() {
  const [totalKills, setTotalKills] = useState(0);
  const [dailyKills, setDailyKills] = useState(0);
  const [userBadges, setUserBadges] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  // Load from localStorage
  useEffect(() => {
    const savedTotal = parseInt(localStorage.getItem("totalKills")) || 0;
    const savedDaily = parseInt(localStorage.getItem("dailyKills")) || 0;
    const savedDate = localStorage.getItem("lastKillDate") || today;
    const savedBadges = JSON.parse(localStorage.getItem("badges")) || [];

    // Reset dailyKills if last kill was on a previous day
    setDailyKills(savedDate === today ? savedDaily : 0);
    setTotalKills(savedTotal);
    setUserBadges(savedBadges);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("totalKills", totalKills);
    localStorage.setItem("dailyKills", dailyKills);
    localStorage.setItem("lastKillDate", today);
    localStorage.setItem("badges", JSON.stringify(userBadges));
  }, [totalKills, dailyKills, userBadges]);

  const handleKill = () => {
    const newDaily = dailyKills + 1;
    const newTotal = totalKills + 1;

    setDailyKills(newDaily);
    setTotalKills(newTotal);

    // Award badges
    const newEarned = [];
    Object.keys(BADGES).forEach((key) => {
      if (newTotal >= BADGES[key].threshold && !userBadges.includes(key)) {
        newEarned.push(key);
      }
    });

    if (newEarned.length > 0) {
      setUserBadges([...userBadges, ...newEarned]);
    }
  };

  const handleReset = () => {
    setDailyKills(0);
    setTotalKills(0);
    setUserBadges([]);
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-between p-4 font-sans">
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-500">Splat the Fly</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Spotted Lanternfly Counter</p>
      </header>

      <main className="flex flex-col items-center flex-grow w-full">
        {/* Scoreboard */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-10 w-full max-w-md">
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">Today's Kills</p>
            <p className="text-6xl font-bold text-red-600 dark:text-red-500">{dailyKills}</p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">Total Kills</p>
            <p className="text-6xl font-bold">{totalKills}</p>
          </div>
        </div>

        {/* Kill Button */}
        <button
          onClick={handleKill}
          className="w-48 h-48 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform duration-150 active:scale-90 focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-600 mb-6"
        >
          <span className="text-4xl font-bold">🪰</span>
        </button>
        <p className="text-xl font-medium mb-8">Tap to splat!</p>

        {/* Badges */}
        {userBadges.length > 0 && (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">Your Badges</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {userBadges.map((key) => (
                <div key={key} className="flex flex-col items-center gap-2">
                  <BadgeIcon color={BADGES[key].color} Icon={BADGES[key].icon} />
                  <span className="font-semibold text-center">{BADGES[key].label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full text-center mt-8">
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 underline transition-colors"
        >
          Reset Total Kills
        </button>
      </footer>
    </div>
  );
}