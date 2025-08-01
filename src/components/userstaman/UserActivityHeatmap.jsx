import { motion } from "framer-motion";

const UserActivityHeatmap = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Maintenance Fee Overview</h2>
			<div className='text-center py-12'>
				<p className='text-gray-400 text-lg'>Maintenance fee tracking is handled in the residents table below.</p>
				<p className='text-gray-500 text-sm mt-2'>View individual payment statuses and details in the main table.</p>
			</div>
		</motion.div>
	);
};
export default UserActivityHeatmap;
