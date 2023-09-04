import { createMessage, createTag } from "./api/db.js";
import { self } from "./util.js";
import { formatOutput } from "./util/formatOutput.js";

const send = (message: string) => {
  if (!process.send) throw new Error("process.send is unavailable");
  process.send(message);
};

export const command = {
  say: async (target: string, message: string, tag: string | null) => {
    const msg = await createMessage({
      server: self.server,
      target,
      nick: self.nick,
      content: message,
      self: true,
      mask: "self",
      type: "message",
    });

    if (tag) void createTag(msg, tag);
    send(`say ${target} ${await formatOutput(message)}`);
  },

  action: async (target: string, message: string, tag: string | null) => {
    const msg = await createMessage({
      server: self.server,
      target,
      nick: self.nick,
      content: message,
      self: true,
      mask: "self",
      type: "action",
    });

    if (tag) void createTag(msg, tag);
    send(`action ${target} ${await formatOutput(message)}`);
  },

  join: (target: string) => {
    send(`join ${target}`);
  },

  part: (target: string) => {
    send(`part ${target}`);
  },
};
