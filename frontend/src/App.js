import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup"
import Profile from "./components/Profile"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Signup />} />
				<Route path="/profile" element={<Profile />}/> {/* protect */}
			</Routes>
		</Router>
	);
}

export default App;
