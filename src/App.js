import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import services from './service';

//Modal
import Modal from '@material-ui/core/Modal';

//Buttons
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

//Table
import {EditRow} from './components/EditRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Layout
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

//Input Fields
import TextField from '@material-ui/core/TextField';


class App extends Component {

	state = {
	    notes : [],
			currentNote : {
	    	date: '',
				title: '',
				description: '',
				content: '',
				slug: '',
			},
			importModalOpen: false
	}

	componentDidMount() {
	    services.fetchAllNotes()
	        .then(({data}) => {
	                this.setState((prev) => {
	                    return {
	                        notes: data.data.notes
	                    }
	                })
	        })
	        .catch(console.log)
	}

	updateNote = (key, value) => {
		this.setState((prevState, props)=> {
			return {
				...prevState,
				currentNote: {
					...prevState.currentNote,
					[key] : value,
				}
			}
		})
	}

	addNote = () => {
		services.saveNote(this.state.currentNote)
			.then((response) => {
				this.setState((prevState, props) => {
					return {
						...prevState,
						notes: [...prevState.notes, response.data.record]
					}
				})
			})

	}

	deleteNote = (id) => {
		services.deleteNote(id)
		this.setState((prevState) => {
			const newArray = [...prevState.notes]
			newArray.splice(this.findNoteByID(id), 1)
			return {
				...prevState,
				notes: newArray
			}
		})
	}

	clearNoteField = () => {
		this.setState((prevState) => {
			const refreshedNote = {...prevState.currentNote}

			Object.keys(refreshedNote).forEach((key) => {
				refreshedNote[key] = ''
			})

			return {
				...prevState,
				currentNote: refreshedNote
			}
		})
	}

	findNoteByID = (id) => {
		let indexId;
		this.state.notes.forEach((note, index) => {
			if (note.id === id) {
				indexId = index;
			}
		})
		return indexId
	}

	openModal = () => {
		this.setState({
			importModalOpen: true
		})
	}

	closeModal = () => {
		this.setState((prevState)=> {
			return {
				importModalOpen: false
			}
		})
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<Paper>
						<Card>
							<CardContent>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell></TableCell>
											<TableCell>Date</TableCell>
											<TableCell>Title</TableCell>
											<TableCell>Description</TableCell>
											<TableCell>Content</TableCell>
											<TableCell>Slug</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<EditRow
											row={this.state.currentNote}
											addRow={this.addNote}
											updateRow={this.updateNote}
											clearRow={this.clearNoteField}
										/>
										{this.state.notes.map((note, index) => {
											return (
												<TableRow key={note.id}>
													<TableCell>
														<IconButton
															onClick={() => {this.deleteNote(note.id)}}
															size="small"
															color="primary"
															aria-label="Add"
														>
															<DeleteIcon />
														</IconButton>
													</TableCell>
													<TableCell>{note.date}</TableCell>
													<TableCell>{note.title}</TableCell>
													<TableCell>{note.description}</TableCell>
													<TableCell>{note.content}</TableCell>
													<TableCell>{note.slug}</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
								<CardActions>
									<Button
										onClick={this.openModal}
									>
										Import Document
									</Button>
								</CardActions>
							</CardContent>
						</Card>
						<Modal
							onBackdropClick={this.closeModal}
							open={this.state.importModalOpen}
							onClose={this.closeModal}
						>
							<Card>
								<p>Hey</p>
							</Card>
						</Modal>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default App;
