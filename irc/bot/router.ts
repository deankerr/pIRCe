import debug from "debug";

import type { EventMessage } from "./types.js";
import {
  createMessage,
  getOptions,
  getRoutesForTarget,
  getModel,
} from "./api/db.js";
import { admin } from "./routes/admin.js";
import { chat } from "./routes/chat.js";
import { image } from "./routes/image.js";
import { self } from "./util.js";

const log = debug("pIRCe:router");

const handlers = {
  chat,
  image,
  admin,
};

export async function router(message: EventMessage) {
  const msg = await createMessage(message);

  // don't route our own messages
  if (msg.self) return;

  const options = await getOptions();

  // relevant routes
  const routes = await getRoutesForTarget(msg.server, msg.target);

  const validRoutes = routes.filter((route) => {
    // fail if keyword not set
    if (route.keyword === null) return false;

    const keyword = route.keyword.replace("%nick", self.nick);

    if (route.startsWithKeyword) {
      if (msg.content.startsWith(keyword + " ")) return true;
    }

    if (route.mentionsKeyword) {
      // is word reasonably mentioned in message
      const mentions = new RegExp(`(^|\\s)${keyword}([.,!?:;\\s]|$)`);
      if (mentions.test(keyword)) return true;
    }

    return false;
  });

  if (validRoutes.length > 0) {
    log(
      "matched: %O",
      validRoutes.map((r) => `${r.handler}/${r.profileID}`),
    );
  }

  // TODO figure this out
  for (const route of validRoutes) {
    if (route.handler === "admin") return admin(msg);
    if (route.handler === "image")
      return handlers.image({ route, message: msg, options });

    const { profile } = route;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const chatModel = profile?.modelID ? await getModel(profile.modelID) : null;

    if (profile && chatModel) {
      const botEvent = {
        route,
        profile,
        chatModel,
        message: msg,
        options,
      };
      void handlers.chat(botEvent);
    } else {
      log(
        "invalid route: handler %o profile %o chatModel: %o",
        route.handler,
        profile,
        chatModel,
      );
    }
  }
}
