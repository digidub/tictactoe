# TICTACTOE

A vanilla JavaScript tictactoe game. Play against a human or super-hard AI.

## Project Link

[View the project here](https://digidub.github.io/tictactoe/)

![App Demo](https://i.imgur.com/zapfQ21.gif 'App Demo')

## Skills Employed

In building this project I leveraged the following concepts and technologies:

- **Factory Functions**
  - Using factory functions allowed me to easily generate game objects (eg. the board, the players, and the game state)
  - Factory functions are verbose and easy to write, without needing syntax such as `new`
  - Favouring 'composition over inheritance', with each factory function being thought out and messy inheritance being avoided
  - I found that this way of creating objects greatly improves maintainability and readibility of my code
- **Immediately Invoked Function Expressions (IIFE)**
  - I used an IIFE for objects where only one instance was required
- **Scope & Closure**
  - I reinforced my understanding of scope, particularly around lexical (ie. block) scoping
  - As part of this I got to grips with how arrow functions vs 'ordinary' functions handle `this`
  - I also strengthened my understanding of closure, whereby functions retain their scope even if they are passed around and called outside of that scope
- **Recursive Functions**
  - This project gave me excellent practice in building recursive functions
  - I built a `minimax` algorithm for the AI to use
  - The algorithm simulates all possible remaining moves for both players and assigns a score to each outcome
  - It recursively calls itself in order to achieve this
  - Sequential moves that result in the AI winning, result in a higher algorithmic score
  - conversely, sequential moves that result in the human (you) winning, result in a lower algorithmic score
  - This algorithmic score was then used to determine the next move the AI should make
  - This resulted in an unbeatable AI! Fun to implement, frustrating to play against
