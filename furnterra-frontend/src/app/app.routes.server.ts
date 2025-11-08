import { RenderMode, ServerRoute } from '@angular/ssr';

// Use prerender only for truly static routes.
// Dynamic parameterized routes render on the server at runtime.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },

  // List pages often depend on runtime data; render on server.
  { path: 'products', renderMode: RenderMode.Server },
  { path: 'blogs', renderMode: RenderMode.Server },

  // Parameterized routes must not prerender without getPrerenderParams.
  { path: 'profile/:id', renderMode: RenderMode.Server },
  { path: 'collections/:category', renderMode: RenderMode.Server },
  { path: 'products/:collections', renderMode: RenderMode.Server },
  { path: 'product/:id', renderMode: RenderMode.Server },

  // Fallback: render remaining routes on server.
  { path: '**', renderMode: RenderMode.Server },
];
