const { build } = require('esbuild');

build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  outdir: 'dist',
  sourcemap: true,
  external: ['pg', 'pg-hstore', 'sqlite3', 'tedious', 'pg-native'],
}).catch(() => process.exit(1));
