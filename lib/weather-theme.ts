export function getWeatherGradient(condition: string) {
  const text = condition.toLowerCase();

  if (text.includes("snow") || text.includes("blizzard")) {
    return "bg-linear-to-b from-cyan-100 via-slate-100 to-white";
  }

  if (
    text.includes("rain") ||
    text.includes("drizzle") ||
    text.includes("shower") ||
    text.includes("thunder") ||
    text.includes("storm")
  ) {
    return "bg-linear-to-b from-sky-900 via-slate-700 to-slate-500";
  }

  return "bg-linear-to-b from-sky-500 via-sky-400 to-sky-300";
}
