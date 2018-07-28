import React from "react";

export class SystemContainer extends React.Component {
    render() {
        // set color of temperature
        let temperature = this.props.system.cpuTemp;
        if (temperature < 40)
            temperature = <span className="text-success bold">{this.props.system.cpuTemp}</span>;
        else if (temperature >= 40 && temperature < 65)
            temperature = <span className="text-warning bold">{this.props.system.cpuTemp}</span>;
        else
            temperature = <span className="text-danger bold">{this.props.system.cpuTemp}</span>;

        // set color of storage
        let storageUse = this.props.system.fs.use;
        if (storageUse < 50)
            storageUse = <span className="text-success bold">{storageUse}%</span>
        else if (storageUse >= 50 && storageUse < 75)
            storageUse = <span className="text-warning bold">{storageUse}%</span>
        else
            storageUse = <span className="text-danger bold">{storageUse}%</span>

        // set color of memory
        let memoryPrecent = this.props.system.memory.precent;
        if (memoryPrecent < 50)
            memoryPrecent = <span className="text-success bold">({memoryPrecent}%)</span>
        else if (memoryPrecent >= 50 && memoryPrecent < 75)
            memoryPrecent = <span className="text-warning bold">({memoryPrecent}%)</span>
        else
            memoryPrecent = <span className="text-danger bold">({memoryPrecent}%)</span>


        // render 
        return <div className="d-flex flex-column f-container align-self-start">

            <div className="title">Система:</div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">CPU</span>:</div>
                <div><span className="bold">{this.props.system.cpuLoad}</span> %</div>
            </div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">Temp</span>:</div>
                <div><span className="bold">{temperature}</span>°C</div>
            </div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">Storage</span>:</div>
                <div> {storageUse} of {this.props.system.fs.total} Gb</div>
            </div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">RAM</span>:</div>
                <div>
                    {this.props.system.memory.use}Mb{memoryPrecent} of {this.props.system.memory.total}Mb
                </div>
            </div>

            <div className="element d-flex justify-content-between">
                <div><span className="bold">Uptime</span>:</div>
                <div>
                    {this.props.system.uptime.dd}d:
                    {this.props.system.uptime.hh}h:
                    {this.props.system.uptime.mm}m
                </div>
            </div>

        </div>;
    };
};