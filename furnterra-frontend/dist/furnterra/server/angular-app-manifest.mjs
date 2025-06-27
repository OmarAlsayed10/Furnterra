
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-K3UZWEOG.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MFUVLFRF.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-63RQLHR6.js",
      "chunk-RQMTRMLF.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5UQP4AG2.js",
      "chunk-RQMTRMLF.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QN6TYKSY.js",
      "chunk-RQMTRMLF.js"
    ],
    "route": "/verify-otp"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2KWYLYHX.js"
    ],
    "route": "/products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5EK4LR66.js"
    ],
    "route": "/blogs"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7458, hash: 'a821fd5476d97c3f04cf727c87f082c675403d2f1b0095b152dc1cac1ac367ba', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1304, hash: 'c956fe333bc8cc580d2e4bd714202960b387385cc9c3703a01e6ccece66087b1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 14760, hash: '9d7b9b00be431fd683878538095bbbb943563b211cf4e5a5a133663dfcf2cd46', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 17981, hash: '29814f941124a56dfc51abd5e735cd512cb2fe0057dea034b76a69ebfa924d31', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 33139, hash: 'f9c081ddd6d982fc26a01b146a0e5da00fed5fe553e098ecca45268d5e07c85c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 14769, hash: '8d2b1250cc99f3a1492d90cfb009f6dbe9e36b5fa8791e6f3ce9e4de60b8360a', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 18163, hash: '3b7bdc34fe76b437e6056a29d8352aad2e1c9b1e9753c9558e97e790e4aa6442', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'blogs/index.html': {size: 14760, hash: 'b19cad973e26ab6096221e3a04abc002f6ce22cc645d916b739bdf84a56438cd', text: () => import('./assets-chunks/blogs_index_html.mjs').then(m => m.default)},
    'verify-otp/index.html': {size: 17981, hash: '92d8155557d03ee043b2b1d6368174e2a8745f12c3357b52cc868edd3dc7f5e3', text: () => import('./assets-chunks/verify-otp_index_html.mjs').then(m => m.default)},
    'styles-7U6OHT7T.css': {size: 23504, hash: '1CH2lMRruzg', text: () => import('./assets-chunks/styles-7U6OHT7T_css.mjs').then(m => m.default)}
  },
};
