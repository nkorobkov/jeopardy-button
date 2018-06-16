import React, {Component} from 'react';
import './Checkbox.css';


class Controls extends Component {
    render() {
        // should hold info about hotkeys, false start flag and signal time set field

        return (
            <div className="Sidebar">
                <div className="Sidebar-container">
                    <div className="header">
                        Brain Ring Button <br/>
                        Alpha 0.0.1
                    </div>
                    <br/>
                    <br/>
                    <div className="Controls">
                        <div className='timer-input-box'>
                            <div className='timer-line'>Timer: <input className="effect-16 timerInput" type="number"
                                                                      placeholder="10"/></div>
                        </div>
                        <div className='fs-input-box'>
                            <span>False Start: <input className="regular-checkbox" type="checkbox"/></span>
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