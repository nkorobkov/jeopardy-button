import React, {Component} from 'react';
import Controls from "./Controls";
import Player from "./Player";
import Banner from "./Banner";
import Mousetrap from 'mousetrap';
import {GameState, PlayerState} from "../constants/States";


class Engine extends Component {
    BUTTONS_BLOCKED_GAME_STATES = [GameState.pressed, GameState.operational];
    BUTTONS_BLOCKED_PLAYER_STATES = [PlayerState.disq, PlayerState.pressed];
    DEFAULT_PLAYERS_STATE = {1: PlayerState.ready, 2: PlayerState.ready, 3: PlayerState.ready};

    constructor(props) {
        super(props);
        this.state = {
            fsFlag: false,
            qTime: 10,
            gameState: GameState.operational,
            playersState: Object.assign({}, this.DEFAULT_PLAYERS_STATE)
        };

        this.onBannerClick = this.onBannerClick.bind(this);
        this.newGame = this.newGame.bind(this);
        this.startOperational = this.startOperational.bind(this);
    }

    componentDidMount() {
        Mousetrap.bind(['space'], this.newGame);
        Mousetrap.bind(['backspace'], this.startOperational);
    }

    componentWillUnmount() {
        Mousetrap.unbind(['space'], this.newGame);
        Mousetrap.unbind(['backspace'], this.startOperational);
    }

    startOperational(){
        this.setState({gameState: GameState.operational, playersState: this.DEFAULT_PLAYERS_STATE})
    }

    onBannerClick(e) {
        if (this.BUTTONS_BLOCKED_GAME_STATES.includes(this.state.gameState )) return;
        this.playerClicked(e.nativeEvent.which);
    }

    playerClicked(index) {
        if (this.BUTTONS_BLOCKED_PLAYER_STATES.includes(this.state.playersState[index])) return;
        if (this.isFalseStart()) {
            this.disqualifyPlayer(index)
        } else {
            this.activatePlayer(index);
            this.setState({gameState: GameState.pressed})
        }
    }

    isFalseStart() {
        return this.state.gameState === GameState.ready && this.state.fsFlag
    }

    disqualifyPlayer(index){
        this.setPlayerState(index, PlayerState.disq)
    }

    activatePlayer(index){
        this.setPlayerState(index, PlayerState.pressed)
    }

    setPlayerState(index, state){
        this.setState(function(prevState, props) {
            let ps = prevState.playersState;
            ps[index] = state;
            return {
                playersState: ps
            };
        })
    }

    newGame() {
        console.log("ng");
        let ps = Object.assign({}, this.DEFAULT_PLAYERS_STATE);
        this.setState({gameState: GameState.ready, playersState: ps })
    }


    render() {
        return (
            <div className="Engine">
                <Controls/>
                <div className="playerBox">
                    <Player state={this.state.playersState[1]}/>
                    <Player state={this.state.playersState[2]}/>
                    <Player state={this.state.playersState[3]}/>
                </div>
                <Banner show={this.state.gameState !== GameState.operational} callOnClick={this.onBannerClick}/>
            </div>

        );
    }
}

export default Engine