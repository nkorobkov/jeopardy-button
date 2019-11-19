import React, {Component} from 'react';
import './Checkbox.css';


class Controls extends Component {
    constructor(props){
        super(props);
        this.handleTimerChange = this.handleTimerChange.bind(this);
        this.handleFSChange = this.handleFSChange.bind(this);
    }

    handleTimerChange(e) {
        this.props.onTimerChange(e.target.value);
    }

    handleFSChange(e) {
        e.target.blur();
        this.props.onFSClick();
    }

    render() {
        // should hold info about hotkeys, false start flag and signal time set field

        return (
            <div className="Sidebar">
                <div className="Sidebar-container">
                    <div className="header">
                        Jeopardy Button <br/>
                        <a href="https://nkorobkov.github.io/projects/button" className="description_link">What is it?</a>
                    </div>
                    <br/>
                    <br/>

                    <div className="Controls">
                        <div className='timer-input-box'>
                            <div className='timer-line'>Timer: <input className="effect-16 timerInput" type="number"
                                                                      onChange={this.handleTimerChange} value={this.props.timerValue}/></div>
                        </div>
                        <div className='fs-input-box'>
                            <span>False Start: <input className="regular-checkbox" type="checkbox" onClick={this.handleFSChange}/></span>
                        </div>

                    </div>

                </div>
                <div className="hint">
                    {this.props.hint}
                </div>
            </div>
        )
            ;
    }
}

export default Controls