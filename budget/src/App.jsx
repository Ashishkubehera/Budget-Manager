import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Logo from './logo.svg'
import Form from './component/Form'
import List from './component/List'
import './App.css'

const ALL_EXPENSES = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  :[]

  // {
  //   id: 1,
  //   description: 'Dominoes',
  //   category: 'FoodNDining',
  //   amount: 430,
  //   date: '01-02-2020',
  // },
  // {
  //   id: 2,
  //   description: 'Car wash',
  //   category: 'utility',
  //   amount: 500,
  //   date: '01-06-2020',
  // },
  // {
  //   id: 3,
  //   description: 'Amazon',
  //   category: 'shopping',
  //   amount: 2030,
  //   date: '01-07-2020',
  // },
  // {
  //   id: 4,
  //   description: 'House rent',
  //   category: 'Food & Dining',
  //   amount: 35900,
  //   date: '01-03-2020',
  // },
  // {
  //   id: 5,
  //   description: 'Tuition',
  //   category: 'education',
  //   amount: 2200,
  //   date: '01-12-2020',
  // },
  // {
  //   id: 6,
  //   description: 'Laundry',
  //   category: 'Personal Care',
  //   amount: 320,
  //   date: '01-14-2020',
  // },
  // {
  //   id: 7,
  //   description: 'Vacation',
  //   category: 'Travel',
  //   amount: 3430,
  //   date: '01-18-2020',
  // },

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')



  const handleName = (event) => {
    console.log('Description ', event.target.value)
    setDescription(event.target.value)
  }

  const handleAmount = (event) => {
    console.log('Amount ', event.target.value)
    setAmount(event.target.value)
  }

  const handleClearExpenses = () => {
    setExpenses([])
  }

  const handleSubmitForm = event => {
    event.preventDefault()
    if (description !== '' && amount > 0) {
      const expense = { description, amount }
      setExpenses([...expenses, expense])
      setDescription('')
      setAmount('')
    } else {
      console.log('Invalid expense name or the amount')
    }
  }

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  return (
    <Container className="text-center">
      <div className="jumbotron">
        <h3 className="display-6">Expense Tracker React App</h3>
        <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        <div>
          <p>
            Total Expense:{' '}
            <span className="text-success">
              ${' '}
              {expenses.reduce((accumulator, currentValue) => {
                return (accumulator += parseInt(currentValue.amount))
              }, 0)}
            </span>
          </p>
        </div>
        <div>
          <Form
            name={description}
            amount={amount}
            handleName={handleName}
            handleAmount={handleAmount}
            handleSubmitForm={handleSubmitForm}
            handleClearExpenses={handleClearExpenses}
          />
        </div>
        <div>
          <List expenses={expenses} />
        </div>
      </div>
    </Container>
  )
}

export default App
