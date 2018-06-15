import React, {Component} from 'react';

class Player extends Component {
    // this guy is stateless

    render() {
        const dClasses = 'Player ' + this.props.state;
        return (
            <div className={dClasses}>
                    <div className="name-col input-effect">
                        <input className="effect-16 nameInput" type="text" placeholder="Name"/>
                        <span className="focus-border"/>
                    </div>
            </div>
        );
    }
}
export default Player