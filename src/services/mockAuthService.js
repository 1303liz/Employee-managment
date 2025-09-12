// Mock authentication service for development/demo purposes
// Replace this with real API calls when backend is available

const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@company.com',
    password: 'admin123',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    department: 'Management'
  },
  {
    id: 2,
    email: 'manager@company.com',
    password: 'manager123',
    first_name: 'Manager',
    last_name: 'User',
    role: 'manager',
    department: 'Operations'
  },
  {
    id: 3,
    email: 'employee@company.com',
    password: 'employee123',
    first_name: 'Employee',
    last_name: 'User',
    role: 'employee',
    department: 'IT'
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockAuthService = {
  login: async (credentials) => {
    await delay(500) // Simulate network delay
    
    const user = MOCK_USERS.find(u => 
      u.email === credentials.email && u.password === credentials.password
    )
    
    if (user) {
      const { password, ...userWithoutPassword } = user
      const token = `mock-jwt-token-${user.id}-${Date.now()}`
      
      return {
        token,
        user: userWithoutPassword
      }
    } else {
      throw new Error('Invalid email or password')
    }
  },

  register: async (userData) => {
    await delay(500)
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }
    
    // Simulate successful registration
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData
    }
    
    MOCK_USERS.push(newUser)
    
    return {
      message: 'User registered successfully',
      user: { ...newUser, password: undefined }
    }
  },

  getProfile: async () => {
    await delay(300)
    
    const token = localStorage.getItem('token')
    if (!token || !token.startsWith('mock-jwt-token-')) {
      throw new Error('Invalid token')
    }
    
    const userId = parseInt(token.split('-')[3])
    const user = MOCK_USERS.find(u => u.id === userId)
    
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    } else {
      throw new Error('User not found')
    }
  }
}

// Export both mock and real service
// Switch between them based on environment
const USE_MOCK = true // Set to false when real backend is available

export const authService = USE_MOCK ? mockAuthService : {
  // Real API implementation would go here
  login: async () => { throw new Error('Real API not implemented') },
  register: async () => { throw new Error('Real API not implemented') },
  getProfile: async () => { throw new Error('Real API not implemented') }
}
