import React, { Component } from 'react';
// import './css/Car.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Car extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            nameCar: "",
            plate: "", 
            brand: "",
            model: "",
            factoryDate: Date.now,
            averageCity: 0,
            averageHighWay: 0,
            validated: false,
            isLoading: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const nameState = event.target.name;
        this.setState({[nameState]: event.target.value});
    }

    handleSubmit(event) {
        this.setState({isLoading: true});
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({isLoading: false});
            event.preventDefault();
            event.stopPropagation();   
        } else {
            let carValuesToSave = {
                nameCar: form.elements.formNameCar.value,
                plate: form.elements.formPlate.value, 
                brand: form.elements.formBrand.value,
                model: form.elements.formModel.value,
                factoryDate: new Date(form.elements.formFactoryDate.value).toJSON(),
                averageCity: parseFloat(form.elements.formAverageCity.value),
                averageHighWay: parseFloat(form.elements.formAverageHighWay.value),
            }

            console.log(JSON.stringify(carValuesToSave));
            fetch("http://localhost:8080/cars/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carValuesToSave),       
            })
            .then(response => response.json())
            .then(response => {
                this.setState({validated: false});
                this.setState({isLoading: false});
                alert("Veículo salvo com sucesso");
            })
            .catch(console.log)
        }
        this.setState({validated: true});        
    }  

    render () {
        return (        
            <div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formNameCar">
                        <Form.Label>Veículo</Form.Label>
                        <Form.Control
                            required 
                            type="text"
                            name="nameCar"
                            onChange={this.handleChange}
                            title={"Nome do veículo"}
                            value={this.state.nameCar} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo veículo não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPlate">
                        <Form.Label>Placa</Form.Label>
                        <Form.Control
                            required 
                            type="text"
                            name="plate"
                            onChange={this.handleChange}
                            title={"Placa"}
                            value={this.state.plate}
                            pattern={"^[a-zA-Z]{3}-[0-9]{4}"}
                            placeholder={"Ex.: AAA-0000"}
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo placa não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBrand">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            required 
                            type="text"
                            name="brand"
                            onChange={this.handleChange}
                            title={"Marca"}
                            value={this.state.brand}
                            placeholder={"Ex.: Ford"}
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo marca não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formModel">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            required 
                            type="text"
                            name="model"
                            onChange={this.handleChange}
                            title={"Modelo"}
                            value={this.state.model}
                            placeholder={"Ex.: Civic"}
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo modelo não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFactoryDate">
                        <Form.Label>Data de fabricação</Form.Label>
                        <Form.Control
                            required 
                            type="date"
                            name="factoryDate"
                            step="any"
                            onChange={this.handleChange}
                            title={"Data de fabricação"}
                            value={this.state.factoryDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo data de fabricação não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formAverageCity">
                        <Form.Label>Consumo na cidade (Km/l)</Form.Label>
                        <Form.Control
                            required 
                            type="number"
                            name="averageCity"
                            step="any"
                            min={0}
                            onChange={this.handleChange}
                            title={"Consumo Médio de combustível dentro de cidade (Km/L)"}
                            value={this.state.averageCity}
                            placeholder={"Ex.: 0.0"}
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo consumo na cidade não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formAverageHighWay">
                        <Form.Label>Consumo na estrada (Km/l)</Form.Label>
                        <Form.Control
                            required 
                            type="number"
                            name="averageHighWay"
                            step="any"
                            min={0}
                            onChange={this.handleChange}
                            title={"Consumo Médio de combustível na estrada (Km/L)"}
                            value={this.state.averageHighWay}
                            placeholder={"Ex.: 0.0"}
                        />
                        <Form.Control.Feedback type="invalid">
                            Campo consumo na estrada não foi preenchido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        title={"Clique nesse botão para salvar os dados do veículo"}
                        variant="primary"
                        disabled={this.state.isLoading}
                    >
                        {this.state.isLoading ? 'Salvando…' : 'Salvar'}
                    </Button>
                </Form>
            </div>);
    }

    // componentDidMount() {
    //     this.setState({ isLoading: true })
    //     fetch('http://localhost:8080/cars/1')
    //     .then(res => res.json())
    //     .then((data) => {
    //         this.setState({
    //             id: data.id,
    //             nameCar: data.nameCar,
    //             plate: data.plate, 
    //             brand: data.brand,
    //             model: data.model,
    //             factoryDate: data.factoryDate,
    //             averageCity: data.averageCity,
    //             averageHighWay: data.averageHighWay,
    //             validated: data.validated,
    //             isLoading: false, 
    //         })
    //     })
    //     .catch(console.log)
    // } 
}

export default Car;
