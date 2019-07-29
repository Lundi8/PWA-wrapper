# PWA wrapper

## Authors

- Company : **Lundi8**
- Code : **Jonathan ATTAR**

## Description

**Add some features that PWA can't handle for desktop environnement:**

- [x] fullscreen on launch
- [ ] automatic launch
- [x] exit app forbidden
- [ ] wrapped for desktop

## Scripts

- Installation : `npm i` or `yarn`
- Developpement : `npm start` or `yarn start`
- Production : `npm run build` or `yarn build`

## Project structure

**Project/**  
 **├── out/** _(build folder (created on the fly))_  
 **├── src/**  
 **│ ├── store/** _(pwa storage if local zip file loaded)_  
 **│ ├── index.html** _(default view loaded by electron)_  
 **│ ├── index.js** _(electron main process)_  
 **│ ├── menu.js** _(custom electron menu template)_  
 **│ ├── url.handler.js** _(handle urls from : default view, https:// and file system)_  
 **│ └── url.store.js** _(urls storage (created on the fly))_  
 **├── ...**  
 **├── ...**  
 **└── ...**
