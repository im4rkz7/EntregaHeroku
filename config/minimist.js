import minimist from "minimist";

const args = minimist(process.argv.slice(2));

export const configMinimist = {
  puerto: args.p ?? 8080,
  modo: args.m ?? "fork",
};
