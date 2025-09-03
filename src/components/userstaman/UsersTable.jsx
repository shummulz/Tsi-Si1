import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, Clock, Ban, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { userData, getPaymentStatus, getAccessCardStatusWithReason } from "../../data/userData";

// ...existing code...

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);
	const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
	const [expandedCard, setExpandedCard] = useState(null);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => {
				const autoAccessCard = getAccessCardStatusWithReason(user);
				return (
					user.name.toLowerCase().includes(term) || 
					user.email.toLowerCase().includes(term) ||
					user.unit.toLowerCase().includes(term) ||
					user.paymentStatus.toLowerCase().includes(term) ||
					autoAccessCard.status.toLowerCase().includes(term)
				);
			}
		);
		setFilteredUsers(filtered);
	};

	// Helper function to calculate months overdue and alert status
	const getPaymentAlert = (user) => {
		const paymentInfo = getPaymentStatus(user);
		
		if (paymentInfo.monthsOverdue >= 3) {
			return { level: "critical", message: "Access Blocked", icon: Ban, color: "red" };
		} else if (paymentInfo.monthsOverdue >= 2) {
			return { level: "warning", message: "Final Warning", icon: AlertTriangle, color: "orange" };
		} else if (paymentInfo.monthsOverdue >= 1) {
			return { level: "notice", message: "Payment Overdue", icon: Clock, color: "yellow" };
		}
		return { level: "safe", message: "Up to Date", icon: null, color: "green" };
	};

	// Helper function to get leaderboard indicator based on consecutive payments
	const getLeaderboardIndicator = (user) => {
		// Show trophy for users with good consecutive on-time payments
		if (user.consecutiveOnTimePayments >= 12) {
			return { icon: Trophy, color: "text-yellow-400" }; // Gold trophy for 12+ consecutive payments
		} else if (user.consecutiveOnTimePayments >= 6) {
			return { icon: Trophy, color: "text-gray-300" }; // Silver trophy for 6+ consecutive payments
		}
		return { icon: null, color: "" };
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
					<h2 className='text-xl font-semibold text-gray-100'>Residents & Maintenance Fees</h2>
					
					{/* View Mode Toggle */}
					<div className="flex bg-gray-700 rounded-lg p-1">
						<button
							onClick={() => setViewMode("cards")}
							className={`px-3 py-1 rounded text-sm transition-all ${
								viewMode === "cards" 
									? "bg-blue-600 text-white" 
									: "text-gray-300 hover:text-white"
							}`}
						>
							Cards
						</button>
						<button
							onClick={() => setViewMode("table")}
							className={`px-3 py-1 rounded text-sm transition-all ${
								viewMode === "table" 
									? "bg-blue-600 text-white" 
									: "text-gray-300 hover:text-white"
							}`}
						>
							Table
						</button>
					</div>
				</div>
				
				<div className='relative w-full sm:w-auto'>
					<input
						type='text'
						placeholder='Search residents, units, payment status...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			{/* CARD VIEW - Mobile Friendly */}
			{viewMode === "cards" && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredUsers.map((user, index) => {
						const paymentAlert = getPaymentAlert(user);
						const autoStatus = getAccessCardStatusWithReason(user);
						const leaderboard = getLeaderboardIndicator(user);
						const isExpanded = expandedCard === user.id;

						return (
							<motion.div
								key={user.id}
								className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.05 }}
							>
								{/* Card Header */}
								<div className="flex justify-between items-start mb-3">
									<div>
										<div className="flex items-center gap-2">
											<h3 className="font-semibold text-gray-100">{user.name}</h3>
											{leaderboard.icon && (
												<leaderboard.icon className={`w-4 h-4 ${leaderboard.color}`} />
											)}
										</div>
										<p className="text-sm text-gray-400">Unit {user.unit}</p>
									</div>
									<button
										onClick={() => setExpandedCard(isExpanded ? null : user.id)}
										className="text-gray-400 hover:text-gray-200 transition-colors"
									>
										{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
									</button>
								</div>

								{/* Payment Status Badge */}
								<div className="flex items-center gap-2 mb-3">
									<span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
										paymentAlert.level === "critical" ? "bg-red-100 text-red-800" :
										paymentAlert.level === "warning" ? "bg-orange-100 text-orange-800" :
										paymentAlert.level === "notice" ? "bg-yellow-100 text-yellow-800" :
										"bg-green-100 text-green-800"
									}`}>
										{paymentAlert.icon && <paymentAlert.icon size={12} />}
										{paymentAlert.message}
									</span>
								</div>

								{/* Quick Info */}
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">Monthly Fee:</span>
										<span className="text-gray-200">RM{user.maintenanceFee}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">Access Card:</span>
										<span className={`${
											autoStatus.status === "Active" ? "text-green-400" : "text-red-400"
										}`}>
											{autoStatus.status}
										</span>
									</div>
								</div>

								{/* Expanded Details */}
								{isExpanded && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="mt-4 pt-4 border-t border-gray-700 space-y-2 text-sm"
									>
										<div className="flex justify-between">
											<span className="text-gray-400">Email:</span>
											<span className="text-gray-200">{user.email}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-400">Last Payment:</span>
											<span className="text-gray-200">{user.lastPayment}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-400">Due Date:</span>
											<span className="text-gray-200">{user.dueDate}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-400">Payment For:</span>
											<span className="text-gray-200">{user.paymentForMonth}</span>
										</div>
									</motion.div>
								)}
							</motion.div>
						);
					})}
				</div>
			)}

			{/* TABLE VIEW - Desktop */}
			{viewMode === "table" && (
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Resident
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Payment For
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Unit
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Monthly Fee
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Payment Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Access Card
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Last Payment
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Due Date
							</th>
							{/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th> */}
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => {
							const paymentAlert = getPaymentAlert(user);
							const AlertIcon = paymentAlert.icon;
							const LeaderboardIcon = getLeaderboardIndicator(user).icon;
							const leaderboardColor = getLeaderboardIndicator(user).color;
							
							// Get auto-calculated access card status
							const autoAccessCard = getAccessCardStatusWithReason(user);
							
							return (
								<motion.tr
									key={user.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
									className={paymentAlert.level === "critical" ? "bg-red-900/10" : ""}
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='flex items-center'>
											<div className='flex-shrink-0 h-10 w-10'>
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
													{user.name.charAt(0)}
												</div>
											</div>
											<div className='ml-4'>
												<div className='text-sm font-medium text-gray-100 flex items-center space-x-2'>
													<span>{user.name}</span>
													{AlertIcon && (
														<AlertIcon 
															size={16} 
															className={`${
																paymentAlert.color === "red" ? "text-red-400" :
																paymentAlert.color === "orange" ? "text-orange-400" :
																"text-yellow-400"
															}`}
														/>
													)}
													{LeaderboardIcon && (
														<LeaderboardIcon 
															size={16} 
															className={`${
																leaderboardColor
															}`}
														/>
													)}
												</div>
												<div className='text-sm text-gray-400'>{user.email}</div>
											</div>
										</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.paymentForMonth || "N/A"}</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-gray-300'>{user.unit}</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-gray-100'>RM{user.maintenanceFee}</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className="flex flex-col space-y-1">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													user.paymentStatus === "Paid"
														? "bg-green-800 text-green-100"
														: "bg-orange-800 text-orange-100"
												}`}
											>
												{user.paymentStatus}
											</span>
											{paymentAlert.level !== "safe" && (
												<span className={`text-xs ${
													paymentAlert.color === "red" ? "text-red-400" :
													paymentAlert.color === "orange" ? "text-orange-400" :
													"text-yellow-400"
												}`}>
													{paymentAlert.message}
												</span>
											)}
										</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className="flex flex-col space-y-1">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													autoAccessCard.status === "Active"
														? "bg-green-800 text-green-100"
														: "bg-red-800 text-red-100"
												}`}
											>
												{autoAccessCard.status}
											</span>
											{autoAccessCard.monthsOverdue > 0 && (
												<span className="text-xs text-gray-400">
													{autoAccessCard.reason}
												</span>
											)}
										</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.lastPayment}</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap'>
										<div className={`text-sm ${
											paymentAlert.level === "critical" || paymentAlert.level === "warning" || paymentAlert.level === "notice"
												? "text-red-300"
												: "text-gray-300"
										}`}>
											{user.dueDate}
											{paymentAlert.level !== "safe" && (
												<div className="text-xs text-red-400">Overdue</div>
											)}
										</div>
									</td>

									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										{/* <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
										<button className='text-red-400 hover:text-red-300'>Delete</button> */}
									</td>
								</motion.tr>
							);
						})}
					</tbody>
				</table>
			</div>
			)}
		</motion.div>
	);
};

export default UsersTable;
