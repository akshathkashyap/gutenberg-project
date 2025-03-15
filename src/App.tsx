import { Routes, Route, Navigate } from "react-router-dom";
import Categories from "./pages/Categories";
import Category from "./pages/Category";

function App() {
	return (
		<main>
			<Routes>
				{/* Redirects user from "/" to "/categories" */}
				<Route
					path='/'
					element={<Navigate to='/categories' replace />}
				></Route>

				{/* All categories page */}
				<Route path='/categories' element={<Categories />}></Route>

				{/* Specific category page */}
				<Route
					path='/categories/:category'
					element={<Category />}
				></Route>

				{/* Default page-not-found */}
				<Route path='*'></Route>
			</Routes>
		</main>
	);
}

export default App;
