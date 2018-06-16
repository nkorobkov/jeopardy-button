import React from "react"

export const GameState = {
    ready: 'GSR',
    timer: 'GST',
    pressed: 'GSBP',
    operational: 'GSOP'
};

let ACTIVE_STATE_HINT = "Backspace to manage settings";
let GameStateHintT = {};
GameStateHintT[GameState.ready] = <p>T to start timer <br/>{ACTIVE_STATE_HINT}</p>;
GameStateHintT[GameState.timer] = <p>Space to reset the game <br/>{ACTIVE_STATE_HINT}</p>;
GameStateHintT[GameState.pressed] = <p>Space to reset the game <br/> Down for wrong answer
    <br/> {ACTIVE_STATE_HINT}</p>;
GameStateHintT[GameState.operational] = <p>Press Space to Start</p>;

export const GameStateHint = GameStateHintT;

export const PlayerState = {
    ready: 'PSR',
    disq: 'PSD',
    pressed: 'PSBP'
};

