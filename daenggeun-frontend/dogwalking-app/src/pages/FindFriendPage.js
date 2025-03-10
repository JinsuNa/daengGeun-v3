"use client"

import { useState, useEffect } from "react"
// 아이콘 대신 이모지 사용
import "../styles/find-friend.css"

function FindFriendPage({ isAuthenticated }) {
  // 상태 관리
  const [currentProfiles, setCurrentProfiles] = useState(null)
  const [matchedCount, setMatchedCount] = useState(3) // 매칭된 댕댕이 수
  const [showMatchedDogs, setShowMatchedDogs] = useState(false)
  const [matchedDogs] = useState([
    {
      id: 1,
      name: "뽀삐",
      location: "서초구",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "해피",
      location: "강남구",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "달리",
      location: "마포구",
      image: "/placeholder.svg?height=50&width=50",
    },
  ])

  const handleMatchedDogsClick = () => {
    setShowMatchedDogs(!showMatchedDogs)
  }

  const handleChat = (dogId) => {
    // 실제 구현 시에는 채팅 페이지로 이동
    alert(`${dogId}번 강아지와 채팅을 시작합니다.`)
  }

  const handleReject = (dogId) => {
    // 실제 구현 시에는 매칭 해제 API 호출
    alert(`${dogId}번 강아지와의 매칭을 해제합니다.`)
  }

  // 초기 데이터 로드
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    const dummyProfiles = [
      {
        id: 1,
        name: "초코",
        breed: "포메라니안",
        age: 3,
        gender: "남아",
        personality: "활발하고 친절해요. 다른 강아지와 잘 어울립니다.",
        location: "강남구",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 2,
        name: "콩이",
        breed: "말티즈",
        age: 2,
        gender: "여아",
        personality: "조용하고 온순해요. 천천히 친해지는 타입입니다.",
        location: "마포구",
        image: "/placeholder.svg?height=300&width=300",
      },
    ]

    setCurrentProfiles(dummyProfiles)
  }, [])

  // 선택 핸들러
  const handleSelect = (profile) => {
    alert(`${profile.name}를 선택하셨습니다!`)
  }

  // 둘 다 선택 안함 핸들러
  const handleSkipBoth = () => {
    alert("다른 친구들을 찾아볼게요!")
  }

  if (!currentProfiles) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="find-friend-page">
      <h1 className="find-friend-title">댕근찾기</h1>
      <p className="find-friend-description">
        마음에 드는 산책 친구를 선택하거나, 둘 다 마음에 들지 않으면 다른 친구들을 볼 수 있어요.
      </p>

      <div className="profiles-container">
        {/* 왼쪽 프로필 */}
        <div className="profile-card">
          <h2 className="profile-name">{currentProfiles[0].name}</h2>
          <img
            src={currentProfiles[0].image || "/placeholder.svg"}
            alt={currentProfiles[0].name}
            className="profile-image"
          />
          <div className="profile-details">
            <p>견종: {currentProfiles[0].breed}</p>
            <p>나이: {currentProfiles[0].age}살</p>
            <p>성별: {currentProfiles[0].gender}</p>
            <p className="profile-personality">{currentProfiles[0].personality}</p>
            <p className="profile-location">
              <span className="location-icon">📍</span>
              지역: {currentProfiles[0].location}
            </p>
          </div>
          <button className="select-button" onClick={() => handleSelect(currentProfiles[0])}>
            선택하기
          </button>
        </div>

        {/* 중앙 버튼 영역 */}
        <div className="center-buttons">
          <button className="skip-button" onClick={handleSkipBoth}>
            둘 다 선택 안함
          </button>
          <div className="matched-dogs-section">
            <button className="matched-count-button" onClick={handleMatchedDogsClick}>
              ↩ 매칭된 댕댕이 ({matchedCount})
            </button>
            {showMatchedDogs && (
              <div className="matched-dogs-modal">
                <div className="matched-dogs-list">
                  {matchedDogs.map((dog) => (
                    <div key={dog.id} className="matched-dog-item">
                      <div className="matched-dog-info">
                        <img src={dog.image || "/placeholder.svg"} alt={dog.name} className="matched-dog-image" />
                        <div className="matched-dog-details">
                          <span className="matched-dog-name">{dog.name}</span>
                          <span className="matched-dog-location">📍 {dog.location}</span>
                        </div>
                      </div>
                      <div className="matched-dog-actions">
                        <button className="chat-button" onClick={() => handleChat(dog.id)}>
                          채팅
                        </button>
                        <button className="reject-button" onClick={() => handleReject(dog.id)}>
                          거절
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 프로필 */}
        <div className="profile-card">
          <h2 className="profile-name">{currentProfiles[1].name}</h2>
          <img
            src={currentProfiles[1].image || "/placeholder.svg"}
            alt={currentProfiles[1].name}
            className="profile-image"
          />
          <div className="profile-details">
            <p>견종: {currentProfiles[1].breed}</p>
            <p>나이: {currentProfiles[1].age}살</p>
            <p>성별: {currentProfiles[1].gender}</p>
            <p className="profile-personality">{currentProfiles[1].personality}</p>
            <p className="profile-location">
              <span className="location-icon">📍</span>
              지역: {currentProfiles[1].location}
            </p>
          </div>
          <button className="select-button" onClick={() => handleSelect(currentProfiles[1])}>
            선택하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FindFriendPage

