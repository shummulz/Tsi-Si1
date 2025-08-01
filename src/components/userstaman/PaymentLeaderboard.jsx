import { motion } from "framer-motion";
import { Trophy, Medal, Award, Crown, Target, Calendar } from "lucide-react";
import { userData, getSimplifiedLeaderboard } from "../../data/userData";

const PaymentLeaderboard = () => {
	// Use the centralized leaderboard function for consistency
	const leaderboardData = getSimplifiedLeaderboard();
	
	// Get top performers by category using leaderboard data for efficiency
	const getTopPerformers = () => {
		// Use the already sorted leaderboard data
		const mostConsistent = leaderboardData.length > 0 ? leaderboardData[0] : null;
		
		// Sort by early payments specifically for earliest payer
		const sortedByEarly = [...userData].sort((a, b) => b.earlyPayments - a.earlyPayments);
		const earliestPayer = sortedByEarly[0];
		
		return {
			mostConsistent,
			earliestPayer
		};
	};
	
	const topPerformers = getTopPerformers();
	
	// Get rank icon based on position
	const getRankIcon = (index) => {
		switch (index) {
			case 0: return { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-900/20" };
			case 1: return { icon: Trophy, color: "text-gray-300", bg: "bg-gray-900/20" };
			case 2: return { icon: Medal, color: "text-amber-600", bg: "bg-amber-900/20" };
			default: return { icon: Award, color: "text-blue-400", bg: "bg-blue-900/20" };
		}
	};
	
	// Get badge color
	const getBadgeColor = (badge) => {
		const badgeColors = {
			"Legend": "bg-purple-600",
			"Champion Payer": "bg-gold-600",
			"Perfect Payer": "bg-green-600",
			"Ultimate Early Bird": "bg-blue-600",
			"Super Early Bird": "bg-sky-500",
			"Early Bird": "bg-cyan-500",
			"Reliability Star": "bg-pink-500",
			"Consistent": "bg-indigo-500",
			"Reliable Payer": "bg-emerald-500",
			"Perfect Record": "bg-violet-600",
			"MVP": "bg-red-500"
		};
		return badgeColors[badge] || "bg-gray-500";
	};
	
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-gray-100 flex items-center space-x-2">
					<Trophy className="text-yellow-400" size={24} />
					<span>Payment Champions Leaderboard</span>
				</h2>
				<div className="text-sm text-gray-400">
					Celebrating our most reliable residents! 🎉
				</div>
			</div>
			
			{/* Top Performers Highlights - Simplified */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-green-400 text-sm font-medium">🎯 Most Consistent</p>
							<p className="text-lg font-bold text-green-300">{topPerformers.mostConsistent?.name}</p>
							<p className="text-xs text-green-400">{topPerformers.mostConsistent?.consecutiveOnTimePayments} consecutive on-time payments</p>
						</div>
						<Target className="text-green-400" size={24} />
					</div>
				</div>
				
				<div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-blue-400 text-sm font-medium">⚡ Early Payment Champion</p>
							<p className="text-lg font-bold text-blue-300">{topPerformers.earliestPayer?.name}</p>
							<p className="text-xs text-blue-400">{topPerformers.earliestPayer?.earlyPayments} early payments total</p>
						</div>
						<Calendar className="text-blue-400" size={24} />
					</div>
				</div>
			</div>
			
			{/* Leaderboard Table */}
			<div className="bg-gray-900/50 rounded-lg overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-700">
					<h3 className="text-lg font-semibold text-gray-100">🏆 Hall of Fame</h3>
				</div>
				<div className="max-h-96 overflow-y-auto">
					{leaderboardData.map((user, index) => {
						const rankInfo = getRankIcon(index);
						const RankIcon = rankInfo.icon;
						
						return (
							<motion.div
								key={user.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className={`p-4 border-b border-gray-700 hover:bg-gray-800/30 transition-colors ${
									index < 3 ? "bg-gradient-to-r from-gray-800/50 to-gray-900/30" : ""
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										{/* Rank */}
										<div className={`flex items-center justify-center w-10 h-10 rounded-full ${rankInfo.bg}`}>
											<RankIcon className={rankInfo.color} size={20} />
										</div>
										
										{/* User Info */}
										<div>
											<div className="flex items-center space-x-2">
												<h4 className="font-semibold text-gray-100">{user.name}</h4>
												{index === 0 && <Crown className="text-yellow-400" size={16} />}
											</div>
											<p className="text-sm text-gray-400">Unit: {user.unit}</p>
											
											{/* Badges */}
											<div className="flex flex-wrap gap-1 mt-1">
												{user.badges?.slice(0, 2).map((badge, badgeIndex) => (
													<span
														key={badgeIndex}
														className={`px-2 py-1 text-xs text-white rounded-full ${getBadgeColor(badge)}`}
													>
														{badge}
													</span>
												))}
												{user.badges?.length > 2 && (
													<span className="px-2 py-1 text-xs text-gray-400 bg-gray-700 rounded-full">
														+{user.badges.length - 2} more
													</span>
												)}
											</div>
										</div>
									</div>
									
									{/* Stats - Simplified to focus on key metrics */}
									<div className="text-right">
										<div className="flex items-center space-x-6 text-sm">
											<div className="text-center">
												<p className="font-bold text-green-400">{user.consecutiveOnTimePayments}</p>
												<p className="text-xs text-gray-400">On-Time</p>
											</div>
											<div className="text-center">
												<p className="font-bold text-blue-400">{user.earlyPayments}</p>
												<p className="text-xs text-gray-400">Early Pays</p>
											</div>
										</div>
										<div className="mt-1">
											<span className="text-xs text-gray-400">
												Rank #{index + 1}
											</span>
										</div>
									</div>
								</div>
								
								{/* Progress Bar - Simplified for consecutive payments */}
								<div className="mt-3">
									<div className="flex justify-between text-xs text-gray-400 mb-1">
										<span>Consistency Score</span>
										<span>{Math.round((user.consecutiveOnTimePayments / Math.max(user.totalPaymentsMade, 1)) * 100)}%</span>
									</div>
									<div className="w-full bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
											style={{
												width: `${Math.min((user.consecutiveOnTimePayments / Math.max(user.totalPaymentsMade, 1)) * 100, 100)}%`
											}}
										></div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
			
			{leaderboardData.length === 0 && (
				<div className="text-center py-8">
					<Trophy className="mx-auto text-gray-400 mb-2" size={48} />
					<p className="text-gray-400">No payment champions yet. Be the first to build a streak!</p>
				</div>
			)}
		</motion.div>
	);
};

export default PaymentLeaderboard;
