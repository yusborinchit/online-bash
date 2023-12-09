import { type BashItem } from "../models/bash-items/bash-item";
import { Directory } from "../models/bash-items/directory";

function createLsRow(ls_item: BashItem) {
  const permissions = ls_item.getPermissions();
  const type = ls_item instanceof Directory ? "Directory" : "File";
  const name = ls_item.getName();

  return `
    <li class="grid ml-[4ch] gap-[8ch] grid-cols-[5ch_12ch_auto] max-w-[80ch]">
      <span class="text-zinc-400">--${permissions}</span>
      <span class="text-zinc-400">${type}</span>
      <span>${name}</span>
    </li>
  `;
}

export function createLsLog(ls_info: BashItem[]) {
  const ls_log = document.createElement("ul");

  ls_log.className = "flex flex-col";
  ls_log.innerHTML = `
    ${ls_info.map((ls_item) => createLsRow(ls_item)).join("")}
  `;

  return ls_log;
}
