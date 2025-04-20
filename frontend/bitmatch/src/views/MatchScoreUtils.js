// Helper: Compare simple values (school, jobTitle)
function compareValues(valueA, valueB) {
  return valueA === valueB ? 1 : 0;
}

// Helper: Compare tags (intersection similarity)
function compareTags(tagsA, tagsB) {
  if (!tagsA || !tagsB || !Array.isArray(tagsA) || !Array.isArray(tagsB))
    return 0;

  const setA = new Set(tagsA.map((tag) => tag.toLowerCase()));
  const setB = new Set(tagsB.map((tag) => tag.toLowerCase()));

  const intersection = [...setA].filter((tag) => setB.has(tag));
  return intersection.length / Math.max(setA.size, 1); // Avoid division by zero
}

// Main: Calculate match score for one project and one user
function calculateMatchScore(project, user) {
  // Weights
  const weights = {
    school: 0.25,
    jobTitle: 0.15,
    tags: 0.6,
  };

  const schoolScore = compareValues(
    project.institution?.toLowerCase(),
    user.college?.toLowerCase()
  );

  // Compare against ALL project positions and get best matching role/title
  let jobScore = 0;
  if (project.positions?.length) {
    jobScore = Math.max(
      ...project.positions.map((pos) =>
        user.roles.includes(pos.title) ? 1 : 0
      )
    );
  }

  // Compare tags: interest_tags and skill_tags
  const interestScore = compareTags(project.interest_tags, user.interests);
  const skillScore = compareTags(project.skill_tags, user.skills);
  const tagScore = (interestScore + skillScore) / 2;

  // Total weighted score
  const totalScore =
    schoolScore * weights.school +
    jobScore * weights.jobTitle +
    tagScore * weights.tags;

  return Math.round(totalScore * 100); // Normalize to 0–100
}

// Entry Point: Calculate for all projects
export const calculateMatchScores = (userData, projects) => {
  return projects.map((project) => {
    const match_percentage = calculateMatchScore(project, userData);
    return {
      ...project,
      match_percentage,
    };
  });
};
