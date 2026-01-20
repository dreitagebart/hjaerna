import { App, LogLevel } from "@slack/bolt";
import { config } from "./config";

export const app = new App({
  token: config.slack.botToken,
  appToken: config.slack.appToken,
  logLevel: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.ERROR,
  socketMode: true,
});
