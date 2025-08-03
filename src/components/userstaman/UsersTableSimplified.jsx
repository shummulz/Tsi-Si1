import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, Clock, Ban, Trophy, ChevronDown, ChevronUp, User, CreditCard } from "lucide-react";
import { userData, getPaymentStatus, getAccessCardStatusWithReason } from "../../data/userData";

const UsersTableSimplified = () => {
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

	// Helper function to get leaderboard indicator
	const getLeaderboardIndicator = (user) => {
		if (user.consecutiveOnTimePayments >= 12) {
			return { icon: Trophy, color: "text-yellow-400" };
		} else if (user.consecutiveOnTimePayments >= 6) {
			return { icon: Trophy, color: "text-gray-300" };
		}
		return { icon: null, color: "" };
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			{/* Header */}
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
						placeholder='Search residents...'
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
								className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.05 }}
								onClick={() => setExpandedCard(isExpanded ? null : user.id)}
							>
								{/* Card Header */}
								<div className="flex justify-between items-start mb-3">
									<div className="flex items-center gap-2">
										<User className="w-8 h-8 text-gray-400 bg-gray-700 rounded-full p-1" />
										<div>
											<div className="flex items-center gap-2">
												<h3 className="font-semibold text-gray-100">{user.name}</h3>
												{leaderboard.icon && (
													<leaderboard.icon className={`w-4 h-4 ${leaderboard.color}`} />
												)}
											</div>
											<p className="text-sm text-gray-400">Unit {user.unit}</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										{isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
									</div>
								</div>

								{/* Payment Status Badge */}
								<div className="flex items-center justify-between mb-3">
									<span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
										paymentAlert.level === "critical" ? "bg-red-900/50 text-red-300 border border-red-700" :
										paymentAlert.level === "warning" ? "bg-orange-900/50 text-orange-300 border border-orange-700" :
										paymentAlert.level === "notice" ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700" :
										"bg-green-900/50 text-green-300 border border-green-700"
									}`}>
										{paymentAlert.icon && <paymentAlert.icon size={12} />}
										{paymentAlert.message}
									</span>
									<CreditCard className={`w-4 h-4 ${
										autoStatus.status === "Active" ? "text-green-400" : "text-red-400"
									}`} />
								</div>

								{/* Quick Info */}
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">Last Payment:</span>
										<span className="text-gray-200 font-medium">{user.lastPayment}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">Payment For:</span>
										<span className="text-gray-200 font-medium">{user.paymentForMonth}</span>
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
											<span className="text-gray-200 text-right break-all">{user.email}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-400">Monthly Fee:</span>
											<span className="text-gray-200">RM{user.maintenanceFee}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-400">Due Date:</span>
											<span className="text-gray-200">{user.dueDate}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-400">Access Status:</span>
											<span className={`${
												autoStatus.status === "Active" ? "text-green-400" : "text-red-400"
											}`}>
												{autoStatus.status}
											</span>
										</div>
									</motion.div>
								)}
							</motion.div>
						);
					})}
				</div>
			)}

			{/* TABLE VIEW - Desktop Only */}
			{viewMode === "table" && (
				<div className='overflow-x-auto hidden md:block'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Resident
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Unit
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Last Payment
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Payment Status
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Access Card
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Payment For
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-700'>
							{filteredUsers.map((user, index) => {
								const paymentAlert = getPaymentAlert(user);
								const autoStatus = getAccessCardStatusWithReason(user);
								const leaderboard = getLeaderboardIndicator(user);

								return (
									<motion.tr
										key={user.id}
										className='hover:bg-gray-700/50 transition-colors'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: index * 0.05 }}
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center'>
												<div className='flex-shrink-0 h-10 w-10'>
													<User className="w-10 h-10 text-gray-400 bg-gray-700 rounded-full p-2" />
												</div>
												<div className='ml-4'>
													<div className='flex items-center gap-2'>
														<div className='text-sm font-medium text-gray-100'>{user.name}</div>
														{leaderboard.icon && (
															<leaderboard.icon className={`w-4 h-4 ${leaderboard.color}`} />
														)}
													</div>
													<div className='text-sm text-gray-400'>{user.email}</div>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											{user.unit}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium'>
											{user.lastPayment}
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
												paymentAlert.level === "critical" ? "bg-red-900/50 text-red-300" :
												paymentAlert.level === "warning" ? "bg-orange-900/50 text-orange-300" :
												paymentAlert.level === "notice" ? "bg-yellow-900/50 text-yellow-300" :
												"bg-green-900/50 text-green-300"
											}`}>
												{paymentAlert.icon && <paymentAlert.icon size={12} />}
												{paymentAlert.message}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
												autoStatus.status === "Active" 
													? "bg-green-900/50 text-green-300" 
													: "bg-red-900/50 text-red-300"
											}`}>
												<CreditCard size={12} />
												{autoStatus.status}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium'>
											{user.paymentForMonth}
										</td>
									</motion.tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			{/* Mobile Table Fallback */}
			{viewMode === "table" && (
				<div className="md:hidden">
					<div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
						<p className="text-blue-300 text-sm">
							📱 Table view is optimized for desktop. Switch to "Cards" view for better mobile experience.
						</p>
					</div>
				</div>
			)}

			{/* Results Count */}
			<div className="mt-4 text-center text-sm text-gray-400">
				Showing {filteredUsers.length} of {userData.length} residents
			</div>
		</motion.div>
	);
};

export default UsersTableSimplified;
