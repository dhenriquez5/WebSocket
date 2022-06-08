const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4Tickets = [];
        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4Tickets: this.ultimos4Tickets
        }
    }

    init() {
        const { hoy, ultimo, tickets, ultimos4Tickets } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4Tickets = ultimos4Tickets;
        } else {
            this.guardarDb();
        }
    }

    guardarDb() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarDb();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) return null;

        const ticket = this.tickets[0];
        this.tickets.shift();

        ticket.escritorio = escritorio;

        this.ultimos4Tickets.unshift(ticket);

        if (this.ultimos4Tickets.length > 4) {
            this.ultimos4Tickets.splice(-1, 1);
        }

        this.guardarDb();

        return ticket

    }

}
module.exports = TicketControl;
