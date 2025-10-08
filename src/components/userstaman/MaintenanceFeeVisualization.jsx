import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { userData, getCurrentDate, getMonthlyMaintenanceData } from "../../data/userData";

const MaintenanceFeeVisualization = () => {
	// Process data for visualizations
	const processMaintenanceData = () => {
		const currentDate = getCurrentDate(); // Use centralized current date function
		
		// Calculate payment status distribution
		const paymentStatusData = [
			{ name: "Paid", value: userData.filter(u => u.paymentStatus === "Paid").length, color: "#10B981" },
			{ name: "Pending", value: userData.filter(u => u.paymentStatus === "Pending").length, color: "#F59E0B" },
			{ name: "Overdue", value: userData.filter(u => u.paymentStatus === "Overdue" || u.accessCard === "Blocked").length, color: "#EF4444" }
		];
		
		// Calculate monthly fee collection data - Now using dynamic data from userData
		const monthlyData = getMonthlyMaintenanceData();
		
		// Calculate overdue months distribution
		const overdueDistribution = userData.map(user => {
			const paymentForMonth = new Date(user.paymentForMonth);
			const monthsDiff = Math.floor((currentDate - paymentForMonth) / (1000 * 60 * 60 * 24 * 30));
			return { ...user, monthsOverdue: Math.max(monthsDiff, 0) };
		}).filter(user => user.monthsOverdue > 0);
		
		const overdueStats = [
			{ range: "1 Month", count: overdueDistribution.filter(u => u.monthsOverdue === 1).length },
			{ range: "2 Months", count: overdueDistribution.filter(u => u.monthsOverdue === 2).length },
			{ range: "3+ Months", count: overdueDistribution.filter(u => u.monthsOverdue >= 3).length }
		];
		
		return { paymentStatusData, monthlyData, overdueStats };
	};
	
	const { paymentStatusData, monthlyData, overdueStats } = processMaintenanceData();
	
	const totalExpected = monthlyData[monthlyData.length - 1]?.expected || 0;
	const totalCollected = monthlyData[monthlyData.length - 1]?.collected || 0;
	const collectionRate = ((totalCollected / totalExpected) * 100).toFixed(1);
	
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-100 mb-2">Maintenance Fee Analytics</h2>
				<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-green-500 rounded-full"></div>
						<span className="text-gray-300">Collection Rate: {collectionRate}%</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-red-500 rounded-full"></div>
						<span className="text-gray-300">Outstanding: RM{totalExpected - totalCollected}</span>
					</div>
				</div>
			</div>
			
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">{/*Changed from lg to xl for better mobile experience*/}
				{/* Payment Status Pie Chart */}
				<div className="bg-gray-900/50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-gray-100 mb-4">Payment Status Distribution</h3>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={paymentStatusData}
								cx="50%"
								cy="50%"
								outerRadius={80}
								dataKey="value"
								label={({ name, value }) => `${name}: ${value}`}
							>
								{paymentStatusData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip 
								contentStyle={{
									backgroundColor: "#1F2937",
									border: "1px solid #374151",
									borderRadius: "8px",
									color: "#F3F4F6"
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
				
				{/* Monthly Collection Trend */}
				<div className="bg-gray-900/50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-gray-100 mb-4">Monthly Collection Trend</h3>
					<ResponsiveContainer width="100%" height={250}>
						<LineChart data={monthlyData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis 
								dataKey="month" 
								stroke="#9CA3AF"
								fontSize={12}
							/>
							<YAxis stroke="#9CA3AF" fontSize={12} />
							<Tooltip 
								contentStyle={{
									backgroundColor: "#1F2937",
									border: "1px solid #374151",
									borderRadius: "8px",
									color: "#F3F4F6"
								}}
							/>
							<Line 
								type="monotone" 
								dataKey="expected" 
								stroke="#6B7280" 
								strokeDasharray="5 5"
								name="Expected"
							/>
							<Line 
								type="monotone" 
								dataKey="collected" 
								stroke="#10B981" 
								strokeWidth={2}
								name="Collected"
							/>
							<Line 
								type="monotone" 
								dataKey="overdueAmount" 
								stroke="#EF4444" 
								strokeWidth={2}
								name="Overdue Amount"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				
				{/* Overdue Distribution Bar Chart */}
				<div className="bg-gray-900/50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-gray-100 mb-4">Overdue Payments by Duration</h3>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={overdueStats}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis 
								dataKey="range" 
								stroke="#9CA3AF"
								fontSize={12}
							/>
							<YAxis stroke="#9CA3AF" fontSize={12} />
							<Tooltip 
								contentStyle={{
									backgroundColor: "#1F2937",
									border: "1px solid #374151",
									borderRadius: "8px",
									color: "#F3F4F6"
								}}
							/>
							<Bar 
								dataKey="count" 
								fill="#F59E0B"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
				
				{/* Key Metrics */}
				<div className="bg-gray-900/50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-gray-100 mb-4">Key Metrics</h3>
					<div className="space-y-4">
						<div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
							<span className="text-gray-300">Total Expected This Month</span>
							<span className="font-semibold text-gray-100">RM{totalExpected}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
							<span className="text-gray-300">Amount Collected</span>
							<span className="font-semibold text-green-400">RM{totalCollected}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
							<span className="text-gray-300">Outstanding Amount</span>
							<span className="font-semibold text-red-400">RM{totalExpected - totalCollected}</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
							<span className="text-gray-300">Collection Efficiency</span>
							<span className={`font-semibold ${collectionRate >= 80 ? 'text-green-400' : collectionRate >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
								{collectionRate}%
							</span>
						</div>
						<div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
							<span className="text-gray-300">Residents at Risk (3+ months)</span>
							<span className="font-semibold text-red-400">
								{userData.filter(u => u.accessCard === "Blocked").length}
							</span>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default MaintenanceFeeVisualization;
