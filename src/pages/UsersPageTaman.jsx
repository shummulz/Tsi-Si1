import { UserCheck, UsersIcon, AlertTriangle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTableTaman from "../components/userstaman/UsersTable";
import UserGrowthChartTaman from "../components/userstaman/UserGrowthChart";
import UserActivityHeatmapTaman from "../components/userstaman/UserActivityHeatmap";
import UserDemographicsChartTaman from "../components/userstaman/UserDemographicsChart";
import PaymentAlertVisualization from "../components/userstaman/PaymentAlertVisualization";
import MaintenanceFeeVisualization from "../components/userstaman/MaintenanceFeeVisualization";
import AccessCardStatus from "../components/userstaman/AccessCardStatus";
import PaymentLeaderboard from "../components/userstaman/PaymentLeaderboard";
import { getStatistics, updateAllAccessCardStatus } from "../data/userData";

const UsersPage = () => {
	const userStats = getStatistics();

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
				<motion.div
					className='mb-6 flex justify-end'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.2 }}
				>
					<button
						onClick={handleUpdateAccessCards}
						className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2'
					>
						<CreditCard size={16} />
						<span>Update Access Cards</span>
					</button>
				</motion.div>

				{/* PAYMENT LEADERBOARD */}
				<div className='mb-8'>
					<PaymentLeaderboard />
				</div>

				<UsersTableTaman />

				{/* PAYMENT ALERT VISUALIZATION */}
				<div className='mt-8'>
					<PaymentAlertVisualization />
				</div>

				{/* MAINTENANCE FEE ANALYTICS */}
				<div className='mt-8'>
					<MaintenanceFeeVisualization />
				</div>

				{/* ACCESS CARD STATUS TRACKING */}
				<div className='mt-8'>
					<AccessCardStatus />
				</div>

				{/* USER CHARTS */}
				{/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChartTaman />
					<UserActivityHeatmapTaman />
					<UserDemographicsChartTaman />
				</div> */}
			</main>
		</div>
	);
};
export default UsersPage;
