import { Menu, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Si 1 Residents", icon: Users, color: "#F97316", href: "/userstaman" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default collapsed
	const [isMobile, setIsMobile] = useState(false);

	// Detect screen size and auto-collapse on mobile
	useEffect(() => {
		const checkScreenSize = () => {
			const mobile = window.innerWidth < 1024; // lg breakpoint
			setIsMobile(mobile);
			// Force collapse on mobile
			if (mobile && isSidebarOpen) {
				setIsSidebarOpen(false);
			}
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, [isSidebarOpen]);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className={`p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit ${
						!isSidebarOpen ? 'bg-gray-700/50' : ''
					}`}
					title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div 
								className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'
								title={!isSidebarOpen ? item.name : ""}
							>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>

				{/* Collapsed state indicator */}
				{!isSidebarOpen && (
					<motion.div 
						className="mt-auto text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<div className="w-8 h-1 bg-gray-600 rounded mx-auto mb-2"></div>
						<div className="text-xs text-gray-500 transform rotate-90 whitespace-nowrap">
							TSI Si1
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};
export default Sidebar;
