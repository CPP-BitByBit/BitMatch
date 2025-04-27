"use client";
import { useState } from "react";
<<<<<<< HEAD
import { X, Plus, Edit2, Trash2, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
=======
import { X, Plus, Edit2, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
} from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
<<<<<<< HEAD

// Default dummy user data
const DEFAULT_USER_DATA = {
    name: "John Doe",
    title: "Software Engineer",
    bio: "Passionate about building great user experiences and scalable systems.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [
        {
            company: "Tech Corp",
            position: "Senior Developer",
            duration: "2020 - Present"
        },
        {
            company: "Startup Inc",
            position: "Frontend Developer",
            duration: "2018 - 2020"
        }
    ],
    education: [
        {
            institution: "State University",
            degree: "B.S. Computer Science",
            year: "2018"
        }
    ]
};

export function EditProfileDialog({ open, onOpenChange, onSave }) {
    const [userData, setUserData] = useState(DEFAULT_USER_DATA);
    const [newSkill, setNewSkill] = useState("");
    const [editingSkillIndex, setEditingSkillIndex] = useState(-1);
    const [newExperience, setNewExperience] = useState({ company: "", position: "", duration: "" });
    const [editingExperienceIndex, setEditingExperienceIndex] = useState(-1);
    const [newEducation, setNewEducation] = useState({ institution: "", degree: "", year: "" });
    const [editingEducationIndex, setEditingEducationIndex] = useState(-1);

    const handleChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would call onSave with the updated data
        console.log("Profile data to save:", userData);
        onOpenChange(false);
    };

    // Skills management
    const addSkill = () => {
        if (!newSkill.trim()) return;

        if (editingSkillIndex >= 0) {
            const updatedSkills = [...userData.skills];
            updatedSkills[editingSkillIndex] = newSkill;
            setUserData(prev => ({ ...prev, skills: updatedSkills }));
            setEditingSkillIndex(-1);
        } else {
            setUserData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill],
            }));
        }
        setNewSkill("");
    };

    const removeSkill = (index) => {
        const updatedSkills = userData.skills.filter((_, i) => i !== index);
        setUserData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const editSkill = (index) => {
        setNewSkill(userData.skills[index]);
        setEditingSkillIndex(index);
    };

    // Experience management
    const addExperience = () => {
        if (!newExperience.company.trim() || !newExperience.position.trim()) return;

        if (editingExperienceIndex >= 0) {
            const updatedExperiences = [...userData.experience];
            updatedExperiences[editingExperienceIndex] = { ...newExperience };
            setUserData(prev => ({ ...prev, experience: updatedExperiences }));
            setEditingExperienceIndex(-1);
        } else {
            setUserData(prev => ({
                ...prev,
                experience: [...prev.experience, { ...newExperience }],
            }));
        }
        setNewExperience({ company: "", position: "", duration: "" });
    };

    const removeExperience = (index) => {
        const updatedExperiences = userData.experience.filter((_, i) => i !== index);
        setUserData(prev => ({ ...prev, experience: updatedExperiences }));
    };

    const editExperience = (index) => {
        setNewExperience({ ...userData.experience[index] });
        setEditingExperienceIndex(index);
    };

    // Education management
    const addEducation = () => {
        if (!newEducation.institution.trim() || !newEducation.degree.trim()) return;

        if (editingEducationIndex >= 0) {
            const updatedEducation = [...userData.education];
            updatedEducation[editingEducationIndex] = { ...newEducation };
            setUserData(prev => ({ ...prev, education: updatedEducation }));
            setEditingEducationIndex(-1);
        } else {
            setUserData(prev => ({
                ...prev,
                education: [...prev.education, { ...newEducation }],
            }));
        }
        setNewEducation({ institution: "", degree: "", year: "" });
    };

    const removeEducation = (index) => {
        const updatedEducation = userData.education.filter((_, i) => i !== index);
        setUserData(prev => ({ ...prev, education: updatedEducation }));
    };

    const editEducation = (index) => {
        setNewEducation({ ...userData.education[index] });
        setEditingEducationIndex(index);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold">
                            Edit Profile
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="h-8 w-8 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Update your profile information.
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 py-2">
                    {/* Basic Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                value={userData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full"
                                placeholder="Your full name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Professional Title
                            </Label>
                            <Input
                                id="title"
                                value={userData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                className="w-full"
                                placeholder="Your professional title"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={userData.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            className="min-h-[100px] w-full"
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    {/* Contact Info Section */}
                    <div className="space-y-3 pt-2">
                        <Label className="text-sm font-medium">Contact Information</Label>
                        <Card className="p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={userData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="flex-1"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={userData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    className="flex-1"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={userData.website}
                                    onChange={(e) => handleChange("website", e.target.value)}
                                    className="flex-1"
                                    placeholder="Website URL"
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Skills</Label>
                        </div>
                        <Card className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add a skill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        onClick={addSkill}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        {editingSkillIndex >= 0 ? "Update" : "Add"}
                                    </Button>
                                </div>

                                {userData.skills.length > 0 && (
                                    <ScrollArea className="h-[120px] pr-4">
                                        <div className="space-y-2">
                                            {userData.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                                                >
                                                    <div className="flex-1">
                                                        <p className="font-medium">{skill}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => editSkill(index)}
                                                            className="h-7 w-7"
                                                            type="button"
                                                        >
                                                            <Edit2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeSkill(index)}
                                                            className="h-7 w-7 text-destructive"
                                                            type="button"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Experience Section */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Work Experience</Label>
                        </div>
                        <Card className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <Input
                                        placeholder="Company"
                                        value={newExperience.company}
                                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Position"
                                        value={newExperience.position}
                                        onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Duration (e.g. 2020 - Present)"
                                        value={newExperience.duration}
                                        onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={addExperience}
                                    className="w-full"
                                    variant="outline"
                                    size="sm"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    {editingExperienceIndex >= 0 ? "Update Experience" : "Add Experience"}
                                </Button>

                                {userData.experience.length > 0 && (
                                    <ScrollArea className="h-[150px] pr-4">
                                        <div className="space-y-2">
                                            {userData.experience.map((exp, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col p-3 rounded-md bg-muted/50"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-medium">{exp.position}</p>
                                                            <p className="text-sm">{exp.company}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => editExperience(index)}
                                                                className="h-7 w-7"
                                                                type="button"
                                                            >
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeExperience(index)}
                                                                className="h-7 w-7 text-destructive"
                                                                type="button"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">{exp.duration}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Education Section */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Education</Label>
                        </div>
                        <Card className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <Input
                                        placeholder="Institution"
                                        value={newEducation.institution}
                                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Degree"
                                        value={newEducation.degree}
                                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Year"
                                        value={newEducation.year}
                                        onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={addEducation}
                                    className="w-full"
                                    variant="outline"
                                    size="sm"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    {editingEducationIndex >= 0 ? "Update Education" : "Add Education"}
                                </Button>

                                {userData.education.length > 0 && (
                                    <ScrollArea className="h-[120px] pr-4">
                                        <div className="space-y-2">
                                            {userData.education.map((edu, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col p-3 rounded-md bg-muted/50"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-medium">{edu.degree}</p>
                                                            <p className="text-sm">{edu.institution}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => editEducation(index)}
                                                                className="h-7 w-7"
                                                                type="button"
                                                            >
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeEducation(index)}
                                                                className="h-7 w-7 text-destructive"
                                                                type="button"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">{edu.year}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}
                            </div>
                        </Card>
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
=======
import PropTypes from "prop-types";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export function EditProfileDialog({ open, onOpenChange, profile }) {
  const [userData, setUserData] = useState(profile);
  const [newSkill, setNewSkill] = useState("");
  const [editingSkillIndex, setEditingSkillIndex] = useState(-1);
  const [newInterest, setNewInterest] = useState("");
  const [editingInterestIndex, setEditingInterestIndex] = useState(-1);
  const [newPosition, setNewPosition] = useState("");
  const [editingPositionIndex, setEditingPositionIndex] = useState(-1);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateUserProjectsResponse = await fetch(
        `${SERVER_HOST}/userauth/${userData.auth_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!updateUserProjectsResponse.ok) {
        const errorText = await updateUserProjectsResponse.text();
        console.error("Failed to update user projects:", errorText);
      } else {
        alert("Updated successfully!");
        onOpenChange(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user projects:", error);
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (editingSkillIndex >= 0) {
      const updatedSkills = [...userData.skills];
      updatedSkills[editingSkillIndex] = newSkill;
      setUserData((prev) => ({ ...prev, skills: updatedSkills }));
      setEditingSkillIndex(-1);
    } else {
      setUserData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
    }
    setNewSkill("");
  };

  const removeSkill = (index) => {
    const updatedSkills = userData.skills.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const editSkill = (index) => {
    setNewSkill(userData.skills[index]);
    setEditingSkillIndex(index);
  };

  const addInterest = () => {
    if (!newInterest.trim()) return;
    if (editingInterestIndex >= 0) {
      const updated = [...userData.interests];
      updated[editingInterestIndex] = newInterest;
      setUserData((prev) => ({ ...prev, interests: updated }));
      setEditingInterestIndex(-1);
    } else {
      setUserData((prev) => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest],
      }));
    }
    setNewInterest("");
  };

  const removeInterest = (index) => {
    const updated = userData.interests.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, interests: updated }));
  };

  const editInterest = (index) => {
    setNewInterest(userData.interests[index]);
    setEditingInterestIndex(index);
  };

  const addPosition = () => {
    if (!newPosition.trim()) return;
    if (editingPositionIndex >= 0) {
      const updated = [...userData.roles];
      updated[editingPositionIndex] = newPosition;
      setUserData((prev) => ({ ...prev, roles: updated }));
      setEditingPositionIndex(-1);
    } else {
      setUserData((prev) => ({
        ...prev,
        roles: [...(prev.roles || []), newPosition],
      }));
    }
    setNewPosition("");
  };

  const removePosition = (index) => {
    const updated = userData.roles.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, roles: updated }));
  };

  const editPosition = (index) => {
    setNewPosition(userData.roles[index]);
    setEditingPositionIndex(index);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Edit Profile
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Update your profile information.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={userData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                placeholder="Your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={userData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                placeholder="Your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about_me">About Me</Label>
            <Textarea
              id="about_me"
              value={userData.about_me}
              onChange={(e) => handleChange("about_me", e.target.value)}
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          </div>

          {/* Education Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                value={userData.college}
                onChange={(e) => handleChange("college", e.target.value)}
                placeholder="Your college name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                value={userData.major}
                onChange={(e) => handleChange("major", e.target.value)}
                placeholder="Your major"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="gradDate">
              Graduation Date{" "}
              <span className="text-muted-foreground">
                (Format: Month xxxx)
              </span>
            </Label>
            <Input
              id="grad_date"
              value={userData.grad_date}
              onChange={(e) => handleChange("grad_date", e.target.value)}
              placeholder="May 2027"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-3 pt-2">
            <Label>Contact Information</Label>
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={userData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Ex: City, State"
                />
              </div>
            </Card>
          </div>

          {/* Desired Positions */}
          <div className="space-y-3 pt-2">
            <Label>Desired Positions</Label>
            <Card className="p-4 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a desired position"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                />
                <Button type="button" onClick={addPosition} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  {editingPositionIndex >= 0 ? "Update" : "Add"}
                </Button>
              </div>

              {userData.roles?.length > 0 && (
                <ScrollArea className="h-[120px] pr-2">
                  <div className="space-y-2">
                    {userData.roles.map((position, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded"
                      >
                        <p className="font-medium">{position}</p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editPosition(index)}
                            className="h-7 w-7"
                            type="button"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePosition(index)}
                            className="h-7 w-7 text-destructive"
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </div>

          {/* Interests */}
          <div className="space-y-3 pt-2">
            <Label>Interests</Label>
            <Card className="p-4 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add an interest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
                <Button type="button" onClick={addInterest} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  {editingInterestIndex >= 0 ? "Update" : "Add"}
                </Button>
              </div>

              {userData.interests?.length > 0 && (
                <ScrollArea className="h-[120px] pr-2">
                  <div className="space-y-2">
                    {userData.interests.map((interest, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded"
                      >
                        <p className="font-medium">{interest}</p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editInterest(index)}
                            className="h-7 w-7"
                            type="button"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeInterest(index)}
                            className="h-7 w-7 text-destructive"
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </div>

          {/* Skills */}
          <div className="space-y-3 pt-2">
            <Label>Skills</Label>
            <Card className="p-4 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  {editingSkillIndex >= 0 ? "Update" : "Add"}
                </Button>
              </div>

              {userData.skills.length > 0 && (
                <ScrollArea className="h-[120px] pr-2">
                  <div className="space-y-2">
                    {userData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded"
                      >
                        <p className="font-medium">{skill}</p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editSkill(index)}
                            className="h-7 w-7"
                            type="button"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSkill(index)}
                            className="h-7 w-7 text-destructive"
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
EditProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
