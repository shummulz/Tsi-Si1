import { motion } from "framer-motion";
import { AlertTriangle, Clock, CreditCard, Ban, User } from "lucide-react";
import { userData, getPaymentStatus } from "../../data/userData";

const PaymentAlertVisualization = () => {
	// Calculate payment alerts based on last payment date
	const getPaymentAlerts = () => {
		return userData.map(user => {
			const paymentInfo = getPaymentStatus(user);
			
			let alertLevel = "safe";
			let alertMessage = "Payment up to date";
			let alertColor = "green";
			let icon = CreditCard;
			
			if (paymentInfo.monthsOverdue >= 3) {
				alertLevel = "critical";
				alertMessage = "Access card blocked";
				alertColor = "red";
				icon = Ban;
			} else if (paymentInfo.monthsOverdue >= 2) {
				alertLevel = "warning";
				alertMessage = "Final warning - 1 month to card block";
				alertColor = "orange";
				icon = AlertTriangle;
			} else if (paymentInfo.monthsOverdue >= 1) {
				alertLevel = "notice";
				alertMessage = "Payment overdue";
				alertColor = "yellow";
				icon = Clock;
			}
			
			return {
				...user,
				...paymentInfo,
				alertLevel,
				alertMessage,
				alertColor,
				icon
			};
		}).filter(user => user.monthsOverdue > 0); // Only show users with overdue payments
	};
	
	const alertUsers = getPaymentAlerts();
	const criticalUsers = alertUsers.filter(user => user.alertLevel === "critical");
	const warningUsers = alertUsers.filter(user => user.alertLevel === "warning");
	const noticeUsers = alertUsers.filter(user => user.alertLevel === "notice");
	
	const AlertCard = ({ user }) => {
		const IconComponent = user.icon;
		
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={`p-4 rounded-lg border-l-4 ${
					user.alertColor === "red" 
						? "bg-red-900/30 border-red-500" 
						: user.alertColor === "orange"
						? "bg-orange-900/30 border-orange-500"
						: "bg-yellow-900/30 border-yellow-500"
				}`}
			>
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3">
						<IconComponent 
							className={`mt-0.5 ${
								user.alertColor === "red" 
									? "text-red-400" 
									: user.alertColor === "orange"
									? "text-orange-400"
									: "text-yellow-400"
							}`}
							size={20}
						/>
						<div>
							<h4 className="font-semibold text-gray-100">{user.name}</h4>
							<p className="text-sm text-gray-300">Unit: {user.unit}</p>
							<p className={`text-sm font-medium ${
								user.alertColor === "red" 
									? "text-red-400" 
									: user.alertColor === "orange"
									? "text-orange-400"
									: "text-yellow-400"
							}`}>
								{user.alertMessage}
							</p>
						</div>
					</div>
					<div className="text-right">
						<p className="text-sm text-gray-400">{user.monthsOverdue} months overdue</p>
						<p className="font-semibold text-gray-100">RM{user.totalDue} due</p>
					</div>
				</div>
			</motion.div>
		);
	};
	
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Payment Alert Dashboard</h2>
				<div className="flex items-center space-x-2">
					<User className="text-gray-400" size={20} />
					<span className="text-gray-400">{alertUsers.length} residents need attention</span>
				</div>
			</div>
			
			{/* Alert Summary */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-red-400 text-sm font-medium">Critical (3+ months)</p>
							<p className="text-2xl font-bold text-red-300">{criticalUsers.length}</p>
							<p className="text-xs text-red-400">Access cards blocked</p>
						</div>
						<Ban className="text-red-400" size={24} />
					</div>
				</div>
				
				<div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-orange-400 text-sm font-medium">Warning (2 months)</p>
							<p className="text-2xl font-bold text-orange-300">{warningUsers.length}</p>
							<p className="text-xs text-orange-400">Final warning stage</p>
						</div>
						<AlertTriangle className="text-orange-400" size={24} />
					</div>
				</div>
				
				<div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-yellow-400 text-sm font-medium">Notice (1 month)</p>
							<p className="text-2xl font-bold text-yellow-300">{noticeUsers.length}</p>
							<p className="text-xs text-yellow-400">Payment overdue</p>
						</div>
						<Clock className="text-yellow-400" size={24} />
					</div>
				</div>
			</div>
			
			{/* Alert Details */}
			{alertUsers.length > 0 ? (
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-100 mb-4">Resident Alerts</h3>
					{criticalUsers.length > 0 && (
						<div>
							<h4 className="text-red-400 font-medium mb-2">🚨 Critical - Access Cards Blocked</h4>
							<div className="space-y-2">
								{criticalUsers.map(user => (
									<AlertCard key={user.id} user={user} />
								))}
							</div>
						</div>
					)}
					
					{warningUsers.length > 0 && (
						<div>
							<h4 className="text-orange-400 font-medium mb-2">⚠️ Final Warning</h4>
							<div className="space-y-2">
								{warningUsers.map(user => (
									<AlertCard key={user.id} user={user} />
								))}
							</div>
						</div>
					)}
					
					{noticeUsers.length > 0 && (
						<div>
							<h4 className="text-yellow-400 font-medium mb-2">📋 Payment Notice</h4>
							<div className="space-y-2">
								{noticeUsers.map(user => (
									<AlertCard key={user.id} user={user} />
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="text-center py-8">
					<CreditCard className="mx-auto text-green-400 mb-2" size={48} />
					<p className="text-gray-300">All residents are up to date with payments!</p>
				</div>
			)}
		</motion.div>
	);
};

export default PaymentAlertVisualization;
