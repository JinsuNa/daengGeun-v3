"use client"

/**
 * 채팅 페이지 컴포넌트
 *
 * 이 컴포넌트는 사용자가 매칭된 산책 친구와 채팅할 수 있는 기능을 제공합니다.
 * 메시지 전송, 수신, 약속 잡기 등의 기능이 포함되어 있습니다.
 *
 * @component
 * @requires React
 * @requires react-router-dom
 * @requires ../styles/Chat.css
 */

import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import "../styles/Chat.css"

function ChatPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const messagesEndRef = useRef(null)

  // URL 쿼리 파라미터에서 채팅 상대 정보 가져오기
  const queryParams = new URLSearchParams(location.search)
  const sellerParam = queryParams.get("seller")

  // 상태 관리
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [chatPartner, setChatPartner] = useState(sellerParam || "초코")
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState("14:00")
  const [meetingLocation, setMeetingLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)



  // 초기 메시지 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/${chatPartner}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('메시지 가져오기 실패:', error);
      }
    };
    
    fetchMessages();
    */

    // 임시 더미 데이터
    const dummyMessages = [
      {
        id: 1,
        sender: "other",
        text: "안녕하세요! 산책 친구가 되어서 반가워요 😊",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
    ]

    setMessages(dummyMessages)
  }, [chatPartner])

  // 메시지 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 메시지 전송 핸들러
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // 새 메시지 객체 생성
    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      timestamp: new Date(),
    }

    // 메시지 목록에 추가
    setMessages([...messages, newMsg])
    setNewMessage("")

    // 자동 응답 (실제로는 서버에서 처리)
    // 실제 구현 시에는 웹소켓이나 API 호출로 대체
    setTimeout(() => {
      const autoReply = {
        id: messages.length + 2,
        sender: "other",
        text: "네, 알겠습니다! 언제 만나면 좋을까요?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, autoReply])
    }, 1000)
  }

  // 약속 잡기 다이얼로그 열기 핸들러
  const handleOpenScheduleDialog = () => {
    setIsAddEventDialogOpen(true)
  }

  // 약속 잡기 다이얼로그 닫기 핸들러
  const handleCloseScheduleDialog = () => {
    setIsAddEventDialogOpen(false)
  }

  // 약속 잡기 핸들러
  const handleScheduleMeeting = () => {
    // 입력 유효성 검사
    if (!date || !time || !meetingLocation) {
      alert("날짜, 시간, 장소를 모두 입력해주세요.")
      return
    }

    setIsSubmitting(true)

    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const scheduleMeeting = async () => {
      try {
        const meetingData = {
          date: format(date, 'yyyy-MM-dd'),
          time,
          location: meetingLocation,
          partner: chatPartner,
        };
        
        const response = await axios.post('http://localhost:8080/api/meetings', meetingData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.data.success) {
          // 약속 메시지 전송
          const meetingMsg = {
            id: messages.length + 1,
            sender: 'me',
            text: `약속이 잡혔습니다!\n날짜: ${format(date, 'yyyy년 MM월 dd일', { locale: ko })}\n시간: ${time}\n장소: ${meetingLocation}`,
            timestamp: new Date(),
          };
          
          setMessages([...messages, meetingMsg]);
          
          // 자동 응답
          setTimeout(() => {
            const autoReply = {
              id: messages.length + 2,
              sender: 'other',
              text: '좋아요! 약속 시간에 뵐게요. 기대되네요! 😊',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, autoReply]);
          }, 1000);
        }
      } catch (error) {
        console.error('약속 잡기 실패:', error);
        alert('약속을 잡는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
        setIsAddEventDialogOpen(false);
      }
    };
    
    scheduleMeeting();
    */

    // 임시 구현 (백엔드 연동 전까지만 사용)
    setTimeout(() => {
      // 약속 메시지 전송
      const meetingMsg = {
        id: messages.length + 1,
        sender: "me",
        text: `약속이 잡혔습니다!\n날짜: ${format(date, "yyyy년 MM월 dd일", { locale: ko })}\n시간: ${time}\n장소: ${meetingLocation}`,
        timestamp: new Date(),
      }

      setMessages([...messages, meetingMsg])

      // 자동 응답
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          sender: "other",
          text: "좋아요! 약속 시간에 뵐게요. 기대되네요! 😊",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, autoReply])
      }, 1000)

      // 캘린더에 일정 추가 (실제로는 API 호출)
      alert("일정이 캘린더에 추가되었습니다.")

      setIsSubmitting(false)
      setIsAddEventDialogOpen(false)
    }, 1000)
  }

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    const newDate = e.target.value ? new Date(e.target.value) : new Date()
    setDate(newDate)
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-card">
          {/* 채팅 헤더 */}
          <div className="chat-header">
            <h2 className="chat-title">{chatPartner}와의 대화</h2>
            <button className="schedule-button" onClick={handleOpenScheduleDialog}>
              약속 잡기
            </button>
          </div>

          {/* 채팅 내용 */}
          <div className="chat-content">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender === "me" ? "message-mine" : "message-other"}`}>
                <div className="message-bubble">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{format(message.timestamp, "HH:mm")}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력 폼 */}
          <div className="chat-footer">
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                className="message-input"
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="send-button">
                전송
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 약속 잡기 모달 */}
      {isAddEventDialogOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">산책 약속 잡기</h3>
              <button className="modal-close" onClick={handleCloseScheduleDialog}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="meeting-date" className="form-label">
                  날짜 선택
                </label>
                <input
                  type="date"
                  id="meeting-date"
                  className="form-input"
                  value={format(date, "yyyy-MM-dd")}
                  onChange={handleDateChange}
                  min={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="meeting-time" className="form-label">
                  시간
                </label>
                <input
                  type="time"
                  id="meeting-time"
                  className="form-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="meeting-location" className="form-label">
                  장소
                </label>
                <input
                  type="text"
                  id="meeting-location"
                  className="form-input"
                  placeholder="만남 장소를 입력하세요"
                  value={meetingLocation}
                  onChange={(e) => setMeetingLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={handleCloseScheduleDialog} disabled={isSubmitting}>
                취소
              </button>
              <button className="btn btn-primary" onClick={handleScheduleMeeting} disabled={isSubmitting}>
                {isSubmitting ? "처리 중..." : "약속 잡기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPage

