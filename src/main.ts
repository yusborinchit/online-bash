import { bash_form, bash_input } from "./consts/dom-elements";
import { handleFormSubmit } from "./handlers/form-submit";
import { handleInputBlur } from "./handlers/input-blur";

bash_input.addEventListener("blur", handleInputBlur);
bash_form.addEventListener("submit", handleFormSubmit);
