import Draftlog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from "readline"
import { Person } from '../person.js'

export class TerminalController {
  constructor() {
    this.print = {}
    this.data = []
  }

  initializeTerminal(database, language) {
    Draftlog(console).addLineListener(process.stdin)

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    this.initializeTable(database, language)
  }

  closeTerminal() {
    this.terminal.close()
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)

    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  getTableOptions() {
    const options = {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.gray('KM Traveled') },
        { field: 'from', name: chalk.gray('From') },
        { field: 'to', name: chalk.gray('To') },
      ]
    }

    return options
  }
}