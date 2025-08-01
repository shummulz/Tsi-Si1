# 🏠 Property Management Dashboard - Taman Semarang Intan Si 1

A modern, responsive property management dashboard specifically designed for residential complex administration. This system helps property managers track residents, payments, maintenance fees, and access card status with automated blocking based on payment compliance.

![Demo App](/public/screenshot-for-readme-1.png)
![Demo App](/public/screenshot-for-readme-2.png)
![Demo App](/public/screenshot-for-readme-3.png)

## 🚀 Features

### 👥 Resident Management
- **Comprehensive Resident Tracking** - Monitor all residents with unit numbers and contact information
- **Payment Status Monitoring** - Real-time tracking of paid vs pending payments
- **Automated Access Control** - Smart access card blocking based on payment status
- **Payment History** - Complete payment records and transaction history

### 💰 Payment System
- **Monthly Maintenance Fees** - Automated fee calculation and tracking
- **Payment Alerts** - Visual alerts for overdue payments
- **Payment Leaderboard** - Gamified system to encourage timely payments
- **Due Date Management** - Automatic due date calculation and reminders

### 🔐 Access Card Management
- **Automated Blocking** - Cards automatically blocked after 3 months of overdue payments
- **Manual Override** - Admin controls for manual status updates
- **Real-time Status** - Live status tracking and updates
- **Compliance Monitoring** - Track payment compliance for access control

### 📊 Analytics & Reporting
- **Revenue Analytics** - Monthly and yearly revenue tracking
- **User Demographics** - Resident demographic analysis
- **Activity Heatmaps** - Visual representation of user activity
- **Performance Metrics** - Channel and product performance analysis

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 with Vite
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16.0 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/shummulz/Tsi-Si1.git
cd Tsi-Si1
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` to view the application.

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
src/
├── components/
│   ├── analytics/          # Analytics dashboard components
│   ├── common/            # Shared components (Header, Sidebar, etc.)
│   ├── settings/          # Settings page components
│   └── userstaman/        # Resident management components
├── data/
│   └── userData.js        # Centralized data management
├── pages/
│   ├── AnalyticsPage.jsx  # Analytics dashboard
│   ├── SettingsPage.jsx   # Application settings
│   └── UsersPageTaman.jsx # Main resident management page
└── App.jsx                # Main application component
```

## 🔧 Configuration

### Access Card Blocking Rules
- **Active**: Up to 2 months overdue
- **Blocked**: 3+ months overdue
- **Automatic Updates**: System automatically updates status on startup

### Payment System
- **Monthly Fee**: ₹100 per unit
- **Due Date**: 5th of each month
- **Grace Period**: 2 months before blocking

## 🎯 Usage

### For Property Managers
1. **Monitor Residents**: View all residents and their payment status
2. **Track Payments**: Monitor monthly maintenance fee collection
3. **Manage Access**: Control access card status based on payment compliance
4. **Generate Reports**: Use analytics to understand property performance

### For Administrators
1. **Update Payment Status**: Manually update payment records
2. **Override Access Cards**: Manually block/unblock access cards
3. **View Analytics**: Access detailed reports and insights
4. **Manage Settings**: Configure system preferences

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- UI components inspired by modern dashboard designs
- Special thanks to the open-source community

---

**Made with ❤️ for Taman Semarang Intan Si 1 Property Management**
