// Centralized user data - Single source of truth for all components

// Helper function to get current date (can be easily modified for testing or different time zones)
export const getCurrentDate = () => new Date();

export const userData = [
	{ 
		id: 1, 
		name: "Mok", 
		email: "Mok@tsi.com", 
		unit: "1", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "May 5, 2025", // Current month payment
		paymentForMonth: "May 2025", // Which month this payment covers
		dueDate: "July 1, 2025", // Next payment due date
		accessCard: "Blocked",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 0,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: [""]
	},
	{ 
		id: 2, 
		name: "Farid", 
		email: "farid@tsi.com", 
		unit: "3", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "June 26 2025", // Current month payment
		paymentForMonth: "June 2025", // Which month this payment covers
		dueDate: "August 5, 2025", // Next payment due date
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 6,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: ["MVP", "Super Early Bird", "Reliability Star", "Consistent"]
	},
	{ 
		id: 3, 
		name: "Kumutha", 
		email: "kumutha@tsi.com", 
		unit: "5", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 5, 2025", // Current month payment
		paymentForMonth: "June 2025", // Which month this payment covers
		dueDate: "August 5, 2025", // Next payment due date
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 4, 
		name: "Shai", 
		email: "Shai@tsi.com", 
		unit: "7", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 3, 2025", // Late payment for June maintenance fee (due July 5)
		paymentForMonth: "July 2025", // Which month this payment covers
		dueDate: "October 5, 2025", // Next payment due date
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0, // Reset due to late payment
		earlyPayments: 5, // Previous early payments before this late one
		totalPaymentsMade: 6,
		averageDaysEarly: 0, // Reset since streak is broken
		paymentStreak: 0, // Reset due to late payment
		badges: [] // Remove badges due to broken streak
	},
	{ 
		id: 5, 
		name: "Nantheeni", 
		email: "nantheeni@tsi.com", 
		unit: "9", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 24, 2025",
		paymentForMonth: "July 2025", // Which month this payment covers
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 7,
		earlyPayments: 7,
		totalPaymentsMade: 7,
		averageDaysEarly: 1,
		paymentStreak: 7,
		badges: []
	},
	{ 
		id: 6, 
		name: "Hafizul", 
		email: "hafizul@tsi.com", 
		unit: "11", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 28, 2025", // Current month payment
		paymentForMonth: "August 2025", // Which month this payment covers
		dueDate: "October 5, 2025", // Next payment due date
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 8,
		earlyPayments: 8,
		totalPaymentsMade: 8,
		averageDaysEarly: 3,
		paymentStreak: 8,
		badges: ["MVP", "Reliability Star", "Consistent"]
	},
	{ 
		id: 7, 
		name: "Asmat", 
		email: "asmat@tsi.com", 
		unit: "13", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 18, 2025",
		paymentForMonth: "July 2025", // Which month this payment covers
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 7,
		earlyPayments: 7,
		totalPaymentsMade: 7,
		averageDaysEarly: 2,
		paymentStreak: 7,
		badges: ["Consistent"]
	},
	{ 
		id: 8, 
		name: "Vanessa", 
		email: "vanessa@tsi.com", 
		unit: "15", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "October 1, 2024", // Last payment was October 2024 - 9 months overdue!
		paymentForMonth: "October 2024", // Which month this payment covers
		dueDate: "December 5, 2024", // Was due November 2024, now severely overdue
		accessCard: "Blocked", // Should be blocked - 9 months overdue
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0, // Reset due to being severely overdue
		earlyPayments: 3,
		totalPaymentsMade: 4, // Reduced since missing many months
		averageDaysEarly: 0, // Reset due to overdue status
		paymentStreak: 0, // Reset due to being overdue
		badges: [] // Remove all badges due to overdue status
	},
	{ 
		id: 9, 
		name: "Ady", 
		email: "ady@tsi.com", 
		unit: "17", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "August 4, 2025", // 6 months overdue - access blocked
		paymentForMonth: "May 2025", // Which month this payment covers
		dueDate: "July 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 10, 
		name: "Emily Pow", 
		email: "emilypow@tsi.com", 
		unit: "19", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 11, 2025", // 1 month overdue - notice
		paymentForMonth: "August 2025", // Which month this payment covers
		dueDate: "October 5, 2025", // Current month payment is overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 8,
		earlyPayments: 8,
		totalPaymentsMade: 8,
		averageDaysEarly: 0,
		paymentStreak: 8,
		badges: []
	},
	{ 
		id: 11, 
		name: "Izzat", 
		email: "izzat@tsi.com", 
		unit: "21", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 26, 2025",
		paymentForMonth: "July 2025", // Which month this payment covers
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 7,
		earlyPayments: 7,
		totalPaymentsMade: 7,
		averageDaysEarly: 2,
		paymentStreak: 7,
		badges: []
	},
	{ 
		id: 12, 
		name: "Mazli", 
		email: "mazli@tsi.com", 
		unit: "23", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 13, 2025", // 2 months overdue - final warning
		paymentForMonth: "December 2025", 
		dueDate: "February 5, 2026", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 12,
		earlyPayments: 12,
		totalPaymentsMade: 12,
		averageDaysEarly: 200,
		paymentStreak: 12,
		badges: []
	},
    { 
		id: 13, 
		name: "Emily Lim", 
		email: "emilylim@tsi.com", 
		unit: "25", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 6, 2025",
		paymentForMonth: "July 2025", // Which month this payment covers
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 7,
		earlyPayments: 7,
		totalPaymentsMade: 7,
		averageDaysEarly: 2,
		paymentStreak: 7,
		badges: []
	},
	{ 
		id: 14, 
		name: "Lee Chag", 
		email: "leechag@tsi.com", 
		unit: "27", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "August 4,2025", // 2 months overdue - final warning
		paymentForMonth: "August 2025", // Which month this payment covers
		dueDate: "October 5, 2025", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 8,
		earlyPayments: 8,
		totalPaymentsMade: 8,
		averageDaysEarly: 0,
		paymentStreak: 8,
		badges: []
	},
	{ 
		id: 15, 
		name: "Hafiz", 
		email: "hafiz@tsi.com", 
		unit: "29", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "July 5 2025", // 2 months overdue - final warning
		paymentForMonth: "July 2025", 
		dueDate: "August 5, 2025", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 16, 
		name: "Theresa", 
		email: "theresa@tsi.com", 
		unit: "31", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "July 19, 2025", 
		paymentForMonth: "June 2025", 
		dueDate: "August 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 17, 
		name: "Emma", 
		email: "emma@tsi.com", 
		unit: "33", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "May 28, 2025", // 2 months overdue - final warning
		paymentForMonth: "May 2025", 
		dueDate: "July 5, 2025", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 18, 
		name: "Irsyad", 
		email: "elia@tsi.com", 
		unit: "35", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 29, 2025",
		paymentForMonth: "August 2025", // Which month this payment covers
		dueDate: "October 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 8,
		earlyPayments: 8,
		totalPaymentsMade: 8,
		averageDaysEarly: 2,
		paymentStreak: 8,
		badges: ["Consistent", "Reliability Star", "Super Early Bird"]
	},
	{ 
		id: 19, 
		name: "Ku Asraf", 
		email: "kuasraf@tsi.com", 
		unit: "37", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "July 28, 2025",
		paymentForMonth: "July 2025", // Which month this payment covers
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 7,
		earlyPayments: 7,
		totalPaymentsMade: 7,
		averageDaysEarly: 0,
		paymentStreak: 7,
		badges: ["Consistent", "Reliability Star", "Early Bird"]
	},
	{ 
		id: 20, 
		name: "Muru", 
		email: "muru@tsi.com", 
		unit: "39", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "January 5, 2024", // 2 months overdue - final warning
		paymentForMonth: "January 2024", 
		dueDate: "March 5, 2024", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 21, 
		name: "Haziq", 
		email: "haziq@tsi.com", 
		unit: "41", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 13,2025", // 2 months overdue - final warning
		paymentForMonth: "August  2025", // Which month this payment covers
		dueDate: "October 5, 2025", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 8,
		earlyPayments: 8,
		totalPaymentsMade: 8,
		averageDaysEarly: 0,
		paymentStreak: 8,
		badges: []
	},
	{ 
		id: 22, 
		name: "Jimmy 1", 
		email: "jimmy1@tsi.com", 
		unit: "43", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 8, 2025",
		paymentForMonth: "July 2025", 
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 23, 
		name: "Jimmy 2", 
		email: "jimmy2@tsi.com", 
		unit: "45", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 8, 2025",
		paymentForMonth: "July 2025", 
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 24, 
		name: "Jimmy 3", 
		email: "jimmy3@tsi.com", 
		unit: "47", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Paid",
		lastPayment: "August 8, 2025",
		paymentForMonth: "July 2025", 
		dueDate: "September 5, 2025",
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 0,
		earlyPayments: 0,
		totalPaymentsMade: 4,
		averageDaysEarly: 0,
		paymentStreak: 0,
		badges: []
	},
	{ 
		id: 24, 
		name: "Lee Chag 2", 
		email: "leechag2@tsi.com", 
		unit: "49", 
		status: "Active", 
		maintenanceFee: 100,
		paymentStatus: "Pending",
		lastPayment: "August 4, 2025", // 2 months overdue - final warning
		paymentForMonth: "August 2025", // Which month this payment covers
		dueDate: "October 5, 2025", // Was due in June, now overdue
		accessCard: "Active",
		// Leaderboard tracking data
		consecutiveOnTimePayments: 6,
		earlyPayments: 6,
		totalPaymentsMade: 6,
		averageDaysEarly: 0,
		paymentStreak: 6,
		badges: []
	}
];

// Helper functions to calculate statistics from the userData
export const getStatistics = () => {
	const totalResidents = userData.length;
	const paidThisMonth = userData.filter(user => user.paymentStatus === "Paid").length;
	const pendingPayments = userData.filter(user => user.paymentStatus === "Pending").length;
	const criticalAlerts = userData.filter(user => user.accessCard === "Blocked").length;
	
	return {
		totalResidents,
		paidThisMonth,
		pendingPayments,
		criticalAlerts
	};
};

// Helper function to calculate if payment is overdue and by how much
export const getPaymentStatus = (user) => {
	const currentDate = getCurrentDate(); // Use centralized current date function
	const dueDate = new Date(user.dueDate);
	const lastPaymentDate = new Date(user.lastPayment);
	
	// If user has paid and last payment is current month, they're up to date
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const lastPaymentMonth = lastPaymentDate.getMonth();
	const lastPaymentYear = lastPaymentDate.getFullYear();
	
	if (user.paymentStatus === "Paid" && 
		lastPaymentMonth === currentMonth && 
		lastPaymentYear === currentYear) {
		return {
			status: "current",
			isOverdue: false,
			monthsOverdue: 0,
			daysPastDue: 0
		};
	}
	
	// Calculate if payment is overdue
	const isOverdue = currentDate > dueDate && user.paymentStatus === "Pending";
	const daysPastDue = isOverdue ? Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24)) : 0;
	
	// Calculate months overdue based on last payment
	const monthsDiff = Math.floor((currentDate - lastPaymentDate) / (1000 * 60 * 60 * 24 * 30));
	
	return {
		status: isOverdue ? "overdue" : "current",
		isOverdue,
		monthsOverdue: Math.max(monthsDiff, 0),
		daysPastDue,
		totalDue: user.maintenanceFee * Math.max(monthsDiff, 1)
	};
};

// Helper function to get critical users for alerts
export const getCriticalUsers = () => {
	return userData.filter(user => user.accessCard === "Blocked").map(user => {
		const paymentStatus = getPaymentStatus(user);
		
		return {
			...user,
			...paymentStatus,
			status: paymentStatus.monthsOverdue >= 4 ? "Access Blocked" : "Final Warning"
		};
	});
};

// Helper function to get maintenance fee data for charts
export const getMaintenanceFeeData = () => {
	const stats = getStatistics();
	return [
		{ name: "Jan", "Paid": stats.paidThisMonth, "Pending": stats.pendingPayments }
	];
};

// Helper function to get simplified leaderboard data
export const getSimplifiedLeaderboard = () => {
	return userData
		.filter(user => user.consecutiveOnTimePayments > 0) // Only users with on-time payments
		.sort((a, b) => {
			// Primary sort: Consecutive on-time payments (most important)
			if (b.consecutiveOnTimePayments !== a.consecutiveOnTimePayments) {
				return b.consecutiveOnTimePayments - a.consecutiveOnTimePayments;
			}
			// Secondary sort: Early payments as tie-breaker
			if (b.earlyPayments !== a.earlyPayments) {
				return b.earlyPayments - a.earlyPayments;
			}
			// Third tie-breaker: Average days early (payment behavior - higher is better)
			if (b.averageDaysEarly !== a.averageDaysEarly) {
				return b.averageDaysEarly - a.averageDaysEarly;
			}
			// Fourth tie-breaker: Number of badges (achievement level)
			if (b.badges.length !== a.badges.length) {
				return b.badges.length - a.badges.length;
			}
			// Final tie-breaker: Total payments made (experience)
			return b.totalPaymentsMade - a.totalPaymentsMade;
		})
		.map((user, index) => ({
			...user,
			rank: index + 1,
			consistencyScore: Math.round((user.consecutiveOnTimePayments / Math.max(user.totalPaymentsMade, 1)) * 100)
		}));
};

// Helper function to calculate late payments if needed (derived data)
export const calculateLatePayments = (user) => {
	// Late payments = Total payments - Consecutive on-time payments
	const onTimePayments = user.consecutiveOnTimePayments;
	const totalPayments = user.totalPaymentsMade;
	
	// Calculate late payments as remaining payments after on-time payments
	return Math.max(totalPayments - onTimePayments, 0);
};

// Helper function to automatically determine access card status based on payment history
export const getAutoAccessCardStatus = (user) => {
	const currentDate = getCurrentDate();
	const lastPaymentDate = new Date(user.lastPayment);
	
	// Calculate months overdue based on last payment
	const monthsOverdue = Math.floor((currentDate - lastPaymentDate) / (1000 * 60 * 60 * 24 * 30));
	
	// Access card rules:
	// - Active: Up to date or less than 3 months overdue
	// - Blocked: 3+ months overdue
	
	if (user.paymentStatus === "Paid") {
		// If payment status is paid, check if it's current month
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		const lastPaymentMonth = lastPaymentDate.getMonth();
		const lastPaymentYear = lastPaymentDate.getFullYear();
		
		if (lastPaymentMonth === currentMonth && lastPaymentYear === currentYear) {
			return "Active"; // Current month payment is made
		}
	}
	
	// For pending payments, check overdue months
	if (monthsOverdue >= 3) {
		return "Blocked"; // 3+ months overdue = access blocked
	} else if (monthsOverdue >= 1) {
		return "Active"; // 1-2 months overdue = warning but still active
	}
	
	return "Active"; // Default to active for edge cases
};

// Helper function to get access card status with reason
export const getAccessCardStatusWithReason = (user) => {
	const status = getAutoAccessCardStatus(user);
	const currentDate = getCurrentDate();
	const lastPaymentDate = new Date(user.lastPayment);
	const monthsOverdue = Math.floor((currentDate - lastPaymentDate) / (1000 * 60 * 60 * 24 * 30));
	
	let reason = "";
	if (status === "Blocked") {
		reason = `Access blocked - ${monthsOverdue} months overdue`;
	} else if (monthsOverdue >= 1) {
		reason = `Warning - ${monthsOverdue} month(s) overdue`;
	} else {
		reason = "Payment up to date";
	}
	
	return {
		status,
		reason,
		monthsOverdue
	};
};

// Example usage and testing function for Shaiful Shafian
export const testAccessCardLogic = () => {
	// Find Shaiful Shafian's record
	const shaiful = userData.find(user => user.name === "Shaiful Shafian");
	
	if (shaiful) {
		console.log("=== Shaiful Shafian Access Card Analysis ===");
		console.log("Current Data:", {
			name: shaiful.name,
			unit: shaiful.unit,
			lastPayment: shaiful.lastPayment,
			dueDate: shaiful.dueDate,
			paymentStatus: shaiful.paymentStatus,
			currentAccessCard: shaiful.accessCard
		});
		
		const autoStatus = getAccessCardStatusWithReason(shaiful);
		console.log("Auto-calculated Status:", autoStatus);
		
		return autoStatus;
	}
	
	return null;
};

// Function to auto-populate access card status for all users
export const updateAllAccessCardStatus = () => {
	console.log("🔄 Updating access card status for all users...");
	
	const updates = userData.map(user => {
		const oldStatus = user.accessCard;
		const autoStatus = getAutoAccessCardStatus(user);
		const statusInfo = getAccessCardStatusWithReason(user);
		
		// Update the user's access card status
		user.accessCard = autoStatus;
		
		return {
			name: user.name,
			unit: user.unit,
			oldStatus,
			newStatus: autoStatus,
			reason: statusInfo.reason,
			monthsOverdue: statusInfo.monthsOverdue,
			changed: oldStatus !== autoStatus
		};
	});
	
	// Log summary of changes
	const changedUsers = updates.filter(update => update.changed);
	console.log(`✅ Updated ${changedUsers.length} users with status changes:`);
	
	changedUsers.forEach(update => {
		console.log(`  📋 ${update.name} (${update.unit}): ${update.oldStatus} → ${update.newStatus} (${update.reason})`);
	});
	
	const blockedUsers = updates.filter(update => update.newStatus === "Blocked");
	console.log(`🚫 Total blocked users: ${blockedUsers.length}`);
	
	return {
		totalUsers: userData.length,
		changedUsers: changedUsers.length,
		blockedUsers: blockedUsers.length,
		updates
	};
};

// Function to get access card status summary for all users
export const getAccessCardSummary = () => {
	const summary = userData.map(user => {
		const statusInfo = getAccessCardStatusWithReason(user);
		return {
			name: user.name,
			unit: user.unit,
			paymentStatus: user.paymentStatus,
			lastPayment: user.lastPayment,
			currentAccessCard: user.accessCard,
			autoCalculatedStatus: statusInfo.status,
			reason: statusInfo.reason,
			monthsOverdue: statusInfo.monthsOverdue,
			needsUpdate: user.accessCard !== statusInfo.status
		};
	});
	
	const stats = {
		total: summary.length,
		active: summary.filter(s => s.autoCalculatedStatus === "Active").length,
		blocked: summary.filter(s => s.autoCalculatedStatus === "Blocked").length,
		needingUpdate: summary.filter(s => s.needsUpdate).length
	};
	
	return { summary, stats };
};

// Function to initialize access card status on app startup
export const initializeAccessCardStatus = () => {
	console.log("🚀 Initializing access card status system...");
	console.log(`📅 Current date: ${getCurrentDate().toLocaleDateString()}`);
	
	const result = updateAllAccessCardStatus();
	
	console.log("📊 Access Card Status Summary:");
	console.log(`  Total users: ${result.totalUsers}`);
	console.log(`  Active access: ${result.totalUsers - result.blockedUsers}`);
	console.log(`  Blocked access: ${result.blockedUsers}`);
	console.log(`  Status changes applied: ${result.changedUsers}`);
	
	return result;
};

// Helper function to get dynamic monthly maintenance fee data for 2025
export const getMonthlyMaintenanceData = () => {
	const currentDate = getCurrentDate();
	const currentYear = 2025;
	const months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	
	const monthlyData = [];
	
	// Calculate expected revenue per month (sum of all maintenance fees)
	const expectedMonthlyRevenue = userData.reduce((total, user) => total + user.maintenanceFee, 0);
	
	// Generate data for each month up to current month in 2025
	for (let monthIndex = 0; monthIndex <= currentDate.getMonth() && monthIndex < 12; monthIndex++) {
		const monthName = months[monthIndex];
		const isCurrentMonth = monthIndex === currentDate.getMonth();
		
		let collectedRevenue = 0;
		let overdueAmount = 0;
		
		if (isCurrentMonth) {
			// For current month, use actual data
			userData.forEach(user => {
				const lastPaymentDate = new Date(user.lastPayment);
				const isCurrentMonthPayment = lastPaymentDate.getMonth() === currentDate.getMonth() 
					&& lastPaymentDate.getFullYear() === currentDate.getFullYear();
				
				if (user.paymentStatus === "Paid" && isCurrentMonthPayment) {
					collectedRevenue += user.maintenanceFee;
				} else if (user.paymentStatus === "Pending") {
					overdueAmount += user.maintenanceFee;
				}
			});
		} else {
			// For past months, simulate collection data based on current payment patterns
			const paidUsersCount = userData.filter(u => u.paymentStatus === "Paid").length;
			const collectionRate = paidUsersCount / userData.length;
			
			collectedRevenue = Math.round(expectedMonthlyRevenue * collectionRate);
			overdueAmount = Math.round(expectedMonthlyRevenue * (1 - collectionRate));
		}
		
		monthlyData.push({
			month: `${monthName} ${currentYear}`,
			collected: collectedRevenue,
			expected: expectedMonthlyRevenue,
			overdueAmount: overdueAmount
		});
	}
	
	return monthlyData;
};
