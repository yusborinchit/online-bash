export function createErrorLog(error_message: string) {
  const error_log = document.createElement("li");

  error_log.className = "flex gap-2";
  error_log.innerHTML = `
    <span class="grid place-items-center bg-red-600 text-zinc-950">
      [Error]
    </span>
    <p class="text-red-600">${error_message}</p>
  `;

  return error_log;
}
