"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export function EditProjectDialog({ open, onOpenChange, projectData, onSave }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(projectData);
  const [newPosition, setNewPosition] = useState({ title: "" });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [sliderImages, setSliderImages] = useState(projectData.images || []);
  const [interests, setInterests] = useState(projectData.interest_tags || []);
  const [skills, setSkills] = useState(projectData.skill_tags || []);
  const [newInterest, setNewInterest] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [interestError, setInterestError] = useState("");
  const [skillError, setSkillError] = useState("");

  const handleImageUrlChange = (index, e) => {
    const newSliderImages = [...sliderImages];
    newSliderImages[index] = e.target.value;

    const filteredImages = newSliderImages.filter((url) => url.trim() !== "");

    setSliderImages(newSliderImages);
    handleChange("images", filteredImages);
  };

  // For Interests
  const handleInterestChange = (e) => {
    setNewInterest(e.target.value);
    setInterestError(""); // Reset error message
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests((prev) => {
        const updatedInterests = [...prev, newInterest.trim()];
        handleChange("interest_tags", updatedInterests); // Call handleChange with updated interests
        return updatedInterests;
      });
      setNewInterest(""); // Clear input after adding
    } else {
      setInterestError("Interest can't be empty.");
    }
  };

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
    setSkillError("");
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => {
        const updatedSkills = [...prev, newSkill.trim()];
        handleChange("skill_tags", updatedSkills);
        return updatedSkills;
      });
      setNewSkill("");
    } else {
      setSkillError("Skill can't be empty.");
    }
  };

  const handleRemoveInterest = (index) => {
    setInterests((prev) => {
      const updatedInterests = prev.filter((_, i) => i !== index);
      handleChange("interest_tags", updatedInterests);
      return updatedInterests;
    });
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => {
      const updatedSkills = prev.filter((_, i) => i !== index);
      handleChange("skill_tags", updatedSkills);
      return updatedSkills;
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${SERVER_HOST}/projects/${formData.id}/`);
      alert("Project deleted successfully!");
      onOpenChange(false);
      navigate(`/project-list/`);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete the project. Please try again.");
    }
  };

  const addPosition = () => {
    if (!newPosition.title.trim()) return;

    if (editingIndex >= 0) {
      // Update existing position
      const updatedPositions = [...formData.positions];
      updatedPositions[editingIndex] = { title: newPosition.title };
      setFormData((prev) => ({ ...prev, positions: updatedPositions }));
      setEditingIndex(-1);
    } else {
      // Add new position
      setFormData((prev) => ({
        ...prev,
        positions: [...prev.positions, { title: newPosition.title }],
      }));
    }

    // Reset the input fields
    setNewPosition({ title: "" });
  };

  const removePosition = (index) => {
    const updatedPositions = formData.positions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, positions: updatedPositions }));
  };

  const editPosition = (index) => {
    setNewPosition({ title: formData.positions[index].title });
    setEditingIndex(index);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Dialog
      className="flex-1 custom-scrollbar"
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Edit Project
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
            Make changes to your project details below.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full"
              placeholder="Enter project title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Group" className="text-sm font-medium">
                Group
              </Label>
              <Input
                id="group"
                value={formData.group}
                onChange={(e) => handleChange("group", e.target.value)}
                className="w-full"
                placeholder="Enter project group"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-sm font-medium">
                Institution
              </Label>
              <Input
                id="institution"
                value={formData.institution || ""}
                onChange={(e) => handleChange("institution", e.target.value)}
                className="w-full"
                placeholder="Enter project institution"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full"
              placeholder="Enter project location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Project Email
            </Label>
            <Input
              id="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full"
              placeholder="Enter project email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="other_contact" className="text-sm font-medium">
              Project Social
            </Label>
            <Input
              id="other_contact"
              value={formData.other_contact || ""}
              onChange={(e) => handleChange("other_contact", e.target.value)}
              className="w-full"
              placeholder="Enter project social"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[120px] w-full"
              placeholder="Enter project description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description" className="text-sm font-medium">
              Project Background/More Details
            </Label>
            <div className="min-h-[120px] w-full border rounded-md p-2">
              <MDEditor
                id="full_description"
                value={formData.full_description}
                onChange={(value) =>
                  handleChange("full_description", value || "")
                }
                preview="edit"
                height={200}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Cover Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    new_image: file,
                  }));
                }
              }}
              className="w-full"
            />
            {formData.new_image && (
              <div className="mt-2">
                {formData.new_image instanceof File && (
                  <img
                    src={URL.createObjectURL(formData.new_image)}
                    alt="Project"
                    className="max-h-40 rounded-md"
                  />
                )}
              </div>
            )}
          </div>

          {/* Slider Image Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Slider Images</h2>
            <p className="text-sm text-gray-600 mb-2">
              Enter up to 4 image URLs for populating the image carousel on your
              project page. (Ex: screenshots of app, mockups, etc)
            </p>

            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`image-url-${index + 1}`}
                  placeholder={`Enter image URL ${index + 1}`}
                  value={sliderImages[index] || ""}
                  onChange={(e) => handleImageUrlChange(index, e)}
                  className="w-full h-10 border border-gray-300 p-2 rounded-md"
                />
              </div>
            ))}

            <p className="text-sm text-gray-600 mt-2">
              Example: https://example.com/image1.jpg
            </p>
          </div>

          {/* Open Positions Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Open Positions</Label>
            </div>

            <Card className="p-4">
              <div className="flex flex-col gap-4">
                {/* Add/Edit Position Form */}
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input
                        placeholder="Position title"
                        value={newPosition.title}
                        onChange={(e) =>
                          setNewPosition({
                            ...newPosition,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addPosition}
                    className="w-full"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {editingIndex >= 0 ? "Update Position" : "Add Position"}
                  </Button>
                </div>

                {formData.positions.length > 0 && (
                  <ScrollArea className="h-[150px] pr-4">
                    <div className="space-y-2">
                      {formData.positions.map((position, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{position.title}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => editPosition(index)}
                              className="h-7 w-7"
                              type="button"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removePosition(index)}
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

          <div className="space-y-2">
            <Label htmlFor="wanted_description" className="text-sm font-medium">
              Wanted Description
            </Label>
            <div className="min-h-[120px] w-full border rounded-md p-2">
              <MDEditor
                id="full_description"
                value={formData.wanted_description}
                onChange={(value) =>
                  handleChange("wanted_description", value || "")
                }
                preview="edit"
                height={200}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium mb-2">
              Categories/Interests
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={newInterest}
                onChange={handleInterestChange}
                className="flex-grow border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Backend, Frontend, DevOps, AI"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
              >
                Add Interest
              </button>
            </div>
            {interestError && (
              <p className="text-red-500 text-sm mt-1">{interestError}</p>
            )}
            <div className="mt-3 border rounded-md overflow-hidden">
              {interests.length === 0 ? (
                <p className="text-sm text-gray-500 px-4 py-3">
                  No interests added yet.
                </p>
              ) : (
                interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 border-b last:border-b-0 bg-gray-50"
                  >
                    <span className="text-sm">{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(index)}
                      className="text-red-500 hover:text-red-700 transition-colors font-bold"
                      aria-label={`Remove interest: ${interest}`}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium mb-2">Desired Skills</label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={handleSkillChange}
                className="flex-grow border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., JavaScript, Figma, Django"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
              >
                Add Skill
              </button>
            </div>
            {skillError && (
              <p className="text-red-500 text-sm mt-1">{skillError}</p>
            )}
            <div className="mt-3 border rounded-md overflow-hidden">
              {skills.length === 0 ? (
                <p className="text-sm text-gray-500 px-4 py-3">
                  No skills added yet.
                </p>
              ) : (
                skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 border-b last:border-b-0 bg-gray-50"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-red-500 hover:text-red-700 transition-colors font-bold"
                      aria-label={`Remove skill: ${skill}`}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
