# PWA wrapper

## Authors

- Company : **Lundi8**
- Code : **Jonathan ATTAR**

## Description

**Add some features that PWA can't handle for desktop environnement :**

legend :

- [x] : done
- [ ] : not done

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
 **├── out/** _build folder (created on the fly)_  
 **├── src/**  
 **│ ├── store/** _pwa storage if local zip file loaded_  
 **│ ├── index.html** _default view loaded by electron_  
 **│ ├── index.js** _electron main process_  
 **│ ├── menu.js** _custom electron menu template_  
 **│ ├── url.handler.js** _handle urls from : default view, https:// and file system_  
 **│ └── url.store.js** _urls storage (created on the fly)_  
 **├── ...**  
 **├── ...**  
 **└── ...**
