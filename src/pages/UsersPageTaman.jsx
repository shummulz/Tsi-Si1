import { UserCheck, UsersIcon, AlertTriangle, CreditCard, BarChart3, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTableSimplified from "../components/userstaman/UsersTableSimplified";
import PaymentAlertVisualization from "../components/userstaman/PaymentAlertVisualization";
import MaintenanceFeeVisualization from "../components/userstaman/MaintenanceFeeVisualization";
import AccessCardStatus from "../components/userstaman/AccessCardStatus";
import PaymentLeaderboard from "../components/userstaman/PaymentLeaderboard";
import { getStatistics, updateAllAccessCardStatus } from "../data/userData";

const UsersPage = () => {
	const userStats = getStatistics();
	const [activeTab, setActiveTab] = useState("residents");
	const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);

	// Handler for manual access card status update
	const handleUpdateAccessCards = () => {
		console.log("🔄 Manual access card update triggered...");
		const result = updateAllAccessCardStatus();
		alert(
			`Updated access card status!\n\nTotal users: ${result.totalUsers}\nStatus changes: ${result.changedUsers}\nBlocked users: ${result.blockedUsers}`
		);
		// Refresh the page to show updated data
		window.location.reload();
	};

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Taman Semarang Intan Si 1' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Residents'
						icon={UsersIcon}
						value={userStats.totalResidents.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='Paid This Month' icon={UserCheck} value={userStats.paidThisMonth} color='#10B981' />
					<StatCard
						name='Pending Payments'
						icon={CreditCard}
						value={userStats.pendingPayments}
						color='#F59E0B'
					/>
					<StatCard name='Critical Alerts' icon={AlertTriangle} value={userStats.criticalAlerts} color='#EF4444' />
				</motion.div>

				{/* ACCESS CARD UPDATE CONTROL */}
				{/* TAB NAVIGATION */}
				<motion.div
					className='mb-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.2 }}
				>
					<div className='flex flex-wrap gap-4 mb-4'>
						<button
							onClick={() => setActiveTab("residents")}
							className={`px-6 py-3 rounded-lg font-medium transition-all ${
								activeTab === "residents"
									? "bg-blue-600 text-white shadow-lg"
									: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
						>
							<Users className="inline w-5 h-5 mr-2" />
							Residents
						</button>
						<button
							onClick={() => setActiveTab("analytics")}
							className={`px-6 py-3 rounded-lg font-medium transition-all ${
								activeTab === "analytics"
									? "bg-blue-600 text-white shadow-lg"
									: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
						>
							<BarChart3 className="inline w-5 h-5 mr-2" />
							Analytics
						</button>
						<button
							onClick={() => setActiveTab("payments")}
							className={`px-6 py-3 rounded-lg font-medium transition-all ${
								activeTab === "payments"
									? "bg-blue-600 text-white shadow-lg"
									: "bg-gray-800 text-gray-300 hover:bg-gray-700"
							}`}
						>
							<Calendar className="inline w-5 h-5 mr-2" />
							LeaderBoard & Card Status
						</button>
					</div>
				</motion.div>

				{/* CONTENT BASED ON ACTIVE TAB */}
				{activeTab === "residents" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						{/* MANUAL UPDATE BUTTON */}
						<motion.div
							className='mb-6 flex justify-end'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.3 }}
						>
							<button
								onClick={handleUpdateAccessCards}
								className='bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2'
							>
								<CreditCard className='w-5 h-5' />
								<span>Update Access Cards</span>
							</button>
						</motion.div>

						{/* RESIDENTS TABLE */}
						<UsersTableSimplified />
					</motion.div>
				)}

				{activeTab === "analytics" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-8"
					>
						{/* SIMPLIFIED ANALYTICS VIEW */}
						<div className='mb-6'>
							<div className='flex justify-between items-center mb-4'>
								<h3 className='text-xl font-semibold text-gray-100'>Analytics Overview</h3>
								<button
									onClick={() => setShowAdvancedAnalytics(!showAdvancedAnalytics)}
									className='bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all'
								>
									{showAdvancedAnalytics ? 'Simple View' : 'Advanced View'}
								</button>
							</div>
						</div>

						{/* PAYMENT ALERT VISUALIZATION */}
						<PaymentAlertVisualization />

						{/* CONDITIONAL ADVANCED ANALYTICS */}
						{showAdvancedAnalytics && (
							<>
								{/* MAINTENANCE FEE ANALYTICS */}
								<MaintenanceFeeVisualization />
								
								{/* ACCESS CARD STATUS TRACKING */}
								<AccessCardStatus />
							</>
						)}
					</motion.div>
				)}

				{activeTab === "payments" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-8"
					>
						{/* PAYMENT LEADERBOARD */}
						<PaymentLeaderboard />
						
						{/* ACCESS CARD STATUS */}
						<AccessCardStatus />
					</motion.div>
				)}
			</main>
		</div>
	);
};
export default UsersPage;
