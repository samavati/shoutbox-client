/// <reference types="cypress" />

cy['faker'] = require('@faker-js/faker');
cy['io'] = require('socket.io-client');

const serverAddress = 'http://185.202.113.68';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('shoutbox works as it should', () => {
    const mainUserName = (cy as any).faker.faker.name.findName();
    const socket = (cy as any).io.io(serverAddress);

    beforeEach(() => {
        cy.visit('http://185.202.113.68');
        cy.intercept({
            method: 'POST',
            url: '/users/join',
        }).as('joinRequest');

        cy.intercept({
            method: 'GET',
            url: '/config',
        }).as('config');

        cy.wait(1000);
        cy.get('#user-name').type(mainUserName);
        cy.get('#enter-button').click();
        cy.wait('@joinRequest');
    });

    it('user should sign in successfully', () => {
        cy.get('#users-list-wrapper').contains(mainUserName);
        cy.get('#message-list-wrapper').contains(`Welcome ${mainUserName}.`).end();
    });

    it('user can write message and send it', () => {
        const messageText = (cy as any).faker.faker.lorem.paragraph();
        cy.get('#message-text-field').type(messageText);
        cy.get('#submit-message-button').click();
        cy.get('#message-list-wrapper').contains(messageText).end()
    });

    it('sees the 2nd user join', () => {
        const secondUserName = (cy as any).faker.faker.name.findName();

        cy.request('POST', serverAddress + '/users/join', { name: secondUserName, socketId: socket.id }).then(res => {
            socket.emit('JOIN', { name: secondUserName });
            cy.wait(1000)
            cy.get('#users-list-wrapper').contains(secondUserName);
            cy.get('#message-list-wrapper').contains(`${secondUserName} joined to the room.`).end()
        });
    });

    it("can see 2nd user's messages without refresh", () => {
        const secondUserName = (cy as any).faker.faker.name.findName();

        cy.request('POST', serverAddress + '/users/join', { name: secondUserName, socketId: socket.id }).then(res => {
            socket.emit('JOIN', { name: secondUserName });
            cy.wait(1000);
            const messageText = (cy as any).faker.faker.lorem.paragraph();
            socket.emit('USER_MESSAGE', { message: messageText })
            cy.get('#message-list-wrapper').contains(messageText).end()
        });
    });

    it("users can send clickable links", () => {
        const secondUserName = (cy as any).faker.faker.name.findName();

        cy.request('POST', serverAddress + '/users/join', { name: secondUserName, socketId: socket.id }).then(res => {
            socket.emit('JOIN', { name: secondUserName });
            cy.wait(1000);
            const firstRandomUrl = (cy as any).faker.faker.internet.url();
            const firstRandomMessage = (cy as any).faker.faker.lorem.sentence();
            const firstSentence = firstRandomMessage + ' ' + firstRandomUrl;
            socket.emit('USER_MESSAGE', { message: firstSentence })
            cy.get(`a[href="${firstRandomUrl}"]`).should('exist');

            const secondRandomUrl = (cy as any).faker.faker.internet.url();
            const secondRandomMessage = (cy as any).faker.faker.lorem.sentence();
            const secondSentence = secondRandomMessage + secondRandomUrl;
            socket.emit('USER_MESSAGE', { message: secondSentence })
            cy.get(`a[href="${secondRandomUrl}"]`).should('exist');


            const thirdRandomUrl = (cy as any).faker.faker.internet.url();
            const thirdRandomMessage = (cy as any).faker.faker.lorem.sentence();
            const thirdSentence = thirdRandomMessage + thirdRandomUrl + " " + (cy as any).faker.faker.lorem.sentence();
            socket.emit('USER_MESSAGE', { message: thirdSentence })
            cy.get(`a[href="${thirdRandomUrl}"]`).should('exist');
        });
    });


    it("only limit number of messages shows", () => {
        const secondUserName = (cy as any).faker.faker.name.findName();

        cy.request('POST', serverAddress + '/users/join', { name: secondUserName, socketId: socket.id }).then(res => {
            socket.emit('JOIN', { name: secondUserName });
            cy.wait(1000);

            cy.request('GET', serverAddress + '/config').then(res => {
                const messages = new Array(3 * res.body.show_limit).fill('');

                for (let index = 0; index < messages.length; index++) {
                    socket.emit('USER_MESSAGE', { message: (cy as any).faker.faker.lorem.sentence() })
                }
    
                cy.get("[aria-label='message']").should('have.length', res.body.show_limit)
            })

        });
    });
});