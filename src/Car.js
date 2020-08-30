import React, { Component } from 'react';
import './css/Car.css';

class Car extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            nameCar: null,
            plate: null, 
            brand: null,
            model: null,
            factoryDate: null,
            averageCity: null,
            averageHighWay: null,
            className: props.className
        };
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const nameState = event.target.name;
        this.setState({[nameState]: event.target.value});
    }

    render () {
        return (        
            <div className={this.state.className}>
                <div className={"field"}>
                    <label> Veículo:
                        <input
                            type="text"
                            name="nameCar"
                            value={this.state.nameCar}
                            onChange={this.handleChange}
                            title={"Nome do veículo"} 
                        />
                    </label>
                </div>
                <div className={"field"}>
                    <label> Placa:
                        <input
                            type="text"
                            name="plate"
                            value={this.state.plate} 
                            onChange={this.handleChange}
                            title={"Placa"}
                            pattern={"/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}/"}
                            placeholder={"Ex.: AAA0000"}
                        />
                    </label>
                </div>
                <div className={"field"}>
                    <label> Marca:
                        <input
                            type="text"
                            name="brand"
                            value={this.state.brand}
                            onChange={this.handleChange}
                            title={"Marca"}
                            placeholder={"Ex.: Ford"}
                        />
                    </label>
                </div>
                <div className={"field"}>
                    <label> Modelo:
                        <input
                            type="text"
                            name="model"
                            value={this.state.model}
                            onChange={this.handleChange}
                            title={"Modelo"}
                            placeholder={"Ex.: Civic"}
                        />
                    </label>
                </div>
                <div className={"field"}>
                    <label> Data de fabricação:
                        <input
                            type="date"
                            name="factoryDate"
                            value={this.state.factoryDate}
                            onChange={this.handleChange}
                            title={"Data de fabricação"}
                        />
                    </label>
                </div>
                <div className={"field"}>
                    <label> Consumo cidade: (Km/l)
                        <input 
                            type="number"
                            name="averageCity"
                            min={0}
                            value={this.state.averageCity}
                            onChange={this.handleChange}
                            title={"Consumo Médio de combustível dentro de cidade (Km/L)"}
                            placeholder={"Ex.: 0,0"}
                        />
                    </label>
                </div>
                <div className={"field"}>
                    <label> Consumo rodovias: (Km/l)
                        <input 
                            type="number"
                            name="averageHighWay"
                            min={0}
                            value={this.state.averageHighWay}
                            onChange={this.handleChange}
                            title={"Consumo Médio de combustível em rodovias (Km/L)"}
                            placeholder={"Ex.: 0,0"}
                        />
                    </label>
                </div>
            </div>);
    }

    componentDidMount() {
        fetch('http://localhost:8080/cars/1')
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            this.setState({ nameCar: data.nameCar })
        })
        .catch(console.log)
    } 
}

export default Car;
