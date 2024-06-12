import { createCommandLog } from "./components/command-log";
import { createHelpLog } from "./components/help-log";
import { bash_form, bash_input, bash_logs } from "./consts/dom-elements";
import { handleFormSubmit } from "./handlers/form-submit";
import { handleInputBlur } from "./handlers/input-blur";
import { handleInputKeyDown } from "./handlers/input-key-down";

bash_logs.appendChild(createCommandLog("$", "help"));
bash_logs.append(createHelpLog());

bash_form.addEventListener("submit", handleFormSubmit);
bash_input.addEventListener("blur", handleInputBlur);
bash_input.addEventListener("keydown", handleInputKeyDown);
