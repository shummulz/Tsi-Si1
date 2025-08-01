import { motion } from "framer-motion";
import { AlertTriangle, Clock, Ban } from "lucide-react";
import { getCriticalUsers } from "../../data/userData";

const PaymentAlerts = () => {
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
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<div className="flex items-center mb-6">
				<AlertTriangle className="text-red-400 mr-3" size={24} />
				<h2 className='text-xl font-semibold text-gray-100'>Payment Alerts & Access Control</h2>
			</div>

			<div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4 mb-6">
				<div className="flex items-center mb-2">
					<Ban className="text-red-400 mr-2" size={20} />
					<h3 className="text-red-200 font-medium">Access Card Blocking Policy</h3>
				</div>
				<p className="text-red-300 text-sm">
					Residents with 3+ months overdue payments will have their access cards automatically blocked until payment is received.
				</p>
			</div>

			<div className="space-y-3">
				{criticalUsers.map((user) => (
					<motion.div
						key={user.id}
						className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 * user.id }}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold">
									{user.name.charAt(0)}
								</div>
								<div>
									<h4 className="text-white font-medium">{user.name}</h4>
									<p className="text-gray-400 text-sm">Unit {user.unit}</p>
								</div>
							</div>
							
							<div className="text-right">
								<div className="flex items-center space-x-2 mb-1">
									{getStatusIcon(user.status)}
									<span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
										{user.status}
									</span>
								</div>
								<p className="text-gray-400 text-xs">
									{user.monthsOverdue} months overdue
								</p>
							</div>
						</div>
						
						<div className="mt-3 pt-3 border-t border-gray-600">
							<div className="flex justify-between text-sm">
								<span className="text-gray-400">Last Payment:</span>
								<span className="text-gray-300">{user.lastPayment}</span>
							</div>
							<div className="flex justify-between text-sm mt-1">
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
									Restore Access
								</button>
							)}
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-6 text-center">
				<button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
					View All Overdue Accounts ({criticalUsers.length})
				</button>
			</div>
		</motion.div>
	);
};

export default PaymentAlerts;
