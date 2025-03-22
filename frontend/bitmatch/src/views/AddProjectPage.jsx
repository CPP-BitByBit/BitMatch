"use client";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";


export default function CreateProjectForm() {
    const [coverImage, setCoverImage] = useState(null);
    const [sliderImages, setSliderImages] = useState([
        "slideshow_img1.jpg",
        "slideshow_img2.jpg",
        "slideshow_img3.jpg",
        "slideshow_img4.jpg",
        "slideshow_img5.jpg",
    ]);
    const [shortDescription, setShortDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([
        "Technology",
        "Health & Fitness",
    ]);

    const handleCoverImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setCoverImage(e.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleShortDescriptionChange = (e) => {
        if (e.target.value.length <= 133) {
            setShortDescription(e.target.value);
        }
    };

    const handleFullDescriptionChange = (e) => {
        if (e.target.value.length <= 540) {
            setFullDescription(e.target.value);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="border-b p-4">
                <div className="flex justify-between items-center">
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => window.history.back()}
                    >
                        <ChevronRight className="h-4 w-4 mr-2 transform rotate-180" />
                        Back to Projects
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold mb-8 border-b pb-4">Create a new Project</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Cover Image Section */}
                    <div>
                        <h2 className="font-lg mb-1">Cover Image (Required)</h2>
                        <p className="text-sm text-gray-600 mb-2">Minimum: 315x250, Recommended: 630x500</p>
                        <div className="bg-gray-200 h-64 flex items-center justify-center relative">
                            {coverImage ? (
                                <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <label htmlFor="cover-upload" className="bg-black text-white px-4 py-2 cursor-pointer">
                                    Upload cover Image
                                </label>
                            )}
                            <input
                                id="cover-upload"
                                type="file"
                                className="hidden"
                                onChange={handleCoverImageUpload}
                                accept="image/*"
                            />
                        </div>
                        <div className="mt-4 bg-white border rounded-md p-3">
                            <h3 className="text-lg font-medium">Main information</h3>
                        </div>
                    </div>

                    {/* Additional Images Section */}
                    <div>
                        <h2 className="font-medium mb-1">Additional profile slider images (Optional)</h2>
                        <p className="text-sm text-gray-600 mb-2">Minimum: 315x250, Recommended: 630x500</p>
                        <p className="text-sm text-gray-600 mb-2">Maximum: amount of images: 5</p>

                        <div className="bg-gray-100 border h-40 overflow-y-auto mb-4">
                            {sliderImages.map((img, index) => (
                                <div key={index} className="flex items-center justify-between px-3 py-2 border-b">
                                    <span className="text-sm">{img}</span>
                                    {index === 0 && <div className="h-4 w-4 bg-gray-300"></div>}
                                </div>
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            <button className="bg-black text-white px-6 py-2">Upload</button>
                            <button className="bg-black text-white px-6 py-2">Remove</button>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block font-medium mb-2">
                            Title of project
                        </label>
                        <input type="text" id="title" className="w-full border rounded-md p-2" />
                    </div>

                    {/* Group Assignment */}
                    <div>
                        <label htmlFor="group" className="block font-medium mb-2">
                            Group Assignment (Optional)
                        </label>
                        <input type="text" id="group" className="w-full border rounded-md p-2" />
                        <p className="text-sm text-gray-600 mt-1">
                            Will this project be associated with a Group? If so, type the group name to assign this project to it.
                        </p>
                    </div>

                    {/* University/College */}
                    <div>
                        <label htmlFor="university" className="block font-medium mb-2">
                            Name of University / College
                        </label>
                        <input type="text" id="university" className="w-full border rounded-md p-2" />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block font-medium mb-2">
                            Address of University / College
                        </label>
                        <input type="text" id="address" className="w-full border rounded-md p-2" />
                    </div>

                    {/* Categories */}
                    <div>
                        <label htmlFor="categories" className="block font-medium mb-2">
                            Categories
                        </label>
                        <input type="text" id="categories" placeholder="Search box" className="w-full border rounded-md p-2 mb-2" />
                        <div className="border rounded-md p-3">
                            <div className="flex flex-wrap gap-2">
                                {selectedCategories.map((category, index) => (
                                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            Examples: Games, Technology, Beauty, Film, Health & Fitness, Education, etc
                        </p>
                    </div>

                    {/* Short Description */}
                    <div>
                        <label htmlFor="short-desc" className="block font-medium mb-2">
                            Short Description or Tagline
                        </label>
                        <textarea
                            id="short-desc"
                            className="w-full border rounded-md p-2 resize-none"
                            rows={3}
                            value={shortDescription}
                            onChange={handleShortDescriptionChange}
                        ></textarea>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Max Characters: 133</span>
                            <span>Current Character Count: {shortDescription.length}</span>
                        </div>
                    </div>

                    {/* Full Description */}
                    <div>
                        <label htmlFor="full-desc" className="block font-medium mb-2">
                            Full Description
                            <p className="font-normal text-sm text-gray-600">
                                Write a full description of you project here. This will appear in your project profile page.
                            </p>
                        </label>
                        <textarea
                            id="full-desc"
                            className="w-full border rounded-md p-2 resize-none bg-gray-100"
                            rows={6}
                            placeholder="text for the description"
                            value={fullDescription}
                            onChange={handleFullDescriptionChange}
                        ></textarea>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Max Characters: 540</span>
                            <span>Current Character Count: {fullDescription.length}</span>
                        </div>
                    </div>

                    {/* Roles Section */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <h2 className="text-xl font-medium">What roles or positions do you need to fill...</h2>
                        <button className="bg-black text-white px-8 py-2">Next</button>
                    </div>
                </div>
            </main>
        </div>
    );
}