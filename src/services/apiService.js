import { api } from './authService'

export const employeeService = {
  getAll: async () => {
    const response = await api.get('/employees/')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/employees/${id}/`)
    return response.data
  },

  create: async (employeeData) => {
    const response = await api.post('/employees/', employeeData)
    return response.data
  },

  update: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}/`, employeeData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/employees/${id}/`)
    return response.data
  }
}

export const departmentService = {
  getAll: async () => {
    const response = await api.get('/departments/')
    return response.data
  },

  create: async (departmentData) => {
    const response = await api.post('/departments/', departmentData)
    return response.data
  }
}

export const attendanceService = {
  mark: async (attendanceData) => {
    const response = await api.post('/attendance/mark/', attendanceData)
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/attendance/')
    return response.data
  },

  getByEmployee: async (employeeId) => {
    const response = await api.get(`/attendance/${employeeId}/`)
    return response.data
  }
}

export const leaveService = {
  request: async (leaveData) => {
    const response = await api.post('/leave/request/', leaveData)
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/leave/')
    return response.data
  },

  approve: async (id) => {
    const response = await api.patch(`/leave/${id}/approve/`)
    return response.data
  },

  reject: async (id) => {
    const response = await api.patch(`/leave/${id}/reject/`)
    return response.data
  }
}

export const payrollService = {
  generate: async (payrollData) => {
    const response = await api.post('/payroll/generate/', payrollData)
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/payroll/')
    return response.data
  },

  getByEmployee: async (employeeId) => {
    const response = await api.get(`/payroll/${employeeId}/`)
    return response.data
  }
}
