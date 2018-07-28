import React from "react";
import { connect } from "react-redux";
import actions from "../../../actions/action_webcam.jsx";


class Camera extends React.Component {
    constructor(props) {
        super(props);

        this.player = null;
        this.socket = null;

        this.btnStart = this.btnStart.bind(this);
        this.btnStop = this.btnStop.bind(this);
        this.btnRecord = this.btnRecord.bind(this);
    };

    componentDidMount() {
        // change header title
        this.props.headerChange(this.props.header);

        // get status of webcam from server
        this.props.status();

        // connect to websocket
        this.socket = io();

        // create player
        const canvas = document.getElementById('video-canvas');
        canvas.width = 640;
        canvas.height = 480;
        this.player = new JSMpeg.Player('pipe', {
            canvas: canvas
        });

        this.socket.on("camera", (data) => {
            this.player.write(data);
        });
    };

    componentWillUnmount() {
        // stops playback, disconnects the source and cleans up WebGL and WebAudio state.        
        this.player.destroy();
        this.socket.close();
    };

    btnStart() {
        // enable webcam
        this.props.enable();
    };

    btnStop() {
        // disable webcam
        this.props.disable();
    };

    btnRecord() {
        this.props.record();
    };

    render() {
        return (
            <div className="container-fluid row">
                <div className="col-9 text-center">
                    <canvas className="webcam-view" id="video-canvas"></canvas>
                </div>
                <div className="col-3 control">
                    <div className="margin_bottom">
                        {
                            this.props.state.enable ?
                                <button type="button" className="btn btn-block" onClick={this.btnStart} disabled>Запустить камеру</button> :
                                <button type="button" className="btn btn-primary btn-block" onClick={this.btnStart}>Запустить камеру</button>
                        }
                    </div>
                    <div className="margin_bottom">
                        {

                            this.props.state.enable ?
                                <button type="button" className="btn btn-primary btn-block" onClick={this.btnStop}>Остановить камеру</button> :
                                <button type="button" className="btn btn-block" onClick={this.btnStop} disabled>Остановить камеру</button>

                        }
                    </div>
                    {   // if webcam disable - btn RECORD is disable too
                        this.props.state.enable ?
                            <div className="margin_bottom">
                                {
                                    this.props.state.record ?
                                        <button type="button" className="btn btn-danger btn-block" onClick={this.btnRecord}>Остановить запись</button> :
                                        <button type="button" className="btn btn-primary btn-block" onClick={this.btnRecord}>Запустить запись</button>
                                }
                            </div> :
                            <div>
                                <button type="button" className="btn btn-block" onClick={this.btnRecord} disabled>Запись</button>
                            </div>
                    }
                </div>
            </div>
        );
    };
};


function mapStateToProps(state) {
    return {
        state: state.WEBCAM
    };
};

export default connect(mapStateToProps, actions)(Camera);