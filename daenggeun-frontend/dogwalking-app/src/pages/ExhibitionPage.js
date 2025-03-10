"use client"

/**
 * 박람회 페이지 컴포넌트
 *
 * 이 컴포넌트는 현재 진행 중인 박람회와 예정된 박람회 정보를 제공합니다.
 * 사용자는 박람회 정보를 확인하고 상세 정보를 볼 수 있습니다.
 *
 * @component
 * @requires React
 * @requires react-router-dom
 */

import { useState, useEffect } from "react"
import "../styles/Community.css"

function ExhibitionPage() {
  // 상태 관리
  const [exhibitions, setExhibitions] = useState([])
  const [activeTab, setActiveTab] = useState("current")
  const [isLoading, setIsLoading] = useState(true)

  // 박람회 데이터 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const fetchExhibitions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/exhibitions');
        setExhibitions(response.data);
      } catch (error) {
        console.error('박람회 데이터 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExhibitions();
    */

    // 임시 더미 데이터
    const dummyExhibitions = [
      {
        id: 1,
        title: "2023 서울 반려동물 박람회",
        description:
          "다양한 반려동물 용품과 서비스를 한자리에서 만나볼 수 있는 박람회입니다. 최신 트렌드와 혁신적인 제품들을 경험해보세요.",
        startDate: "2023-11-10",
        endDate: "2023-11-15",
        location: "서울 코엑스",
        image: "/placeholder.svg?height=400&width=600",
        status: "current",
        tags: ["반려동물용품", "건강", "식품"],
      },
      {
        id: 2,
        title: "강아지 건강 페스티벌",
        description:
          "강아지의 건강을 위한 다양한 정보와 제품을 소개하는 페스티벌입니다. 전문가의 건강 상담도 받아보세요.",
        startDate: "2023-11-20",
        endDate: "2023-11-25",
        location: "부산 벡스코",
        image: "/placeholder.svg?height=400&width=600",
        status: "current",
        tags: ["건강검진", "영양", "운동"],
      },
      {
        id: 3,
        title: "2024 펫 케어 엑스포",
        description: "반려동물 케어에 관한 모든 것을 다루는 엑스포입니다. 최신 케어 제품과 서비스를 만나보세요.",
        startDate: "2024-01-15",
        endDate: "2024-01-20",
        location: "서울 코엑스",
        image: "/placeholder.svg?height=400&width=600",
        status: "upcoming",
        tags: ["그루밍", "미용", "케어"],
      },
      {
        id: 4,
        title: "반려동물 행동교정 세미나",
        description:
          "반려동물의 행동 문제를 해결하기 위한 전문가들의 세미나입니다. 실용적인 팁과 교육 방법을 배워가세요.",
        startDate: "2024-02-05",
        endDate: "2024-02-07",
        location: "대전 컨벤션센터",
        image: "/placeholder.svg?height=400&width=600",
        status: "upcoming",
        tags: ["교육", "행동교정", "훈련"],
      },
    ]

    // 데이터 로드 시뮬레이션
    setTimeout(() => {
      setExhibitions(dummyExhibitions)
      setIsLoading(false)
    }, 500)
  }, [])

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // 현재 진행 중인 박람회 필터링
  const currentExhibitions = exhibitions.filter((exhibition) => exhibition.status === "current")

  // 예정된 박람회 필터링
  const upcomingExhibitions = exhibitions.filter((exhibition) => exhibition.status === "upcoming")

  // 박람회 카드 컴포넌트
  const ExhibitionCard = ({ exhibition }) => {
    return (
      <div className="card">
        <div className="exhibition-image-container">
          <img src={exhibition.image || "/placeholder.svg"} alt={exhibition.title} className="exhibition-image" />
          <span className={`badge ${exhibition.status === "current" ? "badge-primary" : "badge-secondary"}`}>
            {exhibition.status === "current" ? "진행 중" : "예정"}
          </span>
        </div>
        <div className="card-header">
          <h2 className="card-title">{exhibition.title}</h2>
          <p className="card-meta">
            {exhibition.startDate} ~ {exhibition.endDate}
          </p>
        </div>
        <div className="card-content">
          <p className="card-description">{exhibition.description}</p>
          <div className="exhibition-meta">
            <div className="exhibition-location">
              <span className="exhibition-location-icon">📍</span>
              <span>{exhibition.location}</span>
            </div>
          </div>
          <div className="tags">
            {exhibition.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">자세히 보기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">반려동물 박람회 정보</h1>
      </div>
      <p className="page-description">
        현재 진행 중인 박람회와 곧 열릴 박람회 정보를 확인하고 참여해보세요. 다양한 반려동물 관련 제품과 서비스를 만나볼
        수 있습니다.
      </p>

      <div className="tabs">
        <div className="tabs-list">
          <div className={`tab ${activeTab === "current" ? "active" : ""}`} onClick={() => handleTabChange("current")}>
            진행 중인 박람회
          </div>
          <div
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => handleTabChange("upcoming")}
          >
            예정된 박람회
          </div>
        </div>

        <div className={`tab-content ${activeTab === "current" ? "active" : ""}`}>
          {isLoading ? (
            <div className="loading">로딩 중...</div>
          ) : currentExhibitions.length > 0 ? (
            <div className="card-grid">
              {currentExhibitions.map((exhibition) => (
                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>현재 진행 중인 박람회가 없습니다.</p>
            </div>
          )}
        </div>

        <div className={`tab-content ${activeTab === "upcoming" ? "active" : ""}`}>
          {isLoading ? (
            <div className="loading">로딩 중...</div>
          ) : upcomingExhibitions.length > 0 ? (
            <div className="card-grid">
              {upcomingExhibitions.map((exhibition) => (
                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>예정된 박람회가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExhibitionPage

