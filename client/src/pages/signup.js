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
			accessCode: '',
			loading: false,
			send: false,
			success: false,
			message: ''
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
		const phoneNumberData = {
			phoneNumber: this.state.phoneNumber
		};

		const accessCodeData = {
			accessCode: this.state.accessCode
		};

		try {
			if (!this.state.send) {
				const response = await axios.post('https://access-code-generation.web.app/create', phoneNumberData);
				this.setState({
					send: true
				});
			} else {
				const response = await axios.post('https://access-code-generation.web.app/validate', accessCodeData);
				this.setState({
					success: true,
					message: JSON.stringify(response.data)
				});
			}

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
						<br />
						For example: +10123456789
					</Typography>
					<form className={classes.form} noValidate>
						{!this.state.send ? (
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
								value={this.state.phoneNumber}
								autoFocus
							/>
						) : (
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="accessCode"
								label="Access Code"
								name="accessCode"
								autoComplete="accessCode"
								onChange={this.handleChange}
								value={this.state.accessCode}
								autoFocus
							/>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || !this.state.phoneNumber}
						>
							{!this.state.send ? 'Generate Access Code' : 'Enter Access Code'}
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
					</form>
					<br />
					<Typography variant="subtitle1" gutterBottom>
						{!this.state.success ? '' : this.state.message}
					</Typography>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		);
	}
}

export default withStyles(styles)(SignUp);
