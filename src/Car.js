import React, { Component } from 'react';
// import './css/Car.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                <Form>
                    <Form.Group controlId="formNameCar">
                        <Form.Label>Veículo</Form.Label>
                        <Form.Control 
                            type="text"
                            name="nameCar"
                            onChange={this.handleChange}
                            title={"Nome do veículo"}
                            value={this.state.nameCar} 
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formPlate">
                        <Form.Label>Placa</Form.Label>
                        <Form.Control 
                            type="text"
                            name="plate"
                            onChange={this.handleChange}
                            title={"Placa"}
                            value={this.state.plate}
                            pattern={"/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}/"}
                            placeholder={"Ex.: AAA0000"}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formBrand">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control 
                            type="text"
                            name="brand"
                            onChange={this.handleChange}
                            title={"Marca"}
                            value={this.state.brand}
                            placeholder={"Ex.: Ford"}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formModel">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control 
                            type="text"
                            name="model"
                            onChange={this.handleChange}
                            title={"Modelo"}
                            value={this.state.model}
                            placeholder={"Ex.: Civic"}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formFactoryDate">
                        <Form.Label>Data de fabricação</Form.Label>
                        <Form.Control 
                            type="date"
                            name="factoryDate"
                            onChange={this.handleChange}
                            title={"Data de fabricação"}
                            value={this.state.factoryDate}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formAverageCity">
                        <Form.Label>Consumo cidade (Km/l)</Form.Label>
                        <Form.Control 
                            type="number"
                            name="averageCity"
                            min={0}
                            onChange={this.handleChange}
                            title={"Consumo Médio de combustível dentro de cidade (Km/L)"}
                            value={this.state.averageCity}
                            placeholder={"Ex.: 0,0"}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formAverageHighWay">
                        <Form.Label>Consumo rodovias (Km/l)</Form.Label>
                        <Form.Control 
                            type="number"
                            name="averageHighWay"
                            min={0}
                            onChange={this.handleChange}
                            title={"Consumo Médio de combustível em rodovias (Km/L)"}
                            value={this.state.averageHighWay}
                            placeholder={"Ex.: 0,0"}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        title={"Clique nesse botão para salvar os dados do veículo"}
                    >
                        Salvar
                    </Button>
                </Form>
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
