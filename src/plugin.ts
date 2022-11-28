import type { PluginOption } from "vite";
import { transformSync } from "@babel/core";

export default {
  name: "vite:relay",
  transform(src, id) {
    let code = src;
    let map = null;

    if (/.(t|j)sx?/.test(id) && src.includes("graphql`")) {
      const out = transformSync(src, {
        plugins: [["babel-plugin-relay"]],
        code: true,
        filename: id,
        sourceMaps: true,
      });

      if (!out?.code) {
        throw new Error(`vite-plugin-relay: Failed to transform ${id}`);
      }

      code = out.code;
      map = out.map;
    }

    return {
      code,
      map,
    };
  },
} as PluginOption;
