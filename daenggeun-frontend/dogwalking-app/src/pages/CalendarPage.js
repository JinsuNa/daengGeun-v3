"use client"

/**
 * 캘린더 페이지 컴포넌트
 *
 * 이 컴포넌트는 사용자가 일정과 할 일을 관리할 수 있는 캘린더 기능을 제공합니다.
 * 일정 추가, 조회, 할 일 관리 등의 기능이 포함되어 있습니다.
 *
 * @component
 * @requires React
 * @requires react-router-dom
 * @requires date-fns
 * @requires ../styles/Calendar.css
 */

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns"
import { ko } from "date-fns/locale"
import "../styles/Calendar.css"

function CalendarPage({ isAuthenticated }) {
  const navigate = useNavigate()

  // 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [activeTab, setActiveTab] = useState("events")
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "12:00",
    location: "",
    withWhom: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 인증 상태 확인
  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/calendar" } })
    }
  }, [isAuthenticated, navigate])

  // 초기 데이터 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('일정 데이터 가져오기 실패:', error);
      }
    };
    
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('할 일 데이터 가져오기 실패:', error);
      }
    };
    
    fetchEvents();
    fetchTodos();
    */

    // 임시 더미 데이터
    const dummyEvents = [
      {
        id: 1,
        title: "초코와 산책",
        date: new Date(),
        time: "15:00",
        location: "한강공원",
        withWhom: "김철수",
        type: "산책",
      },
      {
        id: 2,
        title: "동물병원 방문",
        date: addDays(new Date(), 2),
        time: "13:30",
        location: "행복 동물병원",
        withWhom: "혼자",
        type: "동물병원",
      },
      {
        id: 3,
        title: "몽이와 산책",
        date: addDays(new Date(), 4),
        time: "16:00",
        location: "근처 공원",
        withWhom: "박지민",
        type: "산책",
      },
    ]

    const dummyTodos = [
      {
        id: 1,
        text: "강아지 사료 구매하기",
        completed: false,
        date: new Date(),
      },
      {
        id: 2,
        text: "동물병원 예약하기",
        completed: true,
        date: new Date(),
      },
    ]

    setEvents(dummyEvents)
    setTodos(dummyTodos)
  }, [])

  // 이전 달로 이동
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // 다음 달로 이동
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // 오늘로 이동
  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // 날짜 선택 핸들러
  const handleDateClick = (day) => {
    setSelectedDate(day)
  }

  // 캘린더 헤더 렌더링
  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>&lt;</button>
          <h2>{format(currentDate, "yyyy년 M월")}</h2>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>&gt;</button>
        </div>
        <div className="calendar-view-options">
          <button className="btn-outline active">월</button>
          <button className="btn-outline">주</button>
        </div>
      </div>
    )
  }

  // 요일 헤더 렌더링
  const renderDays = () => {
    const days = []
    const dateFormat = "EEE"
    const startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(<th key={i}>{format(addDays(startDate, i), dateFormat, { locale: ko })}</th>)
    }

    return <tr>{days}</tr>
  }

  // 날짜 셀 렌더링
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d")
        const cloneDay = day
        const isCurrentMonth = isSameMonth(day, monthStart)

        // 해당 날짜의 이벤트 찾기
        const dayEvents = events.filter((event) => isSameDay(event.date, cloneDay))

        // 날짜 클래스 결정
        const dayClass = `calendar-day ${
          !isCurrentMonth ? "other-month" : ""
        } ${isSameDay(day, selectedDate) ? "selected" : ""} ${isSameDay(day, new Date()) ? "today" : ""}`

        days.push(
          <td key={day} onClick={() => handleDateClick(cloneDay)}>
            <div className={dayClass}>
              <span className={`calendar-day-number ${i === 0 || i === 6 ? "weekend" : ""}`}>{formattedDate}일</span>
              {dayEvents.length > 0 && (
                <div className="calendar-events">
                  {dayEvents.map((event, index) => (
                    <div key={index} className={`calendar-event-dot ${event.type === "동물병원" ? "blue" : ""}`}>
                      <span className="event-time">{event.time}</span>
                      <span className="event-title">{event.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </td>,
        )
        day = addDays(day, 1)
      }
      rows.push(<tr key={day}>{days}</tr>)
      days = []
    }
    return <tbody>{rows}</tbody>
  }

  // 할 일 추가 핸들러
  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      date: selectedDate,
    }

    setTodos([...todos, newTodoItem])
    setNewTodo("")
  }

  // 할 일 완료 상태 토글 핸들러
  const toggleTodoCompleted = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // 할 일 삭제 핸들러
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // 일정 추가 다이얼로그 열기 핸들러
  const handleOpenAddEventDialog = () => {
    setNewEvent({
      ...newEvent,
      date: selectedDate,
    })
    setIsAddEventDialogOpen(true)
  }

  // 일정 추가 다이얼로그 닫기 핸들러
  const handleCloseAddEventDialog = () => {
    setIsAddEventDialogOpen(false)
  }

  // 일정 추가 핸들러
  const handleAddEvent = () => {
    // 입력 유효성 검사
    if (!newEvent.title || !newEvent.time || !newEvent.location) {
      alert("제목, 시간, 장소를 모두 입력해주세요.")
      return
    }

    setIsSubmitting(true)

    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const addEvent = async () => {
      try {
        const eventData = {
          title: newEvent.title,
          date: format(newEvent.date, 'yyyy-MM-dd'),
          time: newEvent.time,
          location: newEvent.location,
          withWhom: newEvent.withWhom || '혼자',
        };
        
        const response = await axios.post('http://localhost:8080/api/events', eventData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.data.success) {
          const newEventWithId = {
            ...eventData,
            id: response.data.id,
            date: newEvent.date,
          };
          
          setEvents([...events, newEventWithId]);
          setIsAddEventDialogOpen(false);
          setNewEvent({
            title: '',
            date: selectedDate,
            time: '12:00',
            location: '',
            withWhom: '',
          });
        }
      } catch (error) {
        console.error('일정 추가 실패:', error);
        alert('일정을 추가하는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    addEvent();
    */

    // 임시 구현 (백엔드 연동 전까지만 사용)
    setTimeout(() => {
      const newEventWithId = {
        ...newEvent,
        id: Date.now(),
      }

      setEvents([...events, newEventWithId])
      setIsAddEventDialogOpen(false)
      setNewEvent({
        title: "",
        date: selectedDate,
        time: "12:00",
        location: "",
        withWhom: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  // 선택한 날짜의 할 일 필터링
  const filteredTodos = todos.filter((todo) => isSameDay(todo.date, selectedDate))

  // 선택한 날짜의 일정 필터링
  const filteredEvents = events.filter((event) => isSameDay(event.date, selectedDate))

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1 className="page-title">캘린더</h1>
        <button className="btn btn-primary" onClick={handleOpenAddEventDialog}>
          일정 추가
        </button>
      </div>

      <div className="calendar-container">
        {/* 캘린더 */}
        <div className="calendar-card">
          <div className="calendar-card-header">
            <div>
              <h2 className="calendar-card-title">캘린더</h2>
              <p className="calendar-card-description">일정과 할 일을 관리하세요</p>
            </div>
          </div>
          <div className="calendar-card-content">
            <div className="calendar">
              {renderHeader()}
              <table className="calendar-table">
                <thead>{renderDays()}</thead>
                {renderCells()}
              </table>
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="calendar-card sidebar-card">
          <div className="sidebar-tabs">
            <div className="sidebar-tabs-list">
              <div
                className={`sidebar-tab ${activeTab === "events" ? "active" : ""}`}
                onClick={() => setActiveTab("events")}
              >
                일정
              </div>
              <div
                className={`sidebar-tab ${activeTab === "todos" ? "active" : ""}`}
                onClick={() => setActiveTab("todos")}
              >
                할 일
              </div>
            </div>

            <div className={`sidebar-tab-content ${activeTab === "events" ? "active" : ""}`}>
              <h3 className="sidebar-date">{format(selectedDate, "yyyy년 MM월 dd일 (EEE)", { locale: ko })} 일정</h3>

              {filteredEvents.length > 0 ? (
                <div className="event-list">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="event-item">
                      <h4 className="event-title">{event.title}</h4>
                      <div className="event-meta">
                        <div className="event-meta-item">
                          <span className="event-meta-icon">🕒</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="event-meta-item">
                          <span className="event-meta-icon">📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="event-meta-item">
                          <span className="event-meta-icon">👤</span>
                          <span>함께: {event.withWhom}</span>
                        </div>
                      </div>
                      <div className="event-actions">
                        <button className="btn btn-outline btn-sm">수정</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>예정된 일정이 없습니다</p>
                </div>
              )}
            </div>

            <div className={`sidebar-tab-content ${activeTab === "todos" ? "active" : ""}`}>
              <h3 className="sidebar-date">{format(selectedDate, "yyyy년 MM월 dd일 (EEE)", { locale: ko })} 할 일</h3>

              <form onSubmit={handleAddTodo} className="todo-form">
                <input
                  type="text"
                  className="form-input todo-input"
                  placeholder="할 일을 입력하세요"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  추가
                </button>
              </form>

              {filteredTodos.length > 0 ? (
                <div className="todo-list">
                  {filteredTodos.map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <label className="todo-checkbox-label">
                        <input
                          type="checkbox"
                          className="todo-checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodoCompleted(todo.id)}
                        />
                        <span className={`todo-text ${todo.completed ? "completed" : ""}`}>{todo.text}</span>
                      </label>
                      <button className="todo-delete" onClick={() => handleDeleteTodo(todo.id)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>할 일이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 일정 추가 모달 */}
      {isAddEventDialogOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">새 일정 추가</h3>
              <button className="modal-close" onClick={handleCloseAddEventDialog}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="event-form-group">
                <label htmlFor="event-title" className="form-label">
                  제목
                </label>
                <input
                  type="text"
                  id="event-title"
                  className="form-input"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="일정 제목"
                />
              </div>
              <div className="event-form-row">
                <div className="event-form-group">
                  <label htmlFor="event-date" className="form-label">
                    날짜
                  </label>
                  <input
                    type="date"
                    id="event-date"
                    className="form-input"
                    value={format(newEvent.date, "yyyy-MM-dd")}
                    onChange={(e) => {
                      const newDate = e.target.value ? parseISO(e.target.value) : new Date()
                      setNewEvent({ ...newEvent, date: newDate })
                    }}
                  />
                </div>
                <div className="event-form-group">
                  <label htmlFor="event-time" className="form-label">
                    시간
                  </label>
                  <input
                    type="time"
                    id="event-time"
                    className="form-input"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="event-form-group">
                <label htmlFor="event-location" className="form-label">
                  장소
                </label>
                <input
                  type="text"
                  id="event-location"
                  className="form-input"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="장소"
                />
              </div>
              <div className="event-form-group">
                <label htmlFor="event-with" className="form-label">
                  함께하는 사람
                </label>
                <input
                  type="text"
                  id="event-with"
                  className="form-input"
                  value={newEvent.withWhom}
                  onChange={(e) => setNewEvent({ ...newEvent, withWhom: e.target.value })}
                  placeholder="함께하는 사람 (선택사항)"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={handleCloseAddEventDialog} disabled={isSubmitting}>
                취소
              </button>
              <button className="btn btn-primary" onClick={handleAddEvent} disabled={isSubmitting}>
                {isSubmitting ? "추가 중..." : "추가하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarPage

