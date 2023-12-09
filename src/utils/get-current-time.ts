export function getCurrentTime() {
  return new Date().toLocaleTimeString("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
