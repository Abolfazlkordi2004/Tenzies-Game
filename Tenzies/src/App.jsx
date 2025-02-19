import React from "react"
import Die from "./die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {

   const [dice, setDice] = React.useState(generateAllNewDice())

   const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

   function generateAllNewDice() {
      return new Array(10).fill(0).map(() => ({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }))
   }

   const diceElements = dice.map(dieObj => (<Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} />))

   function rollDice() {
      setDice(oldDice => oldDice.map(die => die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }))
   }

   function hold(id) {
      setDice(oldDice => {
         return oldDice.map(die => { return die.id === id ? { ...die, isHeld: !die.isHeld } : die })
      })
   }

   return <main>
      {gameWon && <Confetti />}
      <div className="dice-container">
         {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
   </main>
}