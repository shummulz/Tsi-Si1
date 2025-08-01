import { motion } from "framer-motion";
import { CreditCard, Ban, AlertTriangle, CheckCircle } from "lucide-react";
import { userData, getPaymentStatus } from "../../data/userData";

const AccessCardStatus = () => {
	const getAccessCardData = () => {
		return userData.map(user => {
			const paymentInfo = getPaymentStatus(user);
			
			let cardStatus = "Active";
			let statusColor = "green";
			let statusIcon = CheckCircle;
			let timeToBlock = null;
			
			if (paymentInfo.monthsOverdue >= 3) {
				cardStatus = "Blocked";
				statusColor = "red";
				statusIcon = Ban;
			} else if (paymentInfo.monthsOverdue >= 2) {
				cardStatus = "Warning";
				statusColor = "orange";
				statusIcon = AlertTriangle;
				timeToBlock = "1 month until blocked";
			} else if (paymentInfo.monthsOverdue >= 1) {
				cardStatus = "Notice";
				statusColor = "yellow";
				statusIcon = CreditCard;
				timeToBlock = `${3 - paymentInfo.monthsOverdue} months until blocked`;
			}
			
			return {
				...user,
				...paymentInfo,
				cardStatus,
				statusColor,
				statusIcon,
				timeToBlock
			};
		});
	};
	
	const accessCardData = getAccessCardData();
	const activeCards = accessCardData.filter(user => user.cardStatus === "Active").length;
	const blockedCards = accessCardData.filter(user => user.cardStatus === "Blocked").length;
	const warningCards = accessCardData.filter(user => user.cardStatus === "Warning").length;
	const noticeCards = accessCardData.filter(user => user.cardStatus === "Notice").length;
	
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Access Card Management</h2>
				<div className="text-sm text-gray-400">
					Real-time status based on payment history
				</div>
			</div>
			
			{/* Status Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
				<div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-green-400 text-sm font-medium">Active Cards</p>
							<p className="text-2xl font-bold text-green-300">{activeCards}</p>
						</div>
						<CheckCircle className="text-green-400" size={24} />
					</div>
				</div>
				
				<div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-yellow-400 text-sm font-medium">Payment Notice</p>
							<p className="text-2xl font-bold text-yellow-300">{noticeCards}</p>
						</div>
						<CreditCard className="text-yellow-400" size={24} />
					</div>
				</div>
				
				<div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-orange-400 text-sm font-medium">Final Warning</p>
							<p className="text-2xl font-bold text-orange-300">{warningCards}</p>
						</div>
						<AlertTriangle className="text-orange-400" size={24} />
					</div>
				</div>
				
				<div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-red-400 text-sm font-medium">Blocked Cards</p>
							<p className="text-2xl font-bold text-red-300">{blockedCards}</p>
						</div>
						<Ban className="text-red-400" size={24} />
					</div>
				</div>
			</div>
			
			{/* Access Card Status List */}
			<div className="space-y-3">
				<h3 className="text-lg font-semibold text-gray-100 mb-4">Individual Card Status</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
					{accessCardData.map((user) => {
						const IconComponent = user.statusIcon;
						return (
							<motion.div
								key={user.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className={`p-3 rounded-lg border-l-4 ${
									user.statusColor === "green"
										? "bg-green-900/20 border-green-500"
										: user.statusColor === "yellow"
										? "bg-yellow-900/20 border-yellow-500"
										: user.statusColor === "orange"
										? "bg-orange-900/20 border-orange-500"
										: "bg-red-900/20 border-red-500"
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<IconComponent 
											className={`${
												user.statusColor === "green"
													? "text-green-400"
													: user.statusColor === "yellow"
													? "text-yellow-400"
													: user.statusColor === "orange"
													? "text-orange-400"
													: "text-red-400"
											}`}
											size={18}
										/>
										<div>
											<p className="font-medium text-gray-100">{user.name}</p>
											<p className="text-sm text-gray-400">Unit: {user.unit}</p>
										</div>
									</div>
									<div className="text-right">
										<p className={`text-sm font-semibold ${
											user.statusColor === "green"
												? "text-green-400"
												: user.statusColor === "yellow"
												? "text-yellow-400"
												: user.statusColor === "orange"
												? "text-orange-400"
												: "text-red-400"
										}`}>
											{user.cardStatus}
										</p>
										{user.timeToBlock && (
											<p className="text-xs text-gray-400">{user.timeToBlock}</p>
										)}
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
};

export default AccessCardStatus;
