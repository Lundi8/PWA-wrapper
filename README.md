# PWA wrapper

## Authors

- Company : **Lundi8**
- Code : **Jonathan ATTAR**

## Description

**Add some features that PWA can't handle for desktop environnement:**

- fullscreen on launch
- automatic launch
- exit app forbidden
- wrapped for desktop

## Scripts

- Installation : `npm i` or `yarn`
- Developpement : `npm start` or `yarn start`
- Production : `npm run build` or `yarn build`

## Project structure

__Project/__  
__├── out/__ _build folder (created on the fly)_  
__├── src/__  
__│ ├── store/__ _(pwa storage if local zip file loaded)_  
__│ ├── index.html__ _(default view loaded by electron)_  
__│ ├── index.js__ _(electron main process)_  
__│ ├── menu.js__ _(custom electron menu template)_  
__│ ├── url.handler.js__ _(handle urls from : default view, https:// and file system)_  
__│ └── url.store.js__ _(urls storage (created on the fly))_  
__├── ...__ 
__├── ...__  
__└── ...__
