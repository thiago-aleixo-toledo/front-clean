import React, { Component } from 'react';
import Car from "./Car";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/App.css';
import SimpleTable from './components/SimpleTable';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
		<Card.Header>
			<h2>Ficticius Clean - Limpeza</h2>
		</Card.Header>
		<Accordion defaultActiveKey="0">
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="0">
						<h4>Cadastro de veículo</h4>
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<Container fluid>
							<Row>
								<Col>
									<Car></Car>
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="1">
						<h4>Listagem de veículo</h4>
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						<Container fluid>
							<Row>
								<Col>
									<SimpleTable></SimpleTable>
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	</div>
  );
}

export default App;
