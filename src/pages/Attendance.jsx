import { useEffect, useMemo, useState } from 'react'
import './Attendance.css'
import { ATTENDANCE_STORAGE_KEY, CHILD_PROFILES_STORAGE_KEY } from '../constants/storageKeys'

function createAttendanceId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `attendance-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function formatEventType(type) {
  return type === 'dropOff' ? 'Drop-off' : 'Pick-up'
}

function findActiveRecordIndex(records, childId) {
  for (let i = records.length - 1; i >= 0; i -= 1) {
    if (records[i].childId === childId && (!records[i].pickUp || !records[i].pickUp.confirmedAt)) {
      return i
    }
  }

  return -1
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return '—'
  }

  return new Date(timestamp).toLocaleString()
}

function Attendance() {
  const [children, setChildren] = useState([])
  const [selectedChildId, setSelectedChildId] = useState('')
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const storedChildren = localStorage.getItem(CHILD_PROFILES_STORAGE_KEY)
    const storedAttendance = localStorage.getItem(ATTENDANCE_STORAGE_KEY)

    if (storedChildren) {
      try {
        const parsedChildren = JSON.parse(storedChildren)
        if (Array.isArray(parsedChildren)) {
          setChildren(parsedChildren)
          if (parsedChildren.length > 0) {
            setSelectedChildId(parsedChildren[0].id)
          }
        }
      } catch {
        localStorage.removeItem(CHILD_PROFILES_STORAGE_KEY)
      }
    }

    if (storedAttendance) {
      try {
        const parsedAttendance = JSON.parse(storedAttendance)
        if (Array.isArray(parsedAttendance)) {
          setAttendanceRecords(parsedAttendance)
        }
      } catch {
        localStorage.removeItem(ATTENDANCE_STORAGE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(attendanceRecords))
  }, [attendanceRecords])

  const childById = useMemo(
    () => new Map(children.map((child) => [child.id, child])),
    [children],
  )

  const pendingConfirmations = useMemo(
    () =>
      attendanceRecords.flatMap((record) => {
        const pending = []

        if (record.dropOff?.initiatedAt && !record.dropOff?.confirmedAt) {
          pending.push({ recordId: record.id, type: 'dropOff', childName: record.childName, details: record.dropOff })
        }

        if (record.pickUp?.initiatedAt && !record.pickUp?.confirmedAt) {
          pending.push({ recordId: record.id, type: 'pickUp', childName: record.childName, details: record.pickUp })
        }

        return pending
      }),
    [attendanceRecords],
  )

  const sortedAttendanceRecords = useMemo(
    () =>
      [...attendanceRecords].sort((a, b) => {
        const bTime = Date.parse(b.dropOff?.initiatedAt ?? '') || 0
        const aTime = Date.parse(a.dropOff?.initiatedAt ?? '') || 0
        return bTime - aTime
      }),
    [attendanceRecords],
  )

  function initiateParentEvent(type) {
    if (!selectedChildId || !childById.has(selectedChildId)) {
      setFeedback('Please choose a child that already exists in the system.')
      return
    }

    const child = childById.get(selectedChildId)
    const now = new Date().toISOString()

    setAttendanceRecords((prev) => {
      const next = [...prev]
      const activeIndex = findActiveRecordIndex(next, selectedChildId)
      const activeRecord = activeIndex >= 0 ? next[activeIndex] : null

      if (type === 'dropOff') {
        if (activeRecord) {
          setFeedback('This child already has an open attendance record.')
          return prev
        }

        setFeedback('Drop-off initiated and waiting for provider confirmation.')
        return [
          ...next,
          {
            id: createAttendanceId(),
            childId: child.id,
            childName: `${child.firstName} ${child.lastName}`,
            dropOff: {
              initiatedAt: now,
              initiatedBy: 'Parent',
              confirmedAt: null,
              confirmedBy: null,
            },
            pickUp: null,
          },
        ]
      }

      if (!activeRecord) {
        setFeedback('No active check-in record found for pickup.')
        return prev
      }

      if (activeRecord.pickUp) {
        setFeedback('Pickup has already been initiated for this child.')
        return prev
      }

      next[activeIndex] = {
        ...activeRecord,
        pickUp: {
          initiatedAt: now,
          initiatedBy: 'Parent',
          confirmedAt: null,
          confirmedBy: null,
        },
      }

      setFeedback('Pickup initiated and waiting for provider confirmation.')
      return next
    })
  }

  function confirmByProvider(recordId, type) {
    const now = new Date().toISOString()
    setAttendanceRecords((prev) =>
      prev.map((record) => {
        if (record.id !== recordId) {
          return record
        }

        if (type === 'dropOff') {
          return {
            ...record,
            dropOff: {
              ...record.dropOff,
              confirmedAt: now,
              confirmedBy: 'Provider',
            },
          }
        }

        return {
          ...record,
          pickUp: {
            ...record.pickUp,
            confirmedAt: now,
            confirmedBy: 'Provider',
          },
        }
      }),
    )
  }

  return (
    <main className="attendance-page">
      <div className="attendance-container">
        <header className="attendance-header">
          <p className="attendance-eyebrow">Daily operations</p>
          <h1>Parent Check-In / Check-Out</h1>
          <p>
            Parents initiate attendance events and providers confirm them to create a verified record.
          </p>
        </header>

        <section className="attendance-card" aria-label="Parent actions">
          <h2>Parent side</h2>
          <p className="attendance-help">
            Child must already exist in the system. Add a child profile first if needed.
          </p>
          {children.length === 0 ? (
            <p className="attendance-warning">No child profiles found. Add one from the Child Profile page first.</p>
          ) : (
            <>
              <label htmlFor="childSelection">Choose child</label>
              <select
                id="childSelection"
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
              >
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName}
                  </option>
                ))}
              </select>
              <div className="attendance-actions">
                <button type="button" className="btn-primary" onClick={() => initiateParentEvent('dropOff')}>
                  Parent drop-off
                </button>
                <button type="button" className="btn-primary" onClick={() => initiateParentEvent('pickUp')}>
                  Parent pick-up
                </button>
              </div>
            </>
          )}
          {feedback && <p className="attendance-feedback">{feedback}</p>}
        </section>

        <section className="attendance-card" aria-label="Provider confirmations">
          <h2>Provider side</h2>
          <p className="attendance-help">Pending confirmations ({pendingConfirmations.length})</p>
          {pendingConfirmations.length === 0 ? (
            <p className="attendance-help">No pending confirmations.</p>
          ) : (
            <ul className="pending-list">
              {pendingConfirmations.map((event) => (
                <li key={`${event.recordId}-${event.type}`} className="pending-item">
                  <div>
                    <strong>{event.childName}</strong>
                    <p>
                      {formatEventType(event.type)} initiated by {event.details.initiatedBy} at{' '}
                      {formatTimestamp(event.details.initiatedAt)}
                    </p>
                  </div>
                  <button type="button" className="btn-primary" onClick={() => confirmByProvider(event.recordId, event.type)}>
                    Confirm {formatEventType(event.type).toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="attendance-card" aria-label="Attendance history">
          <h2>Attendance history</h2>
          {attendanceRecords.length === 0 ? (
            <p className="attendance-help">No attendance events recorded yet.</p>
          ) : (
            <ul className="history-list">
              {sortedAttendanceRecords.map((record) => (
                <li key={record.id} className="history-item">
                  <strong>{record.childName}</strong>
                  <p>
                    Drop-off time: {formatTimestamp(record.dropOff?.initiatedAt)} · Initiated by {record.dropOff?.initiatedBy || '—'}
                  </p>
                  <p>
                    Drop-off confirmation: {record.dropOff?.confirmedBy || 'Pending'} ·{' '}
                    {formatTimestamp(record.dropOff?.confirmedAt)}
                  </p>
                  <p>
                    Pickup time: {formatTimestamp(record.pickUp?.initiatedAt)} · Initiated by{' '}
                    {record.pickUp?.initiatedBy || '—'}
                  </p>
                  <p>
                    Pickup confirmation: {record.pickUp?.confirmedBy || 'Pending'} ·{' '}
                    {formatTimestamp(record.pickUp?.confirmedAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default Attendance
