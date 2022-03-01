/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const injectDevServer = require("@cypress/react/plugins/react-scripts");
const io = require('socket.io-client');
const axios = require('axios');
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  let socket

  on('task', {
    async connect(userName) {
      socket = io('http://localhost:8080');
      console.log('Cypress is connecting to socket server under name %s')
      return null
    },
  })

  injectDevServer(on, config)
  return config
}
