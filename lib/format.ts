export function formatFullDate(dateString: string) {
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${weekday}, ${day}/${month}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}`;
}

export function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTemp(temp: number) {
  return `${temp}°C`;
}

export function formatHour(time: string) {
  const hour = Number(time.split(" ")[1].split(":")[0]);

  return new Date(0, 0, 0, hour).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
