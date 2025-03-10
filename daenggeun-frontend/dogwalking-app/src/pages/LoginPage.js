"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "../styles/AuthPages.css"
import { login } from "../utils/api"
import { isValidUsername, isValidPassword } from "../utils/validation"

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const location = useLocation()

  // 상태 관리
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  // URL 해시에 따라 초기 탭 설정
  useEffect(() => {
    if (location.hash === "#signup") {
      setActiveTab("signup")
    }
  }, [location])

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // 로그인 에러 메시지 초기화
    if (loginError) {
      setLoginError("")
    }
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 유효성 검사
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = "아이디를 입력해주세요."
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = "유효한 아이디를 입력해주세요."
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "비밀번호는 6~12자리로 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      // 로그인 API 호출
      const response = await login(formData.username, formData.password)

      // 로그인 성공 시 처리
      if (response.success) {
        // 로컬 스토리지에 사용자 정보 및 토큰 저장
        localStorage.setItem("user", JSON.stringify(response.user))
        localStorage.setItem("token", response.token)

        // 부모 컴포넌트에 로그인 상태 전달
        if (onLogin) {
          onLogin(response.user, response.token)
        }

        // 홈페이지로 이동
        navigate("/")
      }
    } catch (error) {
      // 로그인 실패 시 에러 메시지 표시
      setLoginError(error.message || "로그인에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab)

    // 회원가입 탭으로 이동 시 URL 해시 변경
    if (tab === "signup") {
      navigate("/login#signup")
    } else {
      navigate("/login")
    }
  }

  // 회원가입 페이지로 이동 핸들러
  const handleRegisterClick = () => {
    navigate("/register")
  }

  return (
    <div className="auth-page">
      {/* 테스트 계정 정보 */}
      <div className="test-accounts">
        <h3 className="test-accounts-title">테스트용 계정</h3>
        <div className="test-accounts-grid">
          <div className="test-account-card">
            <p className="test-account-type">관리자 계정</p>
            <p className="test-account-info">아이디: admin</p>
            <p className="test-account-info">비밀번호: admin123</p>
          </div>
          <div className="test-account-card">
            <p className="test-account-type">일반 회원 계정</p>
            <p className="test-account-info">아이디: user</p>
            <p className="test-account-info">비밀번호: user123</p>
          </div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-tabs">
          <div className="auth-tabs-list">
            <div
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabChange("login")}
            >
              로그인
            </div>
            <div
              className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => handleTabChange("signup")}
            >
              회원가입
            </div>
          </div>
        </div>

        <div className={`auth-tab-content ${activeTab === "login" ? "active" : ""}`}>
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-card-title">로그인</h2>
              <p className="auth-card-description">댕근 서비스를 이용하려면 로그인해주세요.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-card-content">
                {/* 로그인 에러 메시지 */}
                {loginError && <div className="auth-alert auth-alert-error">{loginError}</div>}

                {/* 아이디 입력 필드 */}
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    아이디
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-input ${errors.username ? "error" : ""}`}
                    placeholder="사용자 아이디"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.username && <p className="form-error">{errors.username}</p>}
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="password" className="form-label">
                      비밀번호
                    </label>
                    <Link to="/forgot-password" className="auth-link">
                      비밀번호 찾기
                    </Link>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.password && <p className="form-error">{errors.password}</p>}
                </div>
              </div>

              <div className="auth-card-footer">
                <button type="submit" className="auth-button auth-button-primary" disabled={isLoading}>
                  {isLoading ? "로그인 중..." : "로그인"}
                </button>

                <p className="auth-footer-text">
                  아직 계정이 없으신가요?{" "}
                  <button type="button" className="auth-link" onClick={handleRegisterClick}>
                    회원가입
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className={`auth-tab-content ${activeTab === "signup" ? "active" : ""}`}>
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-card-title">회원가입</h2>
              <p className="auth-card-description">회원가입 페이지로 이동합니다.</p>
            </div>

            <div className="auth-card-content">
              <p className="text-center">회원가입을 위해 아래 버튼을 클릭해주세요.</p>
            </div>

            <div className="auth-card-footer">
              <button type="button" className="auth-button auth-button-primary" onClick={handleRegisterClick}>
                회원가입 페이지로 이동
              </button>

              <p className="auth-footer-text">
                이미 계정이 있으신가요?{" "}
                <button type="button" className="auth-link" onClick={() => handleTabChange("login")}>
                  로그인
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

