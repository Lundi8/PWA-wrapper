const path = require('path');

module.exports = {
  packagerConfig: {
    executableName: 'pwa-wrapper',
    icon: 'src\\icon.ico',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
    },
    {
      name: '@electron-forge/maker-rpm',
    },
  ],
};
