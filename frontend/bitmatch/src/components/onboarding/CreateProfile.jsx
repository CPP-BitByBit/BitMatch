<<<<<<< HEAD
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
=======
"use client";

import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const CreateProfile = forwardRef(({ onDataChange, formData }, ref) => {
  const [firstName, setFirstName] = useState(formData?.first_name || "");
  const [lastName, setLastName] = useState(formData?.last_name || "");
  const [college, setCollege] = useState(formData?.college || "");
  const [major, setMajor] = useState(formData?.major || "");
  const [gradDate, setGradDate] = useState(formData?.grad_date || "");
  const [aboutMe, setAboutMe] = useState(formData?.about_me || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onDataChange({
      first_name: firstName,
      last_name: lastName,
      college,
      major,
      grad_date: gradDate,
      about_me: aboutMe,
    });
  }, [firstName, lastName, college, major, gradDate, aboutMe]);

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = {};
      const monthYearRegex =
        /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;

      if (!firstName.trim()) newErrors.firstName = "First name is required.";
      if (!lastName.trim()) newErrors.lastName = "Last name is required.";
      if (!college.trim()) newErrors.college = "College is required.";
      if (!major.trim()) newErrors.major = "Major is required.";
      if (!gradDate.trim()) {
        newErrors.gradDate = "Graduation date is required.";
      } else if (!monthYearRegex.test(gradDate.trim())) {
        newErrors.gradDate =
          'Graduation date must be in the format "Month YYYY" (e.g. May 2026).';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84

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
<<<<<<< HEAD
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
=======
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
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
<<<<<<< HEAD
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
=======
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
      </div>

      {/* College */}
      <div className="space-y-2">
        <label htmlFor="college" className="text-sm font-medium">
          College/University <span className="text-red-500">*</span>
        </label>
        <Input
          id="college"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          placeholder="Enter your college or university"
        />
        {errors.college && (
          <p className="text-red-500 text-sm">{errors.college}</p>
        )}
      </div>

      {/* Major */}
      <div className="space-y-2">
        <label htmlFor="major" className="text-sm font-medium">
          Major <span className="text-red-500">*</span>
        </label>
        <Input
          id="major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="Enter your major"
        />
        {errors.major && <p className="text-red-500 text-sm">{errors.major}</p>}
      </div>

      {/* Graduation Date */}
      <div className="space-y-2">
        <label htmlFor="gradDate" className="text-sm font-medium">
          Graduation Date <span className="text-red-500">*</span>
        </label>
        <Input
          id="gradDate"
          value={gradDate}
          onChange={(e) => setGradDate(e.target.value)}
          placeholder="e.g. May 2026"
        />
        <p className="text-xs text-gray-500">
          Format: Month YYYY (e.g. May 2026)
        </p>
        {errors.gradDate && (
          <p className="text-red-500 text-sm">{errors.gradDate}</p>
        )}
      </div>

      {/* About Me (Optional, max 500 chars) */}
      <div className="space-y-2">
        <label htmlFor="aboutMe" className="text-sm font-medium">
          About Me (Optional){" "}
          <span className="text-gray-500">(Max 500 characters)</span>
        </label>
        <textarea
          id="aboutMe"
          value={aboutMe}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 500);
            setAboutMe(newValue);
          }}
          placeholder="Optional: Tell us a little about yourself."
          rows={4}
          maxLength={500}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <p className="text-xs text-gray-500">
          {500 - aboutMe.length} characters remaining
        </p>
      </div>
    </div>
  );
});

export default CreateProfile;
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
