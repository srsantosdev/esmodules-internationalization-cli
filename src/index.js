import database from '../database.json'
import { TerminalController } from './controllers/TerminalController.js'
import { Person } from './person.js'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal()

      console.log('Process finished!')
      return
    }

    const person = Person.generateInstanceFromString(answer)
    const formattedPerson = person.formatted(DEFAULT_LANGUAGE)
    terminalController.updateTable(formattedPerson)

    await save(person)
    return mainLoop()
  } catch (error) {
    console.error('[ERROR] ', error)

    return mainLoop()
  }
}

await mainLoop()