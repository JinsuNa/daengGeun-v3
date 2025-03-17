import axios from "axios";

// API 기본 URL 설정
const API_BASE_URL = "http://localhost:8080/api/user";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 - 모든 요청에 인증 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 - 인증 오류 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 오류 시 로그아웃 처리
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 로그인 API
export const loginUser = async (formData) => {
  try {
    const response = axios.post(`${API_BASE_URL}/login`, formData);
    return (await response).data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 회원가입 API
export const register = async (formData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
