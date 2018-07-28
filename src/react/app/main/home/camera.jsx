import React from "react";

export class CameraContainer extends React.Component {
    render() {
        return <div className="d-flex flex-column f-container align-self-start">

            <div className="title">Камера:</div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">Включена</span>:</div>
                <div><span className="bold">{this.props.camera.isEnable ?
                    <span className="text-danger">Да</span> :
                    <span className="text-success">Нет</span>
                }</span></div>
            </div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">Запись</span>:</div>
                <div><span className="bold">{this.props.camera.isRecord ?
                    <span className="text-danger">Да</span> :
                    <span className="text-success">Нет</span>
                }</span></div>
            </div>

        </div>;
    };
};