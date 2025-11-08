
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZPLJX43X.js",
      "chunk-NZB6S3G3.js",
      "chunk-G5M4WYT4.js",
      "chunk-VU7AZSRT.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LLGWULHK.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 0,
    "route": "/profile/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UB3ODWIV.js",
      "chunk-VU7AZSRT.js"
    ],
    "route": "/products"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-KPK7T5LA.js",
      "chunk-KOCEYG54.js",
      "chunk-VU7AZSRT.js"
    ],
    "route": "/products/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-KPK7T5LA.js",
      "chunk-KOCEYG54.js",
      "chunk-VU7AZSRT.js"
    ],
    "route": "/collections/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-LVW36GV7.js",
      "chunk-VU7AZSRT.js"
    ],
    "route": "/product/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-4K7TXHNH.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6DD7ID4R.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-KQVMMF5B.js"
    ],
    "route": "/verify-otp"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-AURKZRDL.js",
      "chunk-NZB6S3G3.js",
      "chunk-G5M4WYT4.js",
      "chunk-KOCEYG54.js"
    ],
    "route": "/blogs"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FNOUVXSL.js",
      "chunk-NZB6S3G3.js",
      "chunk-G5M4WYT4.js"
    ],
    "route": "/blogs/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BSTIVNFB.js"
    ],
    "route": "/contactus"
  },
  {
    "renderMode": 0,
    "redirectTo": "/checkout/address",
    "route": "/checkout"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6SOJRKQY.js",
      "chunk-6YLNHS6D.js"
    ],
    "route": "/checkout/address"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-WIF5OQLX.js",
      "chunk-6YLNHS6D.js"
    ],
    "route": "/checkout/payment"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Q2QWZNL3.js",
      "chunk-6YLNHS6D.js"
    ],
    "route": "/checkout/showorder"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "redirectTo": "/dashboard/home",
    "route": "/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/admins"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/addadmin"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/blogs"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/products"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/settings"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/addproducts"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XB4ECP3U.js"
    ],
    "route": "/dashboard/addblogs"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28385, hash: 'dbe32799daba07280ecca35046b473be9c992fe93c16900d022ef110f0039b77', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17843, hash: '4355a4812576ee2cdb1990f0212c3b3ba2172d41c9b843616e849e277aeaae34', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 56362, hash: 'cc7f9766e83064e4e445b0c07ddcf2c9b6075a6fb9d536e56f4e7f221f19e4cd', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'index.html': {size: 53266, hash: '0d346e024367a5fb39fdbfd7a5e862c67ee3f435bd4c7bd135bdb74da2823916', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-UWX3HDVO.css': {size: 84368, hash: 'wfRAVNst1ww', text: () => import('./assets-chunks/styles-UWX3HDVO_css.mjs').then(m => m.default)}
  },
};
