import { biologySentece } from "./biology";
import { chemistrySentences } from "./chemistry";
import { physicsSentences } from "./physics";
import { poetrySentences } from "./poetry";
import { literatureSentences } from "./literature";
import { quotesSentences } from "./quotes";
import { moviesSentences } from "./movies";

export const sentences = [
  ...biologySentece, 
  ...physicsSentences, 
  ...chemistrySentences,
  ...poetrySentences,
  ...literatureSentences,
  ...quotesSentences,
  ...moviesSentences
];