<p align="center"><img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" width="100"></p>


## About Tic-Tac-Toe game

React based project that allows a user to play tic tac toe. This app has only learning purposes and can't be used in production. 

The app is avaible at link above.

React docs: https://reactjs.org/docs/getting-started.html

## To run the app on your machine follow the steps below

1. Install NPM https://www.npmjs.com/get-npm

2. In terminal go to project folder `cd <path to project folder>`

3. Install packages `npm i`

4. Run app `npm start`

## Game State Object

`{
    game: {
        side: 'X',
        moves: 5,
        model: 'humanHuman' | 'humanAi',
        end: false
    },
    humanAi: {
        humanSide: 'X',
        aiSide: 'O',
        difficulty: 'Hard' | 'Easy' | 'Normal',
        stats: {
            games: 6,
            humanWins: 4,
            aiWins: 2
        }
    },
    humanHuman: {
        player: 'X',
        oponent: 'O',
        stats: {
            games: 4,
            playerWins: 3,
            oponentWins: 1
        }
    }
    board: ['', '', 'X', '', '', 'O', '', '', ''],
    combinations: [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
    ]
}`