'use client'

import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const Location = forwardRef(({ onDataChange, formData }, ref) => {
  const [location, setLocation] = useState(formData?.location || '')
  const [preferences, setPreferences] = useState(
    formData?.location_preferences?.filter(p => p !== '') || ["I'm location flexible (REMOTE)"]
  )
  const [other, setOther] = useState('')
  const [errors, setErrors] = useState({})

  const options = [
    "At my location",
    "At my University or College location",
    "I'm location flexible (REMOTE)",
  ]

  useEffect(() => {
    const allPreferences = [...preferences, ...(other ? [other] : [])]
    onDataChange({ location, location_preferences: allPreferences })
  }, [location, preferences, other])

  const validate = () => {
    const newErrors = {}
    if (!location.trim()) newErrors.location = 'Location is required.'
    if (preferences.length === 0 && !other.trim()) {
      newErrors.preferences = 'Please select or enter at least one preference.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useImperativeHandle(ref, () => ({ validate }))

  const togglePreference = (value) => {
    setPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((p) => p !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">
          What's your location? <span className="text-red-500">*</span>
        </label>
        <input
          className="mt-1 block w-full border px-3 py-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Do you have a location preference for projects? <span className="text-red-500">*</span>
        </label>

        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={preferences.includes(option)}
              onCheckedChange={() => togglePreference(option)}
            />
            <label htmlFor={option} className="text-sm">{option}</label>
          </div>
        ))}

        <div className="mt-4">
          <label className="text-sm">Other</label>
          <input
            className="mt-1 block w-full border px-3 py-2 rounded"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Add custom preference"
          />
        </div>

        {errors.preferences && <p className="text-red-500 text-sm">{errors.preferences}</p>}
      </div>
    </div>
  )
})

export default Location
