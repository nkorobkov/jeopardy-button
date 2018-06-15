import React, {Component} from 'react';

class Player extends Component {
    // this gyu is stateless

    render() {
        const classes = 'Player ' + this.props.state;
        return (
            <div className={classes}>
                 Player
            </div>
        );
    }
}
export default Player