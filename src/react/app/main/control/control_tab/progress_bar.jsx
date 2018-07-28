import React from "react";

export class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <div class="progress">
            <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={this.props.progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: this.props.progress + '%' }}>
            </div>
        </div>;
    };
};