const { permissions, menuItems } = require('./config/constants');
// const {
//   addMain,
//   addWelcome,
//   addTree,
//   addOrganization,
//   addClasses,
// } = require('./src/services/menu-builder');
const addMenuItems = require('./src/services/menu-builder/add')
const init = require('./init');
const updateCenters = require('./src/services/centers/updateCenters');

// TODO: el proceso de gestionar los elementos que se añaden al MenuBuilder debería estar abstraido
// tal y como se está haciendo ahora pero, en lugar de en cada Plugin, hacerlo a nivel del propio MenuBuilder
async function initMenuBuilder() {
  // await addMain();
  await addMenuItems(menuItems);
  leemons.events.emit('init-menu');
  // await Promise.all([addWelcome(), addTree(), addOrganization(), addClasses()]);
  leemons.events.emit('init-submenu');
}

async function events(isInstalled) {
  leemons.events.once('plugins.multilanguage:pluginDidLoad', async () => {
    init();
  });

  if (!isInstalled) {
    updateCenters();
    leemons.events.once('plugins.users:init-permissions', async () => {
      const usersPlugin = leemons.getPlugin('users');
      await usersPlugin.services.permissions.addMany(permissions.permissions);
      leemons.events.emit('init-permissions');
    });

    leemons.events.once(
      ['plugins.menu-builder:init-main-menu', 'plugins.classroom:init-permissions'],
      async () => {
        await initMenuBuilder();
      }
    );
  } else {
    leemons.events.once('plugins.classroom:pluginDidInit', async () => {
      leemons.events.emit('init-permissions');
      leemons.events.emit('init-menu');
      leemons.events.emit('init-submenu');
    });
  }
}

module.exports = events;
