import { Routes, Route, Navigate } from "react-router-dom";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<main>
			<Routes>
				{/* Redirects user from "/" to "/categories" */}
				<Route
					path='/'
					element={<Navigate to='/categories' replace />}
				></Route>

				{/* Category routes */}
				<Route path='/categories'>
					<Route index element={<Categories />}></Route>
					<Route path=':category' element={<Category />}></Route>
				</Route>

				{/* Default page-not-found */}
				<Route path='*' element={<PageNotFound />}></Route>
			</Routes>
		</main>
	);
}

export default App;
