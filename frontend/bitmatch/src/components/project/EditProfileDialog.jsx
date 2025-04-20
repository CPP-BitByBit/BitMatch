"use client";
import { useState } from "react";
import { X, Plus, Edit2, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
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
