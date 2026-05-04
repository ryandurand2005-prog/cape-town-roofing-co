import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BqEoIEq_.mjs';
import { manifest } from './manifest_DSHP1I1t.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/submit.astro.mjs');
const _page2 = () => import('./pages/cookies.astro.mjs');
const _page3 = () => import('./pages/privacy.astro.mjs');
const _page4 = () => import('./pages/terms.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/submit.ts", _page1],
    ["src/pages/cookies.astro", _page2],
    ["src/pages/privacy.astro", _page3],
    ["src/pages/terms.astro", _page4],
    ["src/pages/index.astro", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "47fae9b2-6ab6-4448-8c88-afb6397f9d8c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
