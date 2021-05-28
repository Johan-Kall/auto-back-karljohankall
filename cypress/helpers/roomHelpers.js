/// <reference types="cypress" />

import faker from 'faker'

function createRoomValues(){
    let values = {
        "category":"double",
        "floor":faker.datatype.number(4),
        "number":faker.datatype.number(9999),
        "available":true,
        "price":faker.datatype.number({min:1000, max:3000}),
        "features":["balcony","ensuite"]
    }
    return values
}

function getRooms(){
    cy.request({
        method: 'GET',
        url: 'http:localhost:3000/api/rooms',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function getRoom(roomID){
    cy.request({
        method: 'GET',
        url: 'http:localhost:3000/api/room/'+roomID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function createRoom(values){
    cy.request({
        method: 'POST',
        url: 'http:localhost:3000/api/room/new',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:values
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        Cypress.env({lastRoom:response.body.id})
    }))
}

function editRoom(values){
    cy.request({
        method: 'PUT',
        url: 'http:localhost:3000/api/room/'+Cypress.env().lastRoom,
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

function deleteRoom(){
    cy.request({
        method: 'DELETE',
        url: 'http:localhost:3000/api/room/'+Cypress.env().lastRoom,
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
    createRoomValues,
    getRooms,
    getRoom,
    createRoom,
    editRoom,
    deleteRoom
}