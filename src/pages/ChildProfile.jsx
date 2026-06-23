import { useEffect, useState } from 'react'
import './ChildProfile.css'
import { CHILD_PROFILES_STORAGE_KEY } from '../constants/storageKeys'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  allergies: '',
  dietaryRestrictions: '',
  medicalNotes: '',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactPhone: '',
}

function ChildProfile() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [savedProfiles, setSavedProfiles] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(CHILD_PROFILES_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setSavedProfiles(parsed)
        }
      } catch {
        localStorage.removeItem(CHILD_PROFILES_STORAGE_KEY)
      }
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }
    localStorage.setItem(CHILD_PROFILES_STORAGE_KEY, JSON.stringify(savedProfiles))
  }, [isHydrated, savedProfiles])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSavedProfiles((prev) => [...prev, { ...form, id: crypto.randomUUID() }])
    setForm(INITIAL_FORM)
    setSubmitted(true)
  }

  function handleAddAnother() {
    setSubmitted(false)
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <p className="profile-eyebrow">Parent onboarding</p>
          <h1 className="profile-title">Child Profile</h1>
          <p className="profile-subtitle">
            Fill in your child&apos;s information so our team can provide the best possible care.
          </p>
        </div>

        {submitted ? (
          <div className="success-card">
            <span className="success-icon" aria-hidden="true">✓</span>
            <h2>Profile saved!</h2>
            <p>
              Your child&apos;s profile has been saved. You can add another child below.
            </p>
            <button className="btn-primary" onClick={handleAddAnother}>
              Add another child
            </button>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="form-section">
              <legend className="form-section-title">Child information</legend>
              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="firstName" className="field-label">
                    First name <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="field-input"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Emma"
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="lastName" className="field-label">
                    Last name <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="field-input"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Johnson"
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="field-group">
                <label htmlFor="dateOfBirth" className="field-label">
                  Date of birth <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="field-input field-input--date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend className="form-section-title">Health &amp; dietary needs</legend>
              <div className="field-group">
                <label htmlFor="allergies" className="field-label">
                  Allergies
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  className="field-textarea"
                  value={form.allergies}
                  onChange={handleChange}
                  placeholder="List any known allergies, e.g. peanuts, tree nuts, dairy…"
                  rows={3}
                />
              </div>
              <div className="field-group">
                <label htmlFor="dietaryRestrictions" className="field-label">
                  Dietary restrictions
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  className="field-textarea"
                  value={form.dietaryRestrictions}
                  onChange={handleChange}
                  placeholder="e.g. vegetarian, gluten-free, halal, kosher…"
                  rows={3}
                />
              </div>
              <div className="field-group">
                <label htmlFor="medicalNotes" className="field-label">
                  Medical notes
                </label>
                <textarea
                  id="medicalNotes"
                  name="medicalNotes"
                  className="field-textarea"
                  value={form.medicalNotes}
                  onChange={handleChange}
                  placeholder="Any medical conditions, medications, or special instructions our staff should know…"
                  rows={4}
                />
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend className="form-section-title">Emergency contact</legend>
              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="emergencyContactName" className="field-label">
                    Contact name <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="emergencyContactName"
                    name="emergencyContactName"
                    type="text"
                    className="field-input"
                    value={form.emergencyContactName}
                    onChange={handleChange}
                    placeholder="e.g. Michael Johnson"
                    required
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="emergencyContactRelationship" className="field-label">
                    Relationship <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    type="text"
                    className="field-input"
                    value={form.emergencyContactRelationship}
                    onChange={handleChange}
                    placeholder="e.g. Father, Grandmother…"
                    required
                  />
                </div>
              </div>
              <div className="field-group">
                <label htmlFor="emergencyContactPhone" className="field-label">
                  Phone number <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  className="field-input field-input--phone"
                  value={form.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="e.g. (555) 867-5309"
                  pattern="[\+]?[\d\s\-\(\)]{7,20}"
                  title="Enter a valid phone number"
                  required
                  autoComplete="tel"
                />
              </div>
            </fieldset>

            <div className="form-actions">
              <p className="required-note">
                <span className="required" aria-hidden="true">*</span> Required fields
              </p>
              <button type="submit" className="btn-primary">
                Save child profile
              </button>
            </div>
          </form>
        )}

        {savedProfiles.length > 0 && (
          <section className="saved-profiles" aria-label="Saved child profiles">
            <h2 className="saved-title">Saved profiles ({savedProfiles.length})</h2>
            <ul className="profile-list">
              {savedProfiles.map((profile) => (
                <li key={profile.id} className="profile-item">
                  <div className="profile-item-main">
                    <strong className="profile-name">
                      {profile.firstName} {profile.lastName}
                    </strong>
                    {profile.dateOfBirth && (
                      <span className="profile-dob">DOB: {profile.dateOfBirth}</span>
                    )}
                  </div>
                  {profile.emergencyContactName && (
                    <div className="profile-item-meta">
                      Emergency: {profile.emergencyContactName}
                      {profile.emergencyContactRelationship &&
                        ` (${profile.emergencyContactRelationship})`}
                      {profile.emergencyContactPhone && ` · ${profile.emergencyContactPhone}`}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}

export default ChildProfile
