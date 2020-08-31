
import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';


const headCells = [
    { index: 0, id: 'nameCar', align:"left", numeric: false, disablePadding: true, label: 'Veículo' },
    { index: 1, id: 'plate', align:"left", numeric: false, disablePadding: false, label: 'Placa' },
    { index: 2, id: 'brand', align:"left", numeric: false, disablePadding: false, label: 'Marca' },
    { index: 3, id: 'model', align:"left", numeric: false, disablePadding: false, label: 'Modelo' },
    { index: 4, id: 'factoryDate', align:"right", numeric: false, disablePadding: false, label: 'Data de fabricação' },
    { index: 5, id: 'averageCity', align:"right", numeric: true, disablePadding: false, label: 'Consumo cidade (Km/L)' },
    { index: 6, id: 'averageHighWay', align:"right", numeric: true, disablePadding: false, label: 'Consumo estrada (Km/L)' },
];

class HeaderTable extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            headerOrder: props.order,
            headerOrderBy: props.orderBy,
            parentHandlerOrderBy: props.handlerOrderBy
        };
        this.handleRequestSort = this.handleRequestSort.bind(this);
    }

    handleRequestSort(property) {
        const isAsc = this.state.headerOrderBy === property && this.state.headerOrder === 'asc';
        const order = isAsc ? 'desc' : 'asc';
        this.setState({headerOrder: order});
        this.setState({headerOrderBy: property});
        this.state.parentHandlerOrderBy(order, property);
    };

    render() {
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell key={headCell.index} align={headCell.align}>         
                            <TableSortLabel
                                active={this.state.headerOrderBy === headCell.id}
                                direction={this.state.headerOrderBy === headCell.id ? this.state.headerOrder : 'asc'}
                                onClick={() => this.handleRequestSort(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

export default HeaderTable;

