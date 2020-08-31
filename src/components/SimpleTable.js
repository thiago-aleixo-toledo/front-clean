import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HeaderTable from './Table/HeaderTable';
import TablePagination from '@material-ui/core/TablePagination';

class SimpleTable extends Component {

	constructor(props) {
		super(props);
        this.state = {
            order: 'asc',
			orderBy: 'nameCar',
			page: 0,
			rowsPerPage: 5,
			rows: []
		};
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
		this.handlerOrderBy = this.handlerOrderBy.bind(this);
		this.setVeiculesInfo = this.setVeiculesInfo.bind(this); 
    }
  
  	descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}
  
	getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => this.descendingComparator(a, b, orderBy)
			: (a, b) => -this.descendingComparator(a, b, orderBy);
	}

	handleChangePage (event, newPage) {
		this.setState({page: newPage});
	};

	handleChangeRowsPerPage (event) {
		this.setState({rowsPerPage: parseInt(event.target.value)});
		this.setState({page: 0});
	};

	stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
		  const order = comparator(a[0], b[0]);
		  if (order !== 0) return order;
		  return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	handlerOrderBy(order, orderBy) {
		this.setState({order: order});
        this.setState({orderBy: orderBy});
	}

	createData(id, nameCar, plate, brand,	model, factoryDate, averageCity, averageHighWay) {
		return {id, nameCar, plate, brand,	model, factoryDate, averageCity, averageHighWay} ;
	}

	setVeiculesInfo(veiculeInfo) {
		this.props.handleVeiculeInfo(veiculeInfo);
	}

 	render() {
		return (
			<Paper>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<HeaderTable
							order={this.state.order}
							orderBy={this.state.orderBy}
							handlerOrderBy={this.handlerOrderBy}
						></HeaderTable>
						<TableBody>
							{this.stableSort(this.state.rows, this.getComparator(this.state.order, this.state.orderBy))
								.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
								.map((row, index) => (
										<TableRow key={index} onDoubleClick={() => this.setVeiculesInfo(row)}>
										<TableCell key={0} component="th" scope="row">
											{row.nameCar}
										</TableCell>
										<TableCell key={1} align="left">{row.plate}</TableCell>
										<TableCell key={2} align="left">{row.brand}</TableCell>
										<TableCell key={3} align="left">{row.model}</TableCell>
										<TableCell key={4} align="right">{row.factoryDate}</TableCell>
										<TableCell key={5} align="right">{row.averageCity}</TableCell>
										<TableCell key={6} align="right">{row.averageHighWay}</TableCell>
										</TableRow>
									)
								)
							}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, { value: this.state.rows.length, label: 'Todos' }]}
						component="Paper"
						count={this.state.rows.length}
						rowsPerPage={this.state.rowsPerPage}
						page={this.state.page}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				</TableContainer>
			</Paper>
  		);
	}

	componentDidMount() {
        this.setState({ isLoading: true })
        fetch('http://localhost:8080/cars')
        .then(res => res.json())
        .then((data) => {
			let veiculesArray = [];
			data.content.forEach(element => {
				console.log(element);
				let veicules = this.createData(
					element.idCar,
					element.nameCar,
					element.plate,
					element.brand,
					element.model,
					new Date(element.factoryDate).toLocaleDateString(),
					parseFloat(element.averageCity).toLocaleString(),
					parseFloat(element.averageHighWay).toLocaleString()
				);
				veiculesArray.push(veicules);
			})
			this.setState({ rows: veiculesArray});
        })
        .catch(console.log)
    } 
}
export default SimpleTable;