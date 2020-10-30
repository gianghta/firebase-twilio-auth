import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/signup';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={SignUp} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
