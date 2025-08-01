import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "./components/common/Sidebar";

import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPageTaman from "./pages/UsersPageTaman";
import { initializeAccessCardStatus } from "./data/userData";

function App() {
	// Initialize access card status on app startup
	useEffect(() => {
		console.log("🏠 Property Management Dashboard - Starting up...");
		initializeAccessCardStatus();
	}, []);

	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<UsersPageTaman />} />
				<Route path='/userstaman' element={<UsersPageTaman />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;
