import React from 'react'


//Input Fields
import TextField from '@material-ui/core/TextField';

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Buttons
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';


export const EditRow = ({row, updateRow, addRow, clearRow}) => {

	const getTableForms = (field) => {
		return (
			<TableCell key={field}>
				<TextField
					id="standard-bare"
					value={row[field]}
					onChange={(event)=> {
						updateRow(field, event.target.value)
					}}
				/>
			</TableCell>
		)
	}

	return (
		<TableRow key='asdasd'>
			<TableCell>
				<IconButton onClick={addRow} size="small" color="primary" aria-label="Add" >
					<AddIcon />
				</IconButton>
				<IconButton onClick={clearRow} size="small" color="primary" aria-label="Add" >
					<ClearIcon />
				</IconButton>
			</TableCell>
			{Object.keys(row).map((field) => {
				return getTableForms(field)
			})}
		</TableRow>
	)
}
