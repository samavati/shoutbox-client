# Shoutbox
![shoutbox](https://raw.githubusercontent.com/samavati/shoutbox-client/main/doc/app-screen-shot.png)

You can see [live demo here](http://185.202.113.68/)
## Install
  

$ git clone https://github.com/samavati/shoutbox-client.git

$ cd PROJECT

$ npm install

  

### Configure app

  

If you want to change server address you need to modify .env file. REACT_APP_SERVER_URL="your server address here".

  

## Start & watch

  

$ npm start

  

## Simple build for production

  

$ npm run build

## Test


$ npm run cypress-e2e

![Test screen shot](https://raw.githubusercontent.com/samavati/shoutbox-client/main/doc/test-screen-shot.png)

  

---

  

## Languages & tools

- [TypeScript](https://www.typescriptlang.org/) added in CRA stage.
- [React](http://facebook.github.io/react) is used for DOM manipulation.
- [Material UI](https://mui.com/) is used for UI.
- [socket.io-client](https://socket.io/docs/v4/client-api/) to create and manage socket connection.
- [Formik](https://formik.org/) form handleing.
- [Yup](https://github.com/jquense/yup) form vadilation.
- [Cypress](https://www.cypress.io/) end to end test.