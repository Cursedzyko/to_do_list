import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				</Routes>
		</Router>
	);
}

export default App;
