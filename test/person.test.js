import mocha from 'mocha'
import chai from 'chai'
import { Person } from '../src/person.js'

const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const answer = '1 Bike,Carro 2000002 2000-01-01 2020-02-01'
    const person = Person.generateInstanceFromString(answer)

    const expected = {
      from: '2000-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '2000002',
      id: '1'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      from: '2000-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '2000002',
      id: '1'
    })

    const formattedPerson = person.formatted()

    const expected ={
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '2.000.002 km',
      from: '01 de janeiro de 2000',
      to: '01 de fevereiro de 2020'
    }

    expect(formattedPerson).to.be.deep.equal(expected)
  })
})