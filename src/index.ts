import { Plugin, registerPlugin } from "enmity-api/plugins";
import Manifest from "./manifest.json";
import { getByProps, getModule } from "enmity-api/modules";
import { create } from "enmity-api/patcher";

const MessagesModule = getByProps("sendMessage");
const UploadsModule = getByProps("uploadLocalFiles");

const Patcher = create("embed-fail-fixup");

const EmbedFailFixup: Plugin = {
  ...Manifest,
  patches: [],

  onStart() {

    Patcher.before(MessagesModule, "sendMessage", (_, args, __) => {
      args[1].content = args[1].content.replaceAll("media.discordapp.net", "cdn.discordapp.com")
    });

    Patcher.before(UploadsModule, "uploadLocalFiles", (_, args, __) => {
      args[3].content = args[3].content.replaceAll("media.discordapp.net", "cdn.discordapp.com")
    });
  },

  onStop() {
    Patcher.unpatchAll()
  }
}

registerPlugin(EmbedFailFixup);
