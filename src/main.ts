import { bash_form, bash_input } from "./consts/dom-elements";
import { handleFormSubmit } from "./handlers/form-submit";
import { handleInputBlur } from "./handlers/input-blur";
import { handleInputKeyDown } from "./handlers/input-key-down";

bash_form.addEventListener("submit", handleFormSubmit);

bash_input.addEventListener("blur", handleInputBlur);
bash_input.addEventListener("keydown", handleInputKeyDown);
