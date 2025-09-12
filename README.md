# Employee Management System Frontend

A comprehensive Employee Management System built with React + Vite, featuring role-based authentication and modern UI design.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Protected routes with automatic redirection
- Secure token management

### Dashboard
- **Admin/Manager**: Overview statistics, recent activities, department stats
- **Employee**: Personal dashboard with quick actions

### Employee Management
- View, add, edit, and delete employees (Admin only)
- Employee detail pages with comprehensive information
- Role assignment and management

### Department Management
- Create and manage departments
- View department statistics
- Employee count per department

### Attendance System
- **Employees**: Mark check-in/check-out times
- **Managers/Admin**: View attendance reports and statistics
- Real-time attendance tracking

### Leave Management
- **Employees**: Submit leave requests with different types
- **Managers/Admin**: Approve or reject leave requests
- Leave history and status tracking

### Payroll System
- **Admin**: Generate payroll with salary calculations
- **Employees**: View personal salary history
- Automatic net salary calculations

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **Styling**: Modern CSS with Flexbox/Grid
- **Authentication**: JWT tokens with localStorage

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Shared components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── dashboard/        # Dashboard components
│   ├── employees/        # Employee management
│   ├── attendance/       # Attendance system
│   ├── leave/           # Leave management
│   └── payroll/         # Payroll system
├── pages/               # Main page components
├── context/             # React Context providers
├── services/            # API service functions
├── utils/               # Utility functions
└── styles/              # CSS files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Environment Setup

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🔐 User Roles & Permissions

### Admin
- Full access to all features
- Manage employees, departments, payroll
- View all reports and analytics

### Manager
- Manage team attendance
- Approve/reject leave requests
- View team reports

### Employee
- View personal dashboard
- Mark attendance
- Submit leave requests
- View personal payroll history

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive**: Works on desktop, tablet, and mobile
- **Interactive**: Hover effects, smooth transitions
- **Accessible**: Proper color contrast and keyboard navigation
- **Loading States**: User feedback during operations

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Optimized for different screen sizes

## 🔗 API Integration

The frontend connects to a backend API with the following endpoints:

### Authentication
- `POST /api/users/login/` - User login
- `POST /api/users/register/` - User registration
- `GET /api/users/me/` - Get user profile

### Employees
- `GET /api/employees/` - List employees
- `POST /api/employees/` - Create employee
- `GET /api/employees/{id}/` - Get employee details
- `PUT /api/employees/{id}/` - Update employee
- `DELETE /api/employees/{id}/` - Delete employee

### Departments
- `GET /api/departments/` - List departments
- `POST /api/departments/` - Create department

### Attendance
- `POST /api/attendance/mark/` - Mark attendance
- `GET /api/attendance/` - Get attendance records

### Leave
- `POST /api/leave/request/` - Submit leave request
- `GET /api/leave/` - Get leave requests
- `PATCH /api/leave/{id}/approve/` - Approve leave
- `PATCH /api/leave/{id}/reject/` - Reject leave

### Payroll
- `POST /api/payroll/generate/` - Generate payroll
- `GET /api/payroll/` - Get payroll records

## 🚀 Deployment

### Build the application
```bash
npm run build
```

### Deploy to hosting service
The `dist` folder contains the production build ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using React + Vite**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
