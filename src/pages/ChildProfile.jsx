import { useState } from 'react'
import './ChildProfile.css'

const EMPTY_FORM = {
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
  const [form, setForm] = useState(EMPTY_FORM)
  const [savedProfiles, setSavedProfiles] = useState([])
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSavedProfiles((prev) => [...prev, { ...form, id: Date.now() }])
    setForm(EMPTY_FORM)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="cp-page">
      <div className="cp-container">
        <header className="cp-header">
          <p className="cp-eyebrow">Parent onboarding</p>
          <h1 className="cp-title">Child Profile</h1>
          <p className="cp-subtitle">
            Add your child&apos;s information so our staff can provide the best possible care.
          </p>
        </header>

        {submitted && (
          <div className="cp-banner" role="status">
            ✓ Profile saved successfully.
          </div>
        )}

        <form className="cp-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="cp-fieldset">
            <legend className="cp-legend">Child information</legend>
            <div className="cp-row cp-row--2">
              <div className="cp-field">
                <label className="cp-label" htmlFor="firstName">
                  First name <span className="cp-required" aria-hidden="true">*</span>
                </label>
                <input
                  className="cp-input"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  placeholder="e.g. Emma"
                />
              </div>
              <div className="cp-field">
                <label className="cp-label" htmlFor="lastName">
                  Last name <span className="cp-required" aria-hidden="true">*</span>
                </label>
                <input
                  className="cp-input"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  placeholder="e.g. Johnson"
                />
              </div>
            </div>
            <div className="cp-row cp-row--1">
              <div className="cp-field">
                <label className="cp-label" htmlFor="dateOfBirth">
                  Date of birth <span className="cp-required" aria-hidden="true">*</span>
                </label>
                <input
                  className="cp-input"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="cp-fieldset">
            <legend className="cp-legend">Health &amp; dietary information</legend>
            <div className="cp-field">
              <label className="cp-label" htmlFor="allergies">
                Allergies
              </label>
              <textarea
                className="cp-textarea"
                id="allergies"
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                rows={3}
                placeholder="List any known allergies, or leave blank if none"
              />
            </div>
            <div className="cp-field">
              <label className="cp-label" htmlFor="dietaryRestrictions">
                Dietary restrictions
              </label>
              <textarea
                className="cp-textarea"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={form.dietaryRestrictions}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. vegetarian, gluten-free, no nuts"
              />
            </div>
            <div className="cp-field">
              <label className="cp-label" htmlFor="medicalNotes">
                Medical notes
              </label>
              <textarea
                className="cp-textarea"
                id="medicalNotes"
                name="medicalNotes"
                value={form.medicalNotes}
                onChange={handleChange}
                rows={4}
                placeholder="Include any conditions, medications, or special instructions for staff"
              />
            </div>
          </fieldset>

          <fieldset className="cp-fieldset">
            <legend className="cp-legend">Emergency contact</legend>
            <div className="cp-row cp-row--2">
              <div className="cp-field">
                <label className="cp-label" htmlFor="emergencyContactName">
                  Full name <span className="cp-required" aria-hidden="true">*</span>
                </label>
                <input
                  className="cp-input"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  type="text"
                  value={form.emergencyContactName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Michael Johnson"
                />
              </div>
              <div className="cp-field">
                <label className="cp-label" htmlFor="emergencyContactRelationship">
                  Relationship <span className="cp-required" aria-hidden="true">*</span>
                </label>
                <input
                  className="cp-input"
                  id="emergencyContactRelationship"
                  name="emergencyContactRelationship"
                  type="text"
                  value={form.emergencyContactRelationship}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Father, Grandmother"
                />
              </div>
            </div>
            <div className="cp-row cp-row--1">
              <div className="cp-field">
                <label className="cp-label" htmlFor="emergencyContactPhone">
                  Phone number <span className="cp-required" aria-hidden="true">*</span>
                </label>
                <input
                  className="cp-input"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  value={form.emergencyContactPhone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  placeholder="e.g. (555) 867-5309"
                />
              </div>
            </div>
          </fieldset>

          <div className="cp-actions">
            <p className="cp-required-note">
              <span className="cp-required" aria-hidden="true">*</span> Required fields
            </p>
            <button className="cp-submit" type="submit">
              Save child profile
            </button>
          </div>
        </form>

        {savedProfiles.length > 0 && (
          <section className="cp-saved" aria-label="Saved profiles">
            <h2 className="cp-saved-title">Saved profiles ({savedProfiles.length})</h2>
            <ul className="cp-profile-list">
              {savedProfiles.map((profile) => (
                <li className="cp-profile-card" key={profile.id}>
                  <div className="cp-profile-name">
                    {profile.firstName} {profile.lastName}
                  </div>
                  <div className="cp-profile-detail">
                    Born: {profile.dateOfBirth || '—'}
                  </div>
                  {profile.allergies && (
                    <div className="cp-profile-detail">
                      Allergies: {profile.allergies}
                    </div>
                  )}
                  {profile.emergencyContactName && (
                    <div className="cp-profile-detail">
                      Emergency contact: {profile.emergencyContactName} ({profile.emergencyContactRelationship}) &mdash; {profile.emergencyContactPhone}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export default ChildProfile
