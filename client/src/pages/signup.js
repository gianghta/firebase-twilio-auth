import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import Copyright from '../util/copyright';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progress: {
		position: 'absolute'
	}
});

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phoneNumber: '',
			loading: false
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const userData = {
			phoneNumber: this.state.phoneNumber
		};

		try {
			const response = await axios.post('https://access-code-generation.web.app/create', userData);
			console.log(response);
			this.setState({
				loading: false
			});
		} catch (err) {
			console.log(err);
			this.setState({
				loading: false
			});
		}
	};

	render() {
		const { classes } = this.props;
		const { loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Firebase Twilio Example App
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						Please enter a US Phone number, prefix with the area code (+1)
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="phoneNumber"
							label="Phone number"
							name="phoneNumber"
							autoComplete="phoneNumber"
							onChange={this.handleChange}
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || !this.state.phoneNumber}
						>
							Generate Access Code
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		);
	}
}

export default withStyles(styles)(SignUp);
