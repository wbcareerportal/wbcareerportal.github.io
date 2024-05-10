// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// this is also necessary for GitHub Pages to deploy correctly
export const prerender = true;
export const ssr = false;