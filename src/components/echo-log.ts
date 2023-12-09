export function createEchoLog(text: string) {
  const echo_log = document.createElement("li");

  echo_log.innerHTML = `
    <p>${text}</p>
  `;

  return echo_log;
}
