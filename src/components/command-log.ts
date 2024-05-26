import { getCurrentTime } from "../utils/get-current-time";

export function createCommandLog(current_path: string, command: string) {
  const command_log = document.createElement("li");

  command_log.className = "flex gap-2";
  command_log.innerHTML = `
    <p class="flex gap-2">
      <span class="text-zinc-400">[${getCurrentTime()}]</span>
      <span class="ml-2 font-bold">${current_path}</span>
      <span class="text-zinc-400">></span>
    </p>
    <p>${command}</p>
  `;

  return command_log;
}
