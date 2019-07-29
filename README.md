# PWA wrapper

## Authors
- Company : Lundi8
- Code : Jonathan ATTAR

## Description
Add some features that PWA can't handle for desktop environnement:
- fullscreen on launch
- automatic launch
- exit app forbidden
- wrapped for desktop

## Scripts
- Installation : ``` npm i  ``` or  ``` yarn ```
- Developpement : ``` npm start  ``` or  ``` yarn start  ```
- Production : ``` npm run build ``` or ``` yarn build  ```


## Project structure
Project Root/
│
├── out/ * build folder (created on the fly)* 
│
├── src/
│   ├── store/ * pwa storage if local zip file loaded *
│   ├── index.html * default view loaded by electron *
│   ├── index.js * electron main process *
│   ├── menu.js * custom electron menu template *
│   ├── url.handler.js * handle urls from : default view, https:// and local file *
│   └── url.store.js * urls storage (created on the fly) *
│
├── ...
├── ...
└── ...
