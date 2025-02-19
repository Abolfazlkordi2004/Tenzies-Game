import React, { useEffect, useRef } from "react"
import Die from "./die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {

   const [dice, setDice] = React.useState(() => generateAllNewDice())
   const buttonRef=useRef(null)

   const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

   useEffect(()=>{if(gameWon){
      buttonRef.current.focus()
   }},[gameWon])

   function generateAllNewDice() {
      return new Array(10).fill(0).map(() => ({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }))
   }

   const diceElements = dice.map(dieObj => (<Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} />))

   function rollDice() {
      if (!gameWon) {
         setDice(oldDice => oldDice.map(die => die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }))
      } else {
         setDice(generateAllNewDice())
      }
   }

   function hold(id) {
      setDice(oldDice => {
         return oldDice.map(die => { return die.id === id ? { ...die, isHeld: !die.isHeld } : die })
      })
   }

   return <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
         {gameWon&&<p>You Won! Press "New game" to start again</p>}
      </div>
      <div className="dice-container">
         {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
   </main>
}