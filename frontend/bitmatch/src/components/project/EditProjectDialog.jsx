"use client";
import axios from "axios";
import { useState } from "react";
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

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export function EditProjectDialog({ open, onOpenChange, projectData, onSave }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(projectData);
  const [newPosition, setNewPosition] = useState({ title: "" });
  const [editingIndex, setEditingIndex] = useState(-1);

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
            <Textarea
              id="full_description"
              value={formData.full_description}
              onChange={(e) => handleChange("full_description", e.target.value)}
              className="min-h-[120px] w-full"
              placeholder="Enter project background/more details"
            />
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
