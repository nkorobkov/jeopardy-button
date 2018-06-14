import React, {Component} from 'react';

class Player extends Component {
    // this gyu is stateless

    render() {
        const active = this.props.active ? 'active' : '';
        const classes = 'Player ' + active;
        return (
            <div className={classes}>
                 Player
            </div>
        );
    }
}
export default Player