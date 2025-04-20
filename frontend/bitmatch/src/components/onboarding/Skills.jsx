'use client'

import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

const Skills = forwardRef(({ onDataChange, formData }, ref) => {
  const [skills, setSkills] = useState(formData?.skills || [])
  const [newSkill, setNewSkill] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    onDataChange({ skills })
  }, [skills])

  const validate = () => {
    if (skills.length === 0) {
      setError('Please add at least one skill.')
      return false
    }
    setError('')
    return true
  }

  useImperativeHandle(ref, () => ({ validate }))

  const handleAdd = () => {
    const trimmed = newSkill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed].sort())
      setNewSkill('')
      setError('')
    }
  }

  const handleRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">
        What skill sets do you have? <span className="text-red-500">*</span>
      </label>

      <div className="flex space-x-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Type a skill"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAdd()
            }
          }}
        />
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          Add
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex justify-between items-center bg-blue-600 text-white px-3 py-2 rounded-md"
          >
            <span>{skill}</span>
            <button onClick={() => handleRemove(skill)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Skills
