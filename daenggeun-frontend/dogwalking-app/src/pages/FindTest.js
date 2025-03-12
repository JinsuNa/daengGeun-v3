import React, { useEffect, useState } from "react";
import axios from "axios";
import {matchApi} from "../utils/matchApi"
import "../styles/find-friend.css";

const BASE_URL = "http://localhost:8080/api/match";

const FindFriendPage = () => {
  const [currentProfiles, setCurrentProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedCount, setMatchedCount] = useState(3); // 매칭된 댕댕이 수
  const [showMatchedDogs, setShowMatchedDogs] = useState(false);

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const fetchRandomUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/random`);
      setCurrentProfiles(response.data);
    } catch (error) {
      console.error("랜덤 사용자 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchedDogsClick = () => {
    setShowMatchedDogs(!showMatchedDogs);
  };

  
//   선택하기 버튼 클릭 시 like +1 db 저장
const handleSelect = async (id) => {
    if(!id){
        await fetchRandomUsers()
    }
    try {
        await axios.post(`${BASE_URL}/like/${id}`)
        await fetchRandomUsers()
    } catch (error) {
        console.log("좋아요 증가 실패: ", error);
    }
    
};


  const handleChat = (dogId) => {
    // 실제 구현 시에는 채팅 페이지로 이동
    alert(`${currentProfiles[0]?.name}와 채팅을 시작합니다.`);
  };

  const handleReject = (dogId) => {
    // 실제 구현 시에는 매칭 해제 API 호출
    alert(`${currentProfiles[0]?.name}와의 매칭을 해제합니다.`);
  };

  return (
    <div className="find-friend-page">
      <h1 className="find-friend-title">댕근찾기</h1>
      <p className="find-friend-description">마음에 드는 친구를 선택하세요!</p>

      {loading ? (
        <p>랜덤 강아지를 불러오는 중...</p>
      ) : (
        <div className="profiles-container">
          <div className="profile-card">
            <h2>{currentProfiles[0]?.name}</h2>
            <img
              src={currentProfiles[0]?.image || "/placeholder.svg"}
              alt={currentProfiles[0]?.name}
              className="profile-image"
            />
            <div className="profile-details">
              <p>견종: {currentProfiles[0]?.breed}</p>
              <p>나이: {currentProfiles[0]?.age}살</p>
              <p>성별: {currentProfiles[0]?.gender}</p>
              <p>{currentProfiles[0]?.personality}</p>
              <p>📍 {currentProfiles[0]?.location}</p>
            </div>
            <button className="select-button" onClick={()=>handleSelect(currentProfiles[0]?.id)}>선택하기</button>
          </div>

          {/* 중앙 버튼 영역 - 카드들 사이에 위치 */}
          <div className="center-buttons">
            <button className="skip-button" onClick={fetchRandomUsers}>
              둘 다 선택 안함
            </button>
            <button
              className="matched-count-button"
              onClick={handleMatchedDogsClick}
            >
              ↩ 매칭된 댕댕이 ({matchedCount})
            </button>
            {showMatchedDogs && (
              <div className="matched-dogs-modal">
                <p>매칭된 댕댕이 리스트를 여기에 표시</p>
              </div>
            )}
          </div>

          <div className="profile-card">
            <h2>{currentProfiles[1]?.name}</h2>
            <img
              src={currentProfiles[1]?.image || "/placeholder.svg"}
              alt={currentProfiles[1]?.name}
              className="profile-image"
            />
                <div className="profile-details">
              <p>견종: {currentProfiles[1]?.breed}</p>
              <p>나이: {currentProfiles[1]?.age}살</p>
              <p>성별: {currentProfiles[1]?.gender}</p>
              <p>{currentProfiles[1]?.personality}</p>
              <p>📍 {currentProfiles[1]?.location}</p>
            </div>
            <button className="select-button" onClick={()=>handleSelect(currentProfiles[1]?.id)}>선택하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindFriendPage;
