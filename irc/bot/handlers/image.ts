import debug from "debug";

import { ai } from "../api/ai.js";
import { outputBase64ToImage } from "../api/file.js";
import { command } from "../command.js";
import type { BotEvent, ImageEvent } from "../types.js";
import { getClown } from "../util.js";
import { type Model } from "@prisma/client";

const log = debug("pIRCe:image");

export async function image(botEvent: BotEvent) {
  try {
    const imageEvent = createImageEvent(botEvent);
    const { route, options, model } = imageEvent;

    const result = await ai.image({ ...botEvent, model });
    if (result instanceof Error) throw result;

    if ("error" in result && !result.result) {
      const msg = `OpenAI sez: ${result.error} ${getClown()}`;
      const target = route.overrideOutputTarget ?? botEvent.message.target;
      void command.say(target, msg, null);
      return;
    }

    const { outputFileURLTemplate } = options;
    const fileID = await outputBase64ToImage(result.result);
    const fileURL = outputFileURLTemplate.replace("%", fileID);

    log("image: %s", fileURL);

    const target = route.overrideOutputTarget ?? botEvent.message.target;
    void command.say(target, fileURL, null);
  } catch (error) {
    log(error);
  }
}

function createImageEvent(botEvent: BotEvent): ImageEvent {
  if ("model" in botEvent.route) {
    const model = botEvent.route.model as Model;
    return { ...botEvent, model };
  } else {
    log(botEvent);
    throw new Error("BotEvent missing model");
  }
}
