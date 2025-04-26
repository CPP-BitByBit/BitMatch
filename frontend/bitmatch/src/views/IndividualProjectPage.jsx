import {
  ChevronRight,
  ChevronLeft,
  ThumbsUp,
  UserRound,
  CirclePlus,
  LogOut,
  MapPin,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/project/MemberCard";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { EditProjectDialog } from "@/components/project/EditProjectDialog";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/Spinner";
import ReactMarkdown from "react-markdown";
import placeholderProfileImg from "../assets/profilepic.jpg";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const AI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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

// eslint-disable-next-line no-unused-vars
const editProjectInfo = async (id) => {};

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams(); // Access the dynamic `id` parameter from the URL
  const [AI_response, setAI_Response] = useState(null);
  const [project, setProject] = useState(null); // State to store project details
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [aiFeedbackLoading, setaiFeedbackLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [following, setFollowing] = useState(false);
  const [likeStatus, setLiked] = useState(false);
  const [userUuid, setUserUuid] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchUserUuid = async () => {
      try {
        const response = await fetch(`${SERVER_HOST}/userauth/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setuserData(data);
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
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    loadProjectInfo();
  }, [id, userUuid]);

  useEffect(() => {
    if (userData && project) {
      setIsMember(project.members.includes(userData.id));
      setIsReady(true);
    }
  }, [userData, project]);

  useEffect(() => {
    const fetchAllMembers = async () => {
      if (!project || !project.members || project.members.length === 0) return;

      try {
        const promises = project.members.map((uuid) =>
          fetch(`${SERVER_HOST}/userauth/fetch/${uuid}/`).then((res) =>
            res.ok ? res.json() : null
          )
        );

        const results = await Promise.all(promises);

        const validMembers = results.filter((member) => member !== null);

        setMemberData(validMembers);
      } catch (error) {
        console.error("Failed to fetch member data:", error);
      }
    };

    fetchAllMembers();
  }, [project]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      const data = await fetchUserByUUID(project.owner);
      if (data) {
        setOwnerData(data);
      }
    };
    fetchOwnerData();
  }, [project]);

  const fetchUserByUUID = async (userId) => {
    try {
      const response = await fetch(`${SERVER_HOST}/userauth/fetch/${userId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

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

  const handleJoin = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to join this project?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `${SERVER_HOST}/projects/member/manage/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userData.id,
            action: "join",
          }),
        }
      );

      if (response.ok) {
        setIsMember(true);
      }
    } catch (error) {
      console.error("Error joining project:", error);
    }
  };

  const handleLeave = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this project?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `${SERVER_HOST}/projects/member/manage/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userData.id,
            action: "leave",
          }),
        }
      );

      if (response.ok) {
        setIsMember(false);
      }
    } catch (error) {
      console.error("Error leaving project:", error);
    }
  };

  const ai_feedback = async () => {
    if (cooldown) return;
    setCooldown(true);
    setaiFeedbackLoading(true);
    const response = await AI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
  You are an professional evaluator.
  
  Based ONLY on the information provided, give the following feedback on my project idea:

  NOTE: If the input data looks like a test record just respond "Can't rate, this is a test record!"
  
  1. Display a score out of 10 **in big font** at the very top, based on the following breakdown:
     - **Clarity**: Rate the project’s clarity (out of 10)
     - **Originality**: Rate how original the idea is (out of 10)
     - **Completeness**: Rate how complete the project is (out of 10)
  
  ---
  
  2. Provide a **rating breakdown** for each category (Clarity, Originality, and Completeness), explaining why you gave each score.
  
  ---
  
  3. Strengths: 
     - List up to 3 strengths ONLY if they are notable.
  
  ---
  
  4. Areas for improvement:
     - List 3 concrete ways the project could be improved.
     - Keep it honest and constructive.
  
  ---
  
  DO NOT ask for additional information or clarification.
  Format it cleanly with section headers, a prominent rating at the top, and spacing between each section.
  
  
  ---

  ---PROJECT TITLE---
  ${project.full_description}
  
  ---BRIEF PROJECT DESCRIPTION---
  ${project.description}
  
  ---FULL DESCRIPTION---
  ${project.full_description}

  ---PROJECT CATEGORIES---
  ${project.interest_tags}

  ---PROJECT SKILLS---
  ${project.skill_tags}

  ---PROJECT POSITIONS NEEDED---
  ${project.positions.map((position) => position.title).join(", ")}
      `,
    });
    setAI_Response(response.text);
    setaiFeedbackLoading(false);
  };

  const ai_suggest = async () => {
    if (cooldown) return;
    setCooldown(true);
    setaiFeedbackLoading(true);
    const response = await AI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
  You are a professional evaluator.

  Based ONLY on the information provided, give the following feedback on how good of a fit I am for the project.
  NOTE: If the input data looks like a test record just respond "Can't rate, this is a test record!"

  1. **Fit Rating**: Rate how well I fit for this project out of 10 based on the following criteria:
     - **Interest Match**: How closely my interests (userdata.interests) align with the project's interest tags (project.interest_tags).
     - **Skills Match**: How closely my skills (userdata.skills) align with the project's required skills (project.skill_tags).
     - **Role Match**: How closely my roles (userdata.roles) align with the project's needed positions (project.positions).

  ---
  
  2. Provide a **rating breakdown** for each category (Interest Match, Skills Match, Role Match), explaining why you gave each score.

  ---
  
  3. Strengths:
     - List up to 3 strengths I bring to the project based on the alignment of my interests, skills, and roles.

  ---
  
  4. Areas for improvement:
     - List up to 3 areas where I could improve to be a better fit for the project.
     - Keep it honest and constructive.

  ---

  DO NOT ask for additional information or clarification.
  Format it cleanly with section headers, a prominent fit rating at the top, and spacing between each section.

  ---

  ---PROJECT SCHOOL---
  ${project.institution}

  ---PROJECT TITLE---
  ${project.full_description}

  ---BRIEF PROJECT DESCRIPTION---
  ${project.description}

  ---FULL DESCRIPTION---
  ${project.full_description}

  ---PROJECT CATEGORIES---
  ${project.interest_tags}

  ---PROJECT SKILLS---
  ${project.skill_tags}

  ---PROJECT POSITIONS NEEDED---
  ${project.positions.map((position) => position.title).join(", ")}

  ---USER INTERESTS---
  ${userData.interests}

  ---USER SKILLS---
  ${userData.skills}

  ---USER ROLES---
  ${userData.roles}

  ---USER SCHOOL---
  ${userData.school}
`,
    });
    setAI_Response(response.text);
    setaiFeedbackLoading(false);
  };

  useEffect(() => {
    let timer;
    if (cooldown) {
      timer = setTimeout(() => {
        setCooldown(false);
      }, 300000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleLike = async () => {
    setLiked(!likeStatus);
    const fdata = {
      action: likeStatus ? "unlike" : "like",
      user_id: 1,
    };

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
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("group", data.group);
    formData.append("location", data.location);
    formData.append("email", data.email);
    formData.append("other_contact", data.other_contact);
    formData.append("institution", data.institution);
    formData.append("description", data.description);
    formData.append("full_description", data.full_description);
    formData.append("positions", JSON.stringify(data.positions));
    formData.append("wanted_description", data.wanted_description);

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
                      className="object-cover w-full h-full"
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
                    className="w-full h-48 object-cover"
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

                <div className="flex items-center gap-2">
                  {isReady && userUuid !== project.owner && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={isMember ? handleLeave : handleJoin}
                        className={
                          isMember
                            ? "bg-red-500 hover:bg-red-100"
                            : "bg-green-500 hover:bg-green-600"
                        }
                      >
                        {isMember ? (
                          <LogOut className="h-6 w-6" />
                        ) : (
                          <CirclePlus className="h-6 w-6" />
                        )}
                      </Button>
                      <span
                        className={
                          isMember
                            ? "text-red-600 font-bold"
                            : "text-green-500 font-bold"
                        }
                      >
                        {isMember ? "Leave" : "Join"}
                      </span>
                    </>
                  )}
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
              "members",
              "wanted",
              "contact",
              project.owner === userUuid ? "ai_rate" : "ai_suggest",
              project.owner === userUuid ? "edit" : null,
            ].indexOf(activeTab)}
            onSelect={(index) => {
              const tabNames = [
                "overview",
                "members",
                "wanted",
                "contact",
                project.owner === userUuid ? "ai_rate" : "ai_suggest",
                project.owner === userUuid ? "edit" : null,
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
                project.owner === userUuid ? "grid-cols-6" : "grid-cols-5"
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
                value="contact"
                className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Contact
              </Tab>

              {project.owner === userUuid ? (
                <Tab
                  value="ai_rate"
                  className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                  selectedClassName="bg-blue-200 text-black"
                >
                  AI Feedback
                </Tab>
              ) : (
                <Tab
                  value="ai_suggest"
                  className="font-medium px-4 py-2 transition-all text-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded-md"
                  selectedClassName="bg-blue-200 text-black"
                >
                  AI Match
                </Tab>
              )}
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
              <h2 className="text-4xl font-bold mb-6">Overview</h2>

              <div className="mb-6">
                <p className="text-sm mb-8 markdown">
                  <h2 className="text-xl font-bold mb-4">
                    Background & More Details About the Project
                  </h2>
                  <ReactMarkdown>{project.full_description}</ReactMarkdown>
                </p>
                <div className="mb-4">
                  {project.interest_tags?.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-4">
                        Project Categories/Tags
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
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
                    </>
                  )}
                </div>
                <br></br>
                <h3 className="text-xl font-bold mb-4">Based In</h3>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </p>
              </div>
            </TabPanel>

            <TabPanel value="members">
              <div className="p-5">
                <h2 className="text-4xl font-bold mb-6">Project Members</h2>

                <div className="space-y-4">
                  {memberData.length > 0 ? (
                    memberData.map((member, idx) => (
                      <MemberCard
                        key={idx}
                        name={`${member.first_name} ${member.last_name}`}
                        position={"Contributor"}
                        authId={member.auth_id}
                        profileImage={placeholderProfileImg}
                      />
                    ))
                  ) : (
                    <p>No members found.</p>
                  )}
                </div>
              </div>
            </TabPanel>

            <TabPanel value="wanted">
              {/* Wanted Header */}
              <h2 className="text-4xl font-bold mb-6">Wanted</h2>

              {/* Positions Section */}
              <div>
                <div className="markdown">
                  <ReactMarkdown>{project.wanted_description}</ReactMarkdown>
                </div>
              </div>

              {project.positions?.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-4">Open Positions</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.positions.map((position, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-400 hover:bg-black"
                      >
                        {position.title}
                      </Badge>
                    ))}
                  </div>
                </>
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
            </TabPanel>

            <TabPanel value="contact">
              <div className="p-5 border-b">
                <h1 className="text-4xl font-bold mb-6">
                  Project Owner Contact Information
                </h1>

                {/* Render Owner's name if data is available */}
                <span className="font-bold">Owner: </span>
                {ownerData ? (
                  <a
                    href={`/profile/${ownerData.auth_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {ownerData.first_name + " " + ownerData.last_name}
                  </a>
                ) : (
                  "Loading..."
                )}
                <br></br>

                <span className="font-bold">Project Email: </span>
                {project.email ? project.email : "N/A"}
                <br></br>

                <span className="font-bold">Social Contact: </span>
                {project.other_contact ? project.other_contact : "N/A"}
                <br></br>
              </div>
            </TabPanel>

            {project.owner === userUuid ? (
              <TabPanel value="ai_rate">
                <CardHeader className="flex items-center justify-between p-6">
                  <CardTitle className="text-2xl font-bold">
                    🤖 AI Rate My Project 🤖
                  </CardTitle>
                  <h2 className="text-lg text-center">
                    Let AI rate your project and give feedback.
                  </h2>
                  <Button
                    onClick={ai_feedback}
                    disabled={aiFeedbackLoading || cooldown}
                    className="flex items-center"
                  >
                    {aiFeedbackLoading ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        {cooldown
                          ? "Cooldown between ratings, try again in 5 minutes."
                          : "Rate Project"}
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent className="p-6">
                  <AnimatePresence>
                    {aiFeedbackLoading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-gray-500 py-8"
                      >
                        Rating...
                      </motion.div>
                    )}

                    {!aiFeedbackLoading && AI_response && (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-lg text-center markdown"
                      >
                        <ReactMarkdown>{AI_response}</ReactMarkdown>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </TabPanel>
            ) : (
              <TabPanel value="ai_suggest">
                <CardHeader className="flex items-center justify-between p-6">
                  <CardTitle className="text-2xl font-bold">
                    🤖 AI Match Score 🤖
                  </CardTitle>
                  <h2 className="text-lg text-center">
                    Let AI rate how good of a fit you would be for this project
                    based on your profile.
                  </h2>
                  <Button
                    onClick={ai_suggest}
                    disabled={aiFeedbackLoading || cooldown}
                    className="flex items-center"
                  >
                    {aiFeedbackLoading ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        {cooldown
                          ? "Cooldown between ratings, try again in 5 minutes."
                          : "Rate Project"}
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent className="p-6">
                  <AnimatePresence>
                    {aiFeedbackLoading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-gray-500 py-8"
                      >
                        Rating...
                      </motion.div>
                    )}

                    {!aiFeedbackLoading && AI_response && (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-lg text-center markdown"
                      >
                        <ReactMarkdown>{AI_response}</ReactMarkdown>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </TabPanel>
            )}
            {project.owner === userUuid && <TabPanel value="edit"></TabPanel>}
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
