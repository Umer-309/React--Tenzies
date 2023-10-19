import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


export default function App() {
    const [dieCount, setDieCount] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    /**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 */

    React.useEffect(() => {
        const held = dieCount.every(die => die.isHeld)
        const firstValue = dieCount[0].value
        const allSame = dieCount.every(die => die.value === firstValue)
        if (allSame && held) {
            setTenzies(true)
            console.log("You Won!");
        }
    }, [dieCount])

    const dieFace = dieCount.map(die => (<Die value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} key={die.id} />))

    function newDice() {
        return {
            value: Math.floor((Math.random() * 6) + 1),
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice() {
        let arr = [] // initiate an array
        while (arr.length < 10) //loop for 10 entries
        {
            arr.push(newDice())
        }
        return arr
    }


    function rollDice() {
        setDieCount(prevCount => prevCount.map(die => {
            return die.isHeld === true ? die : newDice()
        }))
    }

    function holdDice(id) {
        setDieCount(prevCount => prevCount.map(die => {
            return die.id === id ?
                {
                    ...die,
                    isHeld: !die.isHeld
                } : die
        }))
    }
    function playAgain() {
        setDieCount(allNewDice())
        setTenzies(false)
    }


    return (
        <main className="background">
        {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="background--layer">
                {dieFace}
            </div>
            <button className="roll-btn" onClick={tenzies ? playAgain : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}