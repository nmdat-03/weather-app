export function getAirQualityInfo(index: number) {
  switch (index) {
    case 1:
      return {
        label: "Good",
        color: "bg-green-500",
        textColor: "text-green-500",
        description: "Air quality is satisfactory.",
      };

    case 2:
      return {
        label: "Moderate",
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
        description: "Acceptable for most people.",
      };

    case 3:
      return {
        label: "Sensitive",
        color: "bg-orange-500",
        textColor: "text-orange-500",
        description: "Sensitive groups may experience effects.",
      };

    case 4:
      return {
        label: "Unhealthy",
        color: "bg-red-500",
        textColor: "text-red-500",
        description: "Some health effects may occur.",
      };

    case 5:
      return {
        label: "Very Unhealthy",
        color: "bg-purple-500",
        textColor: "text-purple-500",
        description: "Health warnings for everyone.",
      };

    case 6:
      return {
        label: "Hazardous",
        color: "bg-rose-700",
        textColor: "text-rose-700",
        description: "Emergency conditions. Avoid outdoor activities.",
      };

    default:
      return {
        label: "Unknown",
        color: "bg-gray-500",
        description: "",
      };
  }
}
