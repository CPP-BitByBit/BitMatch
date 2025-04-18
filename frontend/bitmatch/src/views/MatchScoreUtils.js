// function calculateMatchScore(Project, User) {
//   // Define weights for each attribute (optional)
//   const weights = {
//     school: 0.25,
//     jobTitle: 0.15,
//     tags: 0.6,
//   };

//   // Function to compare two values and return a score (0 to 1)
//   function compareValues(valueA, valueB) {
//     if (valueA === valueB) {
//       return 1; // Perfect match
//     } else {
//       // For non-numeric values, return 0 if they don't match
//       return 0;
//     }
//   }

//   // Function to compare tags of Project and User
//   function compareTags(tagsP, tagsU) {
//     let count = 0; // Value to keep Track of how many instances of
//     let score = 0.0;
//     for (let i = 0; i < tagsP.length; i++) {
//       for (let j = 0; j < tagsP.length; j++) {
//         if (tagsU[i] == tagsP[j]) {
//           count++;
//         }
//       }
//     }
//     score = count / tagsP.length;
//     return score;
//   }
//   // Calculate scores for each attribute
//   const score1 = compareValues(Project.school, User.school);
//   const score2 = compareValues(Project.jobTitle, User.jobTitle);
//   const score3 = compareTags(Project.tags, User.tags);
//   // Sum the scores
//   const totalScore = score1 * 0.25 + score2 * 0.15 + score3 * 0.6;

//   // Normalize the score to a range of 0 to 100
//   const normalizedScore = Math.round(totalScore * 100);
//   return normalizedScore;
// }

// function main() {
//   let scores = [];
//   for (let i = projects; projects.length(); i++) {
//     scores.push(calculateMatchScore(projects[i], user));
//   }
//   scores.sort((a, b) => a - b);
// }
// // Example usage
// /*const Project = {
//     school: "Cal Poly Pomona",
//     jobTitle: "Data Scientist",
//     tags: ["Python", "Data Science"]
// };

// const User = {
//     school: "Cal Poly Pomona",
//     jobTitle: "Software Engineer",
//     tags: ["Python", "Object Orientated Programing"]
// };

// let sample = calculateMatchScore(Project, User);
// console.log(sample);*/

// Placeholder function to calculate the match score
// TODO: MAKE THIS ACTUALLY CALCULATE CORRECTLY BASED OFF DATA, RN IT IS RANDOMLY CALCULATING BELOW ARE THE EXAMPLES OF THE DATA PASSED IN.
// PLEASE USE HELPER FUNCTIONS, ONE GIANT FUNCTION NOT IDEAL.
export const calculateMatchScores = (userData, projects) => {
  console.log(userData);

  // Mock User Profile:
  // {
  //   id: "610c6c0f-dcf2-432f-b64b-9ec94481ef8d",
  //   auth_id: "user_2tTc9slPZTzbFvJWsujHu4MMg62",
  //   first_name: "Larry",
  //   last_name: "La",
  //   username: "larrylaa",
  //   email: "larryquocla@gmail.com",
  //   about_me: "As a rising junior computer science student at California State Polytechnic University-Pomona, I am passionate about learning and applying new technologies to create impactful software.",
  //   college: "Cal Poly Pomona",
  //   major: "Computer Science",
  //   grad_date: "May 2027",
  //   location: "El Monte, CA",
  //   interests: ["Backend", "Cloud Computing", "DevOps", "Frontend"],
  //   roles: ["Backend Web Developer", "Cloud Engineer", "Cloud Security Engineer", "DevOps Engineer", "Software Engineer"],
  //   skills: ["AWS", "Azure", "Back-End Web Development", "C#", "ExpressJS", "Git/Github", "HTML/CSS", "Java", "JavaScript", "Postgres", "Powershell", "Python", "React", "SQL", "Terraform", "VBA"],
  //   location_preferences: ["Near my University or College location", "Remote friendly projects", "Near my location"],
  //   followers: 0,
  //   likes: 0,
  //   owned: [],
  //   projects: ["67e6f820-b053-48d8-a7dd-db11396d3310", "37bfe931-7be0-42b1-ab85-abd110c22ff7"]
  // }

  console.log(projects);

  // Mock Project:
  // {
  //   id: "4cca4a32-ba4b-4ad7-ab4b-e298d428ef5a",
  //   title: "Mobile Pirate Game",
  //   description: "This is a project to make a mobile side scrolling pirate game.",
  //   full_description: "This is a project to make a mobile side scrolling pirate game.",
  //   image_url: "https://bitmatch-django-media-bucket.s3.amazonaws.com/projects/home_bg_landscape.png",
  //   institution: "California Polytechnic State University Pomona",
  //   owner: "db164a04-b296-41f8-b70d-ef31cda89f3e",
  //   followers_count: 0,
  //   likes_count: 0,
  //   positions: [
  //     // Example structure:
  //     // {
  //     //   title: "Frontend Developer",
  //     //   skills_required: ["React", "JavaScript"],
  //     //   filled: false
  //     // }
  //   ],
  //   location: [],
  //   interest_tags: null,
  //   skill_tags: null,
  //   group: "",
  //   email: null,
  //   other_contact: null,
  //   updates: null,
  //   wanted_description: null,
  // }

  return projects.map((project) => {
    // Placeholder logic: randomly assign a score between 1 and 100
    const match_percentage = Math.floor(Math.random() * 100) + 1;

    return {
      ...project,
      match_percentage: match_percentage,
    };
  });
};
