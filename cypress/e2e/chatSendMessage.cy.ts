/// <reference types="cypress" />
import { v4 as uuidv4 } from 'uuid';

context('Chat send message', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:8080/login', { email: "mario@nintendo.com.ar", password: "mariobros" })
      .then((response) => {
        cy.log(response.body.token)
        cy.intercept(`http://localhost:8080/**`, req => { req.headers["Authorization"] = `Bearer ${response.body.token}` })
      })
  })

  it('Sends message correctly', () => {
    cy.visit('http://localhost:3000/chat')
    cy.get("#chatTab").click()

    // Use uuidv4 to ensure the uniquenes of the message that later will be queried
    const newMessage = uuidv4()
    cy.get(".user-chat-input").type(newMessage)
    cy.get("#send-message-btn").click()
    cy.get("p").should('contain.text', newMessage)
  })

  it('Alerts user on empty message', () => {
    cy.visit('http://localhost:3000/chat')
    cy.get("#chatTab").click()

    cy.get("#send-message-btn").click()
    cy.get(".toast-container").should("exist")
  })
})
