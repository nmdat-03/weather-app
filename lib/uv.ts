export function getUvInfo(uv: number) {
  if (uv <= 2)
    return {
      label: "Low",
      color: "bg-green-500",
      textColor: "text-green-500",
      description: "Minimal risk from sun exposure.",
    };

  if (uv <= 5)
    return {
      label: "Moderate",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      description: "Some protection recommended.",
    };

  if (uv <= 7)
    return {
      label: "High",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      description: "Protection is required.",
    };

  if (uv <= 10)
    return {
      label: "Very High",
      color: "bg-red-500",
      textColor: "text-red-500",
      description: "Extra protection is strongly recommended.",
    };

  return {
    label: "Extreme",
    color: "bg-purple-500",
    textColor: "text-purple-500",
    description: "Avoid direct sunlight whenever possible.",
  };
}
