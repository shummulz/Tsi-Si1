import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Bell, Settings, Ban, Clock } from "lucide-react";
import { getCriticalUsers } from "../../data/userData";

const PaymentSidebar = ({ isOpen, onClose }) => {
	const [activeTab, setActiveTab] = useState("alerts");
	const criticalUsers = getCriticalUsers();

	const getStatusIcon = (status) => {
		switch (status) {
			case "Access Blocked":
				return <Ban size={16} className="text-red-400" />;
			case "Final Warning":
				return <AlertTriangle size={16} className="text-orange-400" />;
			default:
				return <Clock size={16} className="text-yellow-400" />;
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Access Blocked":
				return "bg-red-800 text-red-100";
			case "Final Warning":
				return "bg-orange-800 text-orange-100";
			default:
				return "bg-yellow-800 text-yellow-100";
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>
					
					{/* Sidebar */}
					<motion.div
						className="fixed right-0 top-0 h-full w-96 bg-gray-800 bg-opacity-95 backdrop-blur-md shadow-2xl z-50 border-l border-gray-700"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-700">
							<div className="flex items-center space-x-3">
								<AlertTriangle className="text-red-400" size={24} />
								<h2 className="text-xl font-semibold text-gray-100">Payment & Alerts</h2>
							</div>
							<button
								onClick={onClose}
								className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
							>
								<X size={20} className="text-gray-400" />
							</button>
						</div>

						{/* Tabs */}
						<div className="flex border-b border-gray-700">
							<button
								onClick={() => setActiveTab("alerts")}
								className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
									activeTab === "alerts"
										? "text-red-400 border-b-2 border-red-400 bg-gray-700 bg-opacity-50"
										: "text-gray-400 hover:text-gray-300"
								}`}
							>
								<Bell size={16} className="inline mr-2" />
								Critical Alerts
							</button>
							<button
								onClick={() => setActiveTab("settings")}
								className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
									activeTab === "settings"
										? "text-blue-400 border-b-2 border-blue-400 bg-gray-700 bg-opacity-50"
										: "text-gray-400 hover:text-gray-300"
								}`}
							>
								<Settings size={16} className="inline mr-2" />
								Settings
							</button>
						</div>

						{/* Content */}
						<div className="flex-1 overflow-y-auto p-6">
							{activeTab === "alerts" && (
								<div className="space-y-4">
									{/* Policy Notice */}
									<div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4">
										<div className="flex items-center mb-2">
											<Ban className="text-red-400 mr-2" size={20} />
											<h3 className="text-red-200 font-medium">Access Card Policy</h3>
										</div>
										<p className="text-red-300 text-sm">
											Residents with 3+ months overdue payments will have their access cards automatically blocked.
										</p>
									</div>

									{/* Critical Users List */}
									<div className="space-y-3">
										<h3 className="text-gray-200 font-medium mb-3">
											Critical Cases ({criticalUsers.length})
										</h3>
										
										{criticalUsers.map((user) => (
											<motion.div
												key={user.id}
												className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.1 * user.id }}
											>
												<div className="flex items-center justify-between mb-3">
													<div className="flex items-center space-x-3">
														<div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
															{user.name.charAt(0)}
														</div>
														<div>
															<h4 className="text-white font-medium text-sm">{user.name}</h4>
															<p className="text-gray-400 text-xs">Unit {user.unit}</p>
														</div>
													</div>
													
													<div className="text-right">
														<div className="flex items-center space-x-2 mb-1">
															{getStatusIcon(user.status)}
															<span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
																{user.status}
															</span>
														</div>
													</div>
												</div>
												
												<div className="space-y-2 text-xs">
													<div className="flex justify-between">
														<span className="text-gray-400">Months Overdue:</span>
														<span className="text-red-400 font-medium">{user.monthsOverdue}</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-400">Last Payment:</span>
														<span className="text-gray-300">{user.lastPayment}</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-400">Amount Due:</span>
														<span className="text-red-400 font-medium">RM{user.amountDue}</span>
													</div>
												</div>
												
												<div className="mt-3 flex space-x-2">
													<button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors">
														Send Notice
													</button>
													<button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded transition-colors">
														Record Payment
													</button>
													{user.status === "Access Blocked" && (
														<button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs py-2 px-3 rounded transition-colors">
															Restore
														</button>
													)}
												</div>
											</motion.div>
										))}
									</div>

									{/* Quick Actions */}
									<div className="mt-6 pt-4 border-t border-gray-700">
										<h3 className="text-gray-200 font-medium mb-3">Quick Actions</h3>
										<div className="space-y-2">
											<button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded transition-colors">
												Block All Overdue Access Cards
											</button>
											<button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors">
												Send Bulk Payment Reminders
											</button>
											<button className="w-full bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded transition-colors">
												Generate Payment Report
											</button>
										</div>
									</div>
								</div>
							)}

							{activeTab === "settings" && (
								<div className="space-y-4">
									<h3 className="text-gray-200 font-medium mb-4">Payment Settings</h3>
									
									{/* Auto Block Settings */}
									<div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
										<h4 className="text-gray-200 font-medium mb-3">Auto-Block Settings</h4>
										<div className="space-y-3">
											<div>
												<label className="block text-sm text-gray-400 mb-1">
													Block access after (months):
												</label>
												<input
													type="number"
													defaultValue="3"
													className="w-full bg-gray-600 text-white rounded px-3 py-2 text-sm"
												/>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-400">Enable auto-blocking</span>
												<div className="relative">
													<input type="checkbox" defaultChecked className="sr-only" />
													<div className="w-10 h-6 bg-green-600 rounded-full shadow-inner"></div>
													<div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 right-1 transition"></div>
												</div>
											</div>
										</div>
									</div>

									{/* Notification Settings */}
									<div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
										<h4 className="text-gray-200 font-medium mb-3">Notifications</h4>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-400">Email reminders</span>
												<div className="relative">
													<input type="checkbox" defaultChecked className="sr-only" />
													<div className="w-10 h-6 bg-green-600 rounded-full shadow-inner"></div>
													<div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 right-1 transition"></div>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-400">SMS alerts</span>
												<div className="relative">
													<input type="checkbox" className="sr-only" />
													<div className="w-10 h-6 bg-gray-600 rounded-full shadow-inner"></div>
													<div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition"></div>
												</div>
											</div>
										</div>
									</div>

									{/* Payment Due Dates */}
									<div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
										<h4 className="text-gray-200 font-medium mb-3">Payment Schedule</h4>
										<div className="space-y-3">
											<div>
												<label className="block text-sm text-gray-400 mb-1">
													Monthly due date:
												</label>
												<select className="w-full bg-gray-600 text-white rounded px-3 py-2 text-sm">
													<option value="5">5th of each month</option>
													<option value="1">1st of each month</option>
													<option value="15">15th of each month</option>
													<option value="30">Last day of month</option>
												</select>
											</div>
											<div>
												<label className="block text-sm text-gray-400 mb-1">
													Grace period (days):
												</label>
												<input
													type="number"
													defaultValue="7"
													className="w-full bg-gray-600 text-white rounded px-3 py-2 text-sm"
												/>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default PaymentSidebar;
