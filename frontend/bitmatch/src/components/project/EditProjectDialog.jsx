"use client"

import { useState } from "react"
import { X, Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"


export function EditProjectDialog({ open, onOpenChange, projectData, onSave }) {
    const [formData, setFormData] = useState(projectData)
    const [newPosition, setNewPosition] = useState({ title: "", count: 1 })
    const [editingIndex, setEditingIndex] = useState(-1)

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
        onOpenChange(false)
    }

    const addPosition = () => {
        if (!newPosition.title.trim()) return

        if (editingIndex >= 0) {
            // Update existing position
            const updatedPositions = [...formData.openPositions]
            updatedPositions[editingIndex] = { ...newPosition }
            setFormData((prev) => ({ ...prev, openPositions: updatedPositions }))
            setEditingIndex(-1)
        } else {
            // Add new position
            setFormData((prev) => ({
                ...prev,
                openPositions: [...prev.openPositions, { ...newPosition }],
            }))
        }

        // Reset the input fields
        setNewPosition({ title: "", count: 1 })
    }

    const removePosition = (index) => {
        const updatedPositions = formData.openPositions.filter((_, i) => i !== index)
        setFormData((prev) => ({ ...prev, openPositions: updatedPositions }))
    }

    const editPosition = (index) => {
        setNewPosition({ ...formData.openPositions[index] })
        setEditingIndex(index)
    }

    return (
        <Dialog className="flex-1 custom-scrollbar" open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold">Edit Project</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Make changes to your project details below.</p>
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
                                                onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="Count"
                                                value={newPosition.count}
                                                onChange={(e) =>
                                                    setNewPosition({ ...newPosition, count: Number.parseInt(e.target.value) || 1 })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Button type="button" onClick={addPosition} className="w-full" variant="outline" size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        {editingIndex >= 0 ? "Update Position" : "Add Position"}
                                    </Button>
                                </div>

                                {/* Position List */}
                                {formData.positions.length > 0 && (
                                    <ScrollArea className="h-[150px] pr-4">
                                        <div className="space-y-2">
                                            {formData.positions.map((position, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                                    <div className="flex-1">
                                                        <p className="font-medium">{position.title}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {position.count} position{position.count !== 1 ? "s" : ""} available
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" onClick={() => editPosition(index)} className="h-7 w-7">
                                                            <Edit2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removePosition(index)}
                                                            className="h-7 w-7 text-destructive"
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

                    <Card className="p-3 bg-muted/50">
                        <p className="text-xs text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString()} by Current User
                        </p>
                    </Card>

                    <DialogFooter className="pt-2">
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
