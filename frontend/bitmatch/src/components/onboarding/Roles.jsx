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

const Roles = forwardRef(({ onDataChange, formData }, ref) => {
  const [roles, setRoles] = useState(formData?.roles || [])
  const [newRole, setNewRole] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    onDataChange({ roles })
  }, [roles])

  const validate = () => {
    if (roles.length === 0) {
      setError('Please add at least one role.')
      return false
    }
    setError('')
    return true
  }

  useImperativeHandle(ref, () => ({ validate }))

  const handleAdd = () => {
    const trimmed = newRole.trim()
    if (trimmed && !roles.includes(trimmed)) {
      setRoles([...roles, trimmed].sort())
      setNewRole('')
      setError('')
    }
  }

  const handleRemove = (role) => {
    setRoles(roles.filter((r) => r !== role))
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">
        What positions are you most interested in? <span className="text-red-500">*</span>
      </label>

      <div className="flex space-x-2">
        <Input
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Type a position"
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

      <div className="space-y-2">
        {roles.map((role) => (
          <div
            key={role}
            className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <span>{role}</span>
            <button onClick={() => handleRemove(role)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Roles
