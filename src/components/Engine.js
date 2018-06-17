import React, {Component} from 'react';
import Controls from "./Controls";
import Player from "./Player";
import Banner from "./Banner";
import Mousetrap from 'mousetrap';
import {GameState, PlayerState, GameStateHint} from "../constants/States";
import {timerStart, buttonPressed, timerEnd} from "./SoundController";

class Engine extends Component {
    BUTTONS_BLOCKED_GAME_STATES = [GameState.pressed, GameState.operational];
    BUTTONS_BLOCKED_PLAYER_STATES = [PlayerState.disq, PlayerState.pressed];
    TIMER_BLOCKED_GAME_STATES = [GameState.pressed, GameState.operational, GameState.timer];

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
        this.onFSClick = this.onFSClick.bind(this);
        this.onTimerChange = this.onTimerChange.bind(this);
        this.onStartTimerClick = this.onStartTimerClick.bind(this);
        this.newGame = this.newGame.bind(this);
        this.startOperational = this.startOperational.bind(this);
    }

    componentDidMount() {
        Mousetrap.bind(['space'], this.newGame);
        Mousetrap.bind(['backspace'], this.startOperational);
        Mousetrap.bind(['t'], this.onStartTimerClick);
    }

    componentWillUnmount() {
        Mousetrap.unbind(['space'], this.newGame);
        Mousetrap.unbind(['backspace'], this.startOperational);
        Mousetrap.unbind(['t'], this.onStartTimerClick);
    }

    startOperational(){
        this.setState({gameState: GameState.operational, playersState: this.DEFAULT_PLAYERS_STATE})
        this.stopTimer();
    }

    onStartTimerClick(){
        if(this.TIMER_BLOCKED_GAME_STATES.includes(this.props.gameState)){return}
        this.startTimer(this.state.qTime)
    }

    startTimer(val){
        this.setState({gameState:GameState.timer});
        this.timerID = setTimeout(() => this.timerDone(), +val * 1000 );
        timerStart.play();
    }

    timerDone(){
        timerEnd.play();
        this.reset()
    }

    stopTimer(){
        if(this.timerID) {
            clearTimeout(this.timerID);
        }
    }
    onBannerClick(e) {
        if (this.BUTTONS_BLOCKED_GAME_STATES.includes(this.state.gameState )) return;
        this.playerClicked(e.nativeEvent.which);
    }

    onFSClick(){
        this.setState((s) => ({fsFlag : !s.fsFlag}))
    }

    onTimerChange(val){
        this.setState((s) => ({qTime : +val}))
    }

    newGame() {
        this.reset();
        this.stopTimer();
    }

    reset(){
        let ps = Object.assign({}, this.DEFAULT_PLAYERS_STATE);
        this.setState({gameState: GameState.ready, playersState: ps })
    }

    playerClicked(index) {
        if (this.BUTTONS_BLOCKED_PLAYER_STATES.includes(this.state.playersState[index])) return;
        if (this.isFalseStart()) {
            this.disqualifyPlayer(index)
        } else {
            buttonPressed.play();
            this.activatePlayer(index);
            this.stopTimer();
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

    render() {
        return (
            <div className="Engine">
                <Controls hint={GameStateHint[this.state.gameState]} onFSClick = {this.onFSClick}
                          onTimerChange={this.onTimerChange} timerValue={this.state.qTime}/>
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