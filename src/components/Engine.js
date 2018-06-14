import React, {Component} from 'react';
import Controls from "./Controls";
import Player from "./Player";
import Banner from "./Banner";
import Mousetrap from 'mousetrap';

class Engine extends Component {
    constructor(props) {
        super(props);
        this.state = {activePlayer: 0, bannerShow: true};
        this.onBannerClick = this.onBannerClick.bind(this);
        this.newGame = this.newGame.bind(this);

        //this.newGame = this.newGame.bind(this);

    }

    componentDidMount() {
        this.newGame();
        Mousetrap.bind(['space'], this.newGame);
    }

    componentWillUnmount() {
        Mousetrap.unbind(['space'], this.newGame);
    }

    onBannerClick(e) {
        this.setState({bannerShow: false});
        if (e.nativeEvent.which === 1) {
            console.log('Left click');
            this.setState({activePlayer: 1})
        } else if (e.nativeEvent.which === 3) {
            this.setState({activePlayer: 3});
            console.log('Right click');
        }
        else if (e.nativeEvent.which === 2) {
            this.setState({activePlayer: 2});
            console.log('ring click');
        }
    }

    newGame() {
        this.setState({bannerShow: true, activePlayer: 0})
    }


    render() {
        return (
            <div className="Engine">
                <Controls/>
                <div className="playerBox">
                    <Player active={this.state.activePlayer === 1}/>
                    <Player active={this.state.activePlayer === 2}/>
                    <Player active={this.state.activePlayer === 3}/>
                </div>
                <Banner show={this.state.bannerShow} callOnClick={this.onBannerClick}/>
            </div>

        );
    }
}

export default Engine