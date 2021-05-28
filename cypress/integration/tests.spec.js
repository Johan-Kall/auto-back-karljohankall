/// <reference types="cypress" />

import '../support/commands'
import * as room from '../helpers/roomHelpers'
import * as client from '../helpers/clientHelpers'
import faker from 'faker'

describe('Assignment 04 - Karl-Johan Käll', () =>{
    it("Login", function(){
        cy.authenticate().then((response => {
            cy.log(JSON.stringify(response.body))
        }))
    })

    it("Logout", function(){
        cy.authenticate()
        cy.exit().then((response => {
            cy.log(JSON.stringify(response.body))
        }))
    })

    it('Get Rooms', () =>{
        cy.authenticate().then((response => {
            room.getRooms()
            cy.exit()
        }))
    })

    it('Get Room', () =>{
        cy.authenticate().then((response => {
            room.getRoom(1)
            cy.exit()
        }))
    })

    it('Create Room', () =>{
        cy.authenticate().then((response => {
            room.createRoom(room.createRoomValues)
            cy.exit()
        }))
    })

    it('Edit Room', () =>{
        cy.authenticate().then((response => {
            room.createRoom(room.createRoomValues)
            room.editRoom(room.createRoomValues)
            cy.exit()
        }))
    })

    it('Delete Room', () =>{
        cy.authenticate().then((response => {
            room.createRoom()
            room.deleteRoom()
            cy.exit()
        }))
    })

    it('Create Client', () =>{
        cy.authenticate().then((response => {
            client.createClient(client.createClientValues)
            cy.exit()
        }))
    })

    it('Edit Client', () =>{
        cy.authenticate().then((response => {
            client.createClient(client.createClientValues)
            client.editClient(client.createClientValues)
            cy.exit()
        }))
    })

    it('Delete Client', () =>{
        cy.authenticate().then((response => {
            client.createClient()
            client.deleteClient()
            cy.exit()
        }))
    })
})