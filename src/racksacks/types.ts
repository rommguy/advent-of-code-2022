// add additional non-letter characters to this union as desired
import { UpperCaseCharacter } from "../types";

export type Character = UpperCaseCharacter | Lowercase<UpperCaseCharacter>;
