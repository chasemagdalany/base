import { transformSync } from "oxc-transform";
import { readFileSync, watch } from "node:fs";
import { log } from "console"
import { createServer } from "node:http"

function transform(path: string) {
  let ls = ""
  watch(path, (type) => {
    if (type === "change") {
      const source = readFileSync(path, "utf-8")
      if (source === ls) return;
      ls = source
      const result = transformSync(path, source, {
        sourcemap: true,
        jsx: {
          importSource: "react",
          pragma: "React.createElement",
          pragmaFrag: "React.Fragment",
        },
      });
      return result.code
    }
  })
  const source = readFileSync(path, "utf-8")
  const result = transformSync(path, source, {
    sourcemap: true,
    jsx: {
      importSource: "react",
      pragma: "React.createElement",
      pragmaFrag: "React.Fragment",
    },
  });
  return result.code
}

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(transform("./app/page.tsx"));
});

server.listen(3000, "localhost", () => {
  console.log(`Server running at http://localhost:3000/`);
});