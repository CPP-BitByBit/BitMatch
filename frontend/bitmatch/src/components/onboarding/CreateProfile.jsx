'use client'

import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

// ✅ Component with forwardRef
const CreateProfile = forwardRef(({ onDataChange, formData }, ref) => {
  const [firstName, setFirstName] = useState(formData?.first_name || '')
  const [lastName, setLastName] = useState(formData?.last_name || '')
  const [colleges, setColleges] = useState(formData?.colleges || [])
  const [newCollege, setNewCollege] = useState('')
  const [errors, setErrors] = useState({})

  // Send data to parent on change
  useEffect(() => {
    onDataChange({ first_name: firstName, last_name: lastName, colleges })
  }, [firstName, lastName, colleges])

  // Validation logic exposed via ref
  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = {}
      if (!firstName.trim()) newErrors.firstName = 'First name is required.'
      if (!lastName.trim()) newErrors.lastName = 'Last name is required.'
      if (colleges.length === 0) newErrors.colleges = 'At least one college is required.'
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
  }))

  const handleAddCollege = () => {
    const trimmed = newCollege.trim()
    if (trimmed && !colleges.includes(trimmed)) {
      const updated = [...colleges, trimmed].sort()
      setColleges(updated)
      setNewCollege('')
    }
  }

  const handleRemoveCollege = (college) => {
    const updated = colleges.filter((c) => c !== college).sort()
    setColleges(updated)
  }

  return (
    <div className="space-y-6">
      {/* First Name */}
      <div className="space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>

      {/* Colleges */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Colleges/Universities <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <Input
            value={newCollege}
            onChange={(e) => setNewCollege(e.target.value)}
            placeholder="Add college or university"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddCollege()
              }
            }}
          />
          <Button onClick={handleAddCollege} className="bg-blue-600 hover:bg-blue-700">
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 py-2">
          {colleges.map((college) => (
            <Badge key={college} className="px-4 py-2 bg-blue-600 text-white">
              {college}
              <button
                onClick={() => handleRemoveCollege(college)}
                className="ml-1 hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
        </div>

        {errors.colleges && <p className="text-red-500 text-sm">{errors.colleges}</p>}
      </div>
    </div>
  )
})

// ✅ Export wrapped with forwardRef
export default CreateProfile
