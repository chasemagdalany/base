import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { transformSync } from 'oxc-transform';

function transform(path: string) {
  const source = readFileSync(path, 'utf-8');
  const result = transformSync(path, source, {
    sourcemap: true,
    jsx: {
      runtime: 'automatic',
      importSource: './runtime',
    },
  });
  return result.code;
}

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(transform('./app/page.tsx'));
});

server.listen(3000, 'localhost', () => {
  console.log(`Server running at http://localhost:3000/`);
});
