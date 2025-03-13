"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";
import { register, checkUsername, checkEmail, uploadFile } from "../utils/api";
import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
  doPasswordsMatch,
  isValidAge,
} from "../utils/validation";

function RegisterPage({ onLogin }) {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phone: "",
    address: "",
    location: "",
    pets: [],
  });

  const [petData, setPetData] = useState({
    name: "",
    age: "",
    gender: "Male",
    breed: "",
    personality: "",
  });

  const [validation, setValidation] = useState({
    email: { isChecking: false, isValid: false, isChecked: false, message: "" },
    username: {
      isChecking: false,
      isValid: false,
      isChecked: false,
      message: "",
    },
    password: { isValid: false, message: "" },
    confirmPassword: { isValid: false, message: "" },
    formIsValid: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (formData.password) {
      setValidation((prev) => ({
        ...prev,
        password: {
          isValid: isValidPassword(formData.password),
          message: isValidPassword(formData.password)
            ? "사용 가능한 비밀번호입니다."
            : "비밀번호는 6~12자리로 입력해주세요.",
        },
      }));
    }

    if (formData.confirmPassword) {
      setValidation((prev) => ({
        ...prev,
        confirmPassword: {
          isValid: doPasswordsMatch(formData.password, formData.confirmPassword),
          message: doPasswordsMatch(formData.password, formData.confirmPassword)
            ? "비밀번호가 일치합니다."
            : "비밀번호가 일치하지 않습니다.",
        },
      }));
    }
  }, [formData.password, formData.confirmPassword]);

  // 전체 폼 유효성 검사
  useEffect(() => {
    const isFormValid =
      validation.username.isValid &&
      validation.email.isValid &&
      validation.password.isValid &&
      validation.confirmPassword.isValid &&
      formData.petName?.trim() !== "" &&
      formData.petAge?.trim() !== "" &&
      formData.petBreed?.trim() !== "" &&
      formData.address?.trim() !== "";

    setValidation((prev) => ({ ...prev, formIsValid: isFormValid }));
  }, [validation, formData]);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "username" || name === "email") {
      setValidation((prev) => ({
        ...prev,
        [name]: { isChecking: false, isValid: false, isChecked: false, message: "" },
      }));
    }

    if (registerError) {
      setRegisterError("");
    }
  };

  // 셀렉트 변경 핸들러
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 카카오 우편번호 API 자동 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ 주소 검색 실행 (버튼 클릭 시 바로 실행)
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.roadAddress || data.jibunAddress;
        const districtMatch = fullAddress.match(/([가-힣]+구)/);
        const district = districtMatch ? districtMatch[1] : "";

        setFormData((prev) => ({ ...prev, address: fullAddress, location: district }));
      },
    }).open();
  };

  // 파일 입력 핸들러
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // ✅ 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation.formIsValid) {
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      const userBlob = new Blob([JSON.stringify(formData)], { type: "application/json" });
      formDataToSend.append("user", userBlob);

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      const response = await register(formDataToSend);

      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);

        if (onLogin) {
          onLogin(response.user, response.token);
        }

        navigate("/");
      }
    } catch (error) {
      setRegisterError(error.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2 className="auth-card-title">회원가입</h2>
            <p className="auth-card-description">댕근의 새로운 회원이 되어보세요.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-card-content">
              {registerError && <div className="auth-alert auth-alert-error">{registerError}</div>}

              <div className="form-group">
                <label htmlFor="email" className="form-label">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="auth-card-footer">
              <button type="submit" className="auth-button auth-button-primary" disabled={isLoading || !validation.formIsValid}>
                {isLoading ? "가입 중..." : "회원가입"}
              </button>

              <p className="auth-footer-text">
                이미 계정이 있으신가요? <Link to="/login" className="auth-link">로그인</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
