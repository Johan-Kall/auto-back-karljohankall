/// <reference types="cypress" />

import faker from 'faker'

function createClientValues(){
    let values = {
        "name":faker.name.firstName(),
        "email":faker.internet.email(),
        "telephone":faker.phone.phoneNumber()
    }
    return values
}

function getClients(){
    cy.request({
        method: 'GET',
        url: 'http:localhost:3000/api/clients',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function getClient(clientID){
    cy.request({
        method: 'GET',
        url: 'http:localhost:3000/api/client/'+clientID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function createClient(values){
    cy.request({
        method: 'POST',
        url: 'http:localhost:3000/api/client/new',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:values
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        Cypress.env({lastClient:response.body.id})
    }))
}

function editClient(values){
    cy.request({
        method: 'PUT',
        url: 'http:localhost:3000/api/client/'+Cypress.env().lastClient,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:values
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function deleteClient(){
    cy.request({
        method: 'DELETE',
        url: 'http:localhost:3000/api/client/'+Cypress.env().lastClient,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

module.exports = {
    createClientValues,
    getClients,
    getClient,
    createClient,
    editClient,
    deleteClient
}