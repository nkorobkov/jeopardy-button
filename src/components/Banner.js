import React, {Component} from 'react';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.bannerClicked = this.bannerClicked.bind(this);
    }


    bannerClicked(e) {
        this.props.callOnClick(e);
        e.preventDefault();
    }


    render() {
        // should pass click to the engine and disappear

        const showBannerClass = this.props.show ? ' active-banner' : '';
        const classes = 'Banner' + showBannerClass;
        return (
            <div className={classes} onContextMenu={(event) => event.preventDefault()} onMouseDown={this.bannerClicked}>
            </div>
        );
    }
}

export default Banner