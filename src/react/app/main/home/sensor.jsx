import React from "react";

export class SensorContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onToggle = this.onToggle.bind(this);
    };

    onToggle() {
        this.props.toggleAlarm();
    };

    render() {
        return <div className="d-flex flex-column f-container align-self-start">

            <div className="title">Датчики:</div>

            <div className="element d-flex justify-content-between">
                {this.props.alarm ?
                    <button onClick={this.onToggle} type="button" class="btn btn-success btn-sm">Выключить сигнализацию</button> :
                    <button onClick={this.onToggle} type="button" class="btn btn-danger btn-sm">Включить сигнализацию</button>}
            </div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">Сигнализация:</span></div>
                {this.props.alarm ?
                    <div><span className="bold text-danger">Вкл.</span></div> :
                    <div><span className="bold text-success">Выкл.</span></div>}
            </div>

            {
                this.props.sensors.length == 0 ?
                    <div className="element d-flex justify-content-between">
                        <p>Датчики не подключены.</p>
                    </div> :

                    this.props.sensors.map((elem) => {
                        return <div className="element d-flex justify-content-between">
                            <div><span className="bold">{elem.name}</span></div>
                            {elem.value == 0 ?
                                <div><span className="bold text-success">Спит</span></div> :
                                <div><span className="bold text-danger">Трев.</span></div>}
                        </div>;
                    })
            }
            <div className="element d-flex justify-content-between"></div>

        </div>;
    };
};