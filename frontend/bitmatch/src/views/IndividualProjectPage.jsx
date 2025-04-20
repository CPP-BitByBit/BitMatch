import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Edit,
  Icon,
  ThumbsUp,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard } from "@/components/project/MemberCard";
import { Badge } from "@/components/ui/badge";
import { PositionCard } from "@/components/project/PositionCard";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DiscussionPost, ReplyForm } from "@/components/project/DiscussionCard";
import { EditProjectDialog } from "@/components/project/EditProjectDialog";
import { useUser } from "@clerk/clerk-react";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
import axios from "axios";

const fetchProjectInfo = async (id) => {
  try {
    const response = await fetch(`${SERVER_HOST}/projects/${id}/`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const projectData = await response.json();

    return projectData;
  } catch (error) {
    console.error("Error fetching project info:", error);
    return null;
  }
};

const editProjectInfo = async (id) => {};

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams(); // Access the dynamic `id` parameter from the URL
  const [project, setProject] = useState(null); // State to store project details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [discussions, setDiscussions] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [following, setFollowing] = useState(false);
  const [likeStatus, setLiked] = useState(false);
  const [userUuid, setUserUuid] = useState(null);

  useEffect(() => {
    const fetchUserUuid = async () => {
      try {
        const response = await fetch(`${SERVER_HOST}/userauth/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserUuid(data.id);
      } catch (error) {
        console.error("Error fetching user UUID:", error);
      }
    };

    fetchUserUuid();
  }, [user.id]);

  useEffect(() => {
    // Fetch project details when the component mounts or the `id` changes
    const loadProjectInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchProjectInfo(id);
        if (data) {
          setProject(data);
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    loadProjectInfo();
  }, [id]);

  const handleFollow = async () => {
    setFollowing(!following);
    console.log("current following status:", following);
    const fdata = {
      action: following ? "unfollow" : "follow",
      user_id: 1,
    };
    console.log("id is ", id);

    try {
      const response = await axios.post(
        `${SERVER_HOST}/projects/follow/${id}`,
        fdata
      );
      console.log("response: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating follows: ", error);
    }
  };

  const handleLike = async () => {
    setLiked(!likeStatus);
    console.log("current like status:", likeStatus);
    const fdata = {
      action: likeStatus ? "unlike" : "like",
      user_id: 1,
    };
    console.log("id is ", id);

    try {
      const response = await axios.post(
        `${SERVER_HOST}/projects/like/${id}`,
        fdata
      );
      console.log("response: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleSave = async (data) => {
    console.log("Saving project data:", data);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("group", data.group);
    formData.append("institution", data.institution);
    formData.append("description", data.description);
    formData.append("full_description", data.full_description);
    formData.append("positions", JSON.stringify(data.positions));

    if (data.new_image) {
      formData.append("image_url", data.new_image);
    }

    try {
      const response = await axios.put(
        `${SERVER_HOST}/projects/${data.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Project updated successfully!");
      editProjectInfo(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update the project. Please try again.");
    }
  };

  const nextImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddComment = () => {
    setShowCommentForm(true);
    setReplyingTo(null);
  };

  const handleCancelComment = () => {
    setShowCommentForm(false);
    setReplyingTo(null);
  };

  const handleSubmitComment = (postId, content) => {
    if (postId) {
      // Add reply to existing post
      const updatedDiscussions = discussions.map((discussion) => {
        if (discussion.id === postId) {
          return {
            ...discussion,
            replies: [
              ...(discussion.replies || []),
              {
                id: Date.now().toString(),
                parentId: postId,
                author: {
                  name: "Current User",
                  title: "Project Member",
                  profileImage: "",
                },
                content,
                datePosted: new Date().toLocaleString(),
              },
            ],
          };
        }
        return discussion;
      });
      setDiscussions(updatedDiscussions);
    } else {
      // Add new post
      const newPost = {
        id: Date.now().toString(),
        author: {
          name: "Current User",
          title: "Project Member",
          profileImage: "",
        },
        content,
        datePosted: new Date().toLocaleString(),
        replies: [],
      };
      setDiscussions([...discussions, newPost]);
    }
    setShowCommentForm(false);
    setReplyingTo(null);
  };

  const handleReplyToPost = (id) => {
    setReplyingTo(id);
  };

  const handleDeletePost = (id) => {
    // In a real app, this would show a confirmation dialog
    if (confirm(`Delete post with ID ${id}?`)) {
      // Check if it's a main post or a reply
      const isMainPost = discussions.some((discussion) => discussion.id === id);

      if (isMainPost) {
        // Delete the main post and all its replies
        const updatedDiscussions = discussions.filter(
          (discussion) => discussion.id !== id
        );
        setDiscussions(updatedDiscussions);
      } else {
        // Delete a reply
        const updatedDiscussions = discussions.map((discussion) => {
          if (
            discussion.replies &&
            discussion.replies.some((reply) => reply.id === id)
          ) {
            return {
              ...discussion,
              replies: discussion.replies.filter((reply) => reply.id !== id),
            };
          }
          return discussion;
        });
        setDiscussions(updatedDiscussions);
      }
    }
  };

  const handleReaction = (id) => {
    alert(`Add reaction to post with ID ${id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!project) {
    return <div className="p-8 text-center">No project found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Project Details Card */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar placeholder */}
        <header className="border-b p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/project-list")}
            >
              <ChevronRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back to Projects
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl font-bold mb-6">{project.title}</h1>

          {/* Project showcase */}
          <div className="grid md:grid-cols-2 gap-6 mb-9">
            {/* Image Slider */}
            <div className="relslative bg-gray-200 aspect-[4/3] flex items-center justify-center mt-1">
              {project.images && project.images.length > 0 ? (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={
                        project.images[currentImageIndex] || "/placeholder.svg"
                      }
                      alt="Project image"
                      className="object-cover"
                    />
                    <div className="relative inset-0 flex items-center justify-between px-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"></div>
                </>
              ) : (
                <span>No images available</span>
              )}
            </div>
            {/* Project info */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-2">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={`${project.title} Cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>Cover Image goes here</span>
                )}
              </div>
              <div className="mb-6">
                <h5 className="text-sm">From</h5>
                <h2 className="text-xl font-bold">{project.group}</h2>
                <p className="text-sm">{project.description}</p>
              </div>

              <div className="flex gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleLike}>
                    <ThumbsUp className="h-6 w-6"></ThumbsUp>
                  </Button>
                  <span>{project.likes_count} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleFollow}>
                    <UserRound className="h-6 w-6"></UserRound>
                  </Button>
                  <span>{project.followers_count} Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="relative mt-1 mb-6">
            <div className="flex overflow-x-auto space-x-2 py-2">
              {project.images &&
                project.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 flex-shrink-0 cursor-pointer ${
                      currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Pic ${index + 1}`}
                      width={60}
                      height={60}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            className="mb-2"
            selectedIndex={[
              "overview",
              "updates",
              "members",
              "wanted",
              "discussions",
              "contact",
              "edit",
            ].indexOf(activeTab)}
            onSelect={(index) => {
              const tabNames = [
                "overview",
                "updates",
                "members",
                "wanted",
                "discussions",
                "contact",
                "edit",
              ];
              const selectedTab = tabNames[index];

              if (selectedTab === "edit") {
                setIsOpen(true); // Open the dialog
                setActiveTab("overview"); // Stay on the default tab (e.g., Overview)
              } else {
                setActiveTab(selectedTab); // Change tab normally
              }
            }}
          >
            <TabList
              className={`grid ${
                project.owner === userUuid ? "grid-cols-7" : "grid-cols-6"
              } w-full bg-gray-100 mb-8`}
            >
              <Tab
                value="overview"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Overview
              </Tab>
              <Tab
                value="updates"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Updates
              </Tab>
              <Tab
                value="members"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Members
              </Tab>
              <Tab
                value="wanted"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Wanted
              </Tab>
              <Tab
                value="discussions"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Discussions
              </Tab>
              <Tab
                value="contact"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Contact
              </Tab>

              {project.owner === userUuid && (
                <Tab
                  value="edit"
                  className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                  selectedClassName="bg-blue-200 text-black"
                  onClick={(e) => {
                    setIsOpen(true);
                    e.preventDefault();
                  }}
                >
                  Edit Project
                </Tab>
              )}
            </TabList>

            <EditProjectDialog
              open={isOpen}
              onOpenChange={setIsOpen}
              projectData={project}
              onSave={handleSave}
            />

            <TabPanel value="overview" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Overview</h2>
              </div>
              <h2 className="text-xl font-bold mb-4">
                Background & More Details About the Project
              </h2>
              <div className="mb-6">
                <p className="text-sm mb-8">{project.full_description}</p>

                <div className="mb-4">
                  {project.interest_tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <h3 className="text-xl font-bold mb-4">
                        Project Categories
                      </h3>
                      {project.interest_tags.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-400 hover:bg-black"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {project.skill_tags?.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Desired Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.skill_tags.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-400 hover:bg-black"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabPanel>

            <TabPanel value="updates">
              <div className="border rounded-lg p-4 overflow-hidden">
                <div className="p-5 border-solid">
                  <h2 className="text-2xl font-bold text-left mb-5">
                    Updates{" "}
                    <span className="text-yellow-500 font-bold">(W.I.P)</span>
                  </h2>
                  <div className="gap-4">
                    <h3 className="text-sm mb-3">Title</h3>
                    <Input
                      type="text"
                      className="flex-1 border rounded px-4 py-2 mb-6 h-10"
                    />
                    {showCommentForm ? (
                      <ReplyForm
                        postId={replyingTo || ""}
                        onCancel={handleCancelComment}
                        onSubmit={handleSubmitComment}
                      />
                    ) : (
                      <div className="border p-4 mb-4">
                        <div className="mb-4">
                          <div
                            className="w-full p-4 min-h-[100px] border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                            onClick={handleAddComment}
                          >
                            <p className="text-gray-500">
                              Add your comments here
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="secondary"
                            className="bg-gray-300 hover:bg-gray-400 text-black"
                            onClick={handleCancelComment}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="secondary"
                            className="bg-gray-300 hover:bg-gray-400 text-black"
                            onClick={handleAddComment}
                          >
                            Comment
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="members">
              <div className="border rounded-lg overflow-hidden">
                {/* Search and Add Member Section */}
                <div className="p-5 border-b">
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="Search for students to add"
                      className="flex-1 border rounded px-4 py-2"
                    />
                    <Button
                      variant="secondary"
                      className="bg-gray-300 hover:bg-gray-400 text-black"
                    >
                      Add Member
                    </Button>
                  </div>
                </div>

                {/* Members List Section */}
                <div className="p-5">
                  <h2 className="text-2xl font-bold mb-6">
                    Students Working on This Project{" "}
                    <span className="text-yellow-500 font-bold">(W.I.P)</span>
                  </h2>

                  <div className="space-y-4">
                    {/* Member 1 */}
                    <MemberCard
                      name="John Doe"
                      position="Backend Developer"
                      joinDate="01-01-2024"
                      profileImage="/placeholder.svg"
                    />
                    {/* Member 2 */}
                    <MemberCard
                      name="Jane Done"
                      position="Frontend Developer"
                      joinDate="01-01-2024"
                      profileImage="/placeholder.svg"
                    />
                    {/* Member 3 */}
                    <MemberCard
                      name="Jim Dope"
                      position="Backend Developer"
                      joinDate="01-01-2024"
                      profileImage="/placeholder.svg"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="wanted">
              <div className="rounded-lg overflow-hidden">
                {/* Wanted Header */}
                <h2 className="text-4xl font-bold mb-6">
                  Wanted{" "}
                  <span className="text-yellow-500 font-bold">(W.I.P)</span>
                </h2>
                {/* Positions Section */}
                <div>
                  <div className="p-6 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-bold">
                      Positions Needed for This Project
                    </h2>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-400 text-black"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Position
                    </Button>
                  </div>

                  <div>
                    <PositionCard
                      id="1"
                      title="Backend Developer"
                      datePosted="02-02-2024"
                      description="Work with Java Spring to implement the backend for a web app"
                      responsibilities={[
                        "General Description of the role. Lorem Ipsum is simply dummy text of the printing typesetting industry.",
                        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                      ]}
                      skillSets={{
                        technical: ["Python", "SQL", "C++", "Java"],
                        tools: ["Pandas", "AI Models", "Matlab", "TensorFlow"],
                        soft: [
                          "Communication",
                          "Analytical",
                          "Problem Solver",
                          "Detail Oriented",
                        ],
                      }}
                      qualification="Pursuing a BA in Computer Science"
                      skillMatch="35"
                    />
                    <PositionCard
                      id="2"
                      title="Backend Developer"
                      datePosted="02-02-2024"
                      description="Work with Java Spring to implement the backend for a web app"
                      responsibilities={[
                        "General Description of the role. Lorem Ipsum is simply dummy text of the printing typesetting industry.",
                        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                      ]}
                      skillSets={{
                        technical: ["Python", "SQL", "C++", "Java"],
                        tools: ["Pandas", "AI Models", "Matlab", "TensorFlow"],
                        soft: [
                          "Communication",
                          "Analytical",
                          "Problem Solver",
                          "Detail Oriented",
                        ],
                      }}
                      qualification="Pursuing a BA in Computer Science"
                      skillMatch="35"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="discussions" className="mt-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {/* Discussions Header */}
                <div className="p-6">
                  <div className="inline-block bg-white border rounded-lg px-4 py-2 mb-4">
                    <span className="font-bold">
                      Discussions{" "}
                      <span className="text-yellow-500 font-bold">(W.I.P)</span>
                    </span>
                  </div>
                </div>

                {/* Comment Form */}
                <div className="bg-white border-t p-6">
                  {showCommentForm ? (
                    <ReplyForm
                      postId={replyingTo || ""}
                      onCancel={handleCancelComment}
                      onSubmit={handleSubmitComment}
                    />
                  ) : (
                    <div className="border p-4 mb-4">
                      <div className="mb-4">
                        <div
                          className="w-full p-4 min-h-[100px] border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                          onClick={handleAddComment}
                        >
                          <p className="text-gray-500">
                            Add your comments here
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="secondary"
                          className="bg-gray-300 hover:bg-gray-400 text-black"
                          onClick={handleCancelComment}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="secondary"
                          className="bg-gray-300 hover:bg-gray-400 text-black"
                          onClick={handleAddComment}
                        >
                          Comment
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Discussion Posts */}
                  <div>
                    {discussions.length > 0 ? (
                      discussions.map((discussion) => (
                        <div key={discussion.id}>
                          <DiscussionPost
                            id={discussion.id}
                            author={discussion.author}
                            content={discussion.content}
                            datePosted={discussion.datePosted}
                            onReply={handleReplyToPost}
                            onDelete={handleDeletePost}
                            onReaction={handleReaction}
                          />

                          {replyingTo === discussion.id && (
                            <div className="ml-12 mt-4">
                              <ReplyForm
                                postId={discussion.id}
                                onCancel={handleCancelComment}
                                onSubmit={handleSubmitComment}
                              />
                            </div>
                          )}

                          {discussion.replies &&
                            discussion.replies.map((reply) => (
                              <div key={reply.id}>
                                <DiscussionPost
                                  id={reply.id}
                                  author={reply.author}
                                  content={reply.content}
                                  datePosted={reply.datePosted}
                                  isReply={true}
                                  parentId={discussion.id}
                                  onReply={handleReplyToPost}
                                  onDelete={handleDeletePost}
                                  onReaction={handleReaction}
                                />

                                {replyingTo === reply.id && (
                                  <div className="ml-12 mt-4">
                                    <ReplyForm
                                      postId={reply.id}
                                      onCancel={handleCancelComment}
                                      onSubmit={handleSubmitComment}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-8">
                        No discussions yet. Start the conversation!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="contact">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-5 border-b">
                  <h1 className="text-2xl font-bold mb-10">
                    Contact The Owner of This Project{" "}
                    <span className="text-yellow-500 font-bold">(W.I.P)</span>
                  </h1>
                  <h3 className="text-sm mb-3">Full Name</h3>
                  <Input
                    type="text"
                    className="flex-1 border rounded px-4 py-2 mb-6"
                  />
                  <h3 className="text-sm mb-3">Email Address</h3>
                  <Input
                    type="text"
                    className="flex-1 border rounded px-4 py-2 mb-6"
                  />
                  <h3 className="text-sm mb-3">Subject</h3>
                  <Input
                    type="text"
                    className="flex-1 border rounded px-4 py-2 mb-6"
                  />
                  <h3 className="text-sm mb-3">Description</h3>
                  <Input
                    type="text"
                    className="flex-1 border rounded px-4 py-2 mb-6 h-60"
                  />
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-gray-100 hover:bg-gray-400 text-black"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="edit"></TabPanel>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t p-4 text-center">
          <p className="text-muted-foreground"></p>
        </footer>
      </div>

      {/* Action Buttons */}
    </div>
  );
};

export default ProjectDetailPage;
