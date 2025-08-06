import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use(
  config => {
    const { method, url } = config

    // 排除 login 請求（可以根據 URL 或其他條件）
    if (config.url.includes('/login')) {
      return config
    }

    // 排除 put - blogs/:id 請求
    if (method === 'put' && /^\/blogs\/[^/]+$/.test(url)) {
      return config
    }

    // 從 localStorage、sessionStorage 或其他地方取得 token
    const { token } = JSON.parse(localStorage.getItem('user'))
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 設定錯誤攔截器
api.interceptors.response.use(
  response => response,
  error => {
    // 如果後端有傳錯誤訊息
    if (error.response?.data?.error) {
      // 建立新的 Error 物件並加上自訂訊息
      const customError = new Error(error.response.data.error)
      customError.name = 'APIError'
      customError.response = error.response // 可保留原始回應
      throw customError
    }

    // fallback：保留 axios 預設錯誤
    return Promise.reject(error)
  }
)

export default api
