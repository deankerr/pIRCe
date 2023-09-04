import debug from "debug";

import type { EventMessage } from "./types.js";
import { createMessage, getOptions, getRoutesForTarget } from "./api/db.js";
import { admin } from "./handlers/admin.js";
import { chat } from "./handlers/chat.js";
import { image } from "./handlers/image.js";
import { self } from "./util.js";

const log = debug("pIRCe:router");

export async function router(ircMessage: EventMessage) {
  const message = await createMessage(ircMessage);

  // don't route our own messages
  if (message.self) return;

  const options = await getOptions();

  // relevant routes
  const routes = await getRoutesForTarget(message.server, message.target);

  const validRoutes = routes.filter((route) => {
    // fail if keyword not set
    if (route.keyword === null) return false;

    const keyword = route.keyword.replace("%nick", self.nick);

    if (route.startsWithKeyword) {
      if (message.content.startsWith(keyword + " ")) return true;
    }

    if (route.mentionsKeyword) {
      // is word reasonably mentioned in message
      const mentions = new RegExp(`(^|\\s)${keyword}([.,!?:;\\s]|$)`);
      if (mentions.test(keyword)) return true;
    }

    return false;
  });

  if (validRoutes.length === 0) return;

  for (const route of validRoutes) {
    const botEvent = {
      route,
      message: message,
      options,
    };

    switch (route.handler) {
      case "admin":
        admin(botEvent);
        break;
      case "chat":
        void chat(botEvent);
        break;
      case "image":
        void image(botEvent);
        break;
      default:
        log(`Unsupported handler: ${route.id} ${route.handler}`);
    }
  }
}
