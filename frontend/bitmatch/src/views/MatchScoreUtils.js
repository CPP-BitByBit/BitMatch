// Compare simple string values (e.g., institution, location)
function compareValues(valueA, valueB) {
  if (!valueA || !valueB) return 0;

  const a =
    typeof valueA === "string"
      ? valueA.trim().toLowerCase()
      : String(valueA).toLowerCase();
  const b =
    typeof valueB === "string"
      ? valueB.trim().toLowerCase()
      : String(valueB).toLowerCase();

  return a === b ? 1 : 0;
}

// Compare array-type tags (e.g., interests, skills)
function compareTags(tagsA, tagsB) {
  if (!Array.isArray(tagsA) || !Array.isArray(tagsB)) return 0;

  const setA = new Set(tagsA.map((tag) => tag.toLowerCase()));
  const setB = new Set(tagsB.map((tag) => tag.toLowerCase()));

  const intersection = [...setA].filter((tag) => setB.has(tag));
  return intersection.length / Math.max(setA.size, 1); // Avoid div by zero
}

// Simple deterministic hash function
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

// Stable score variation based on project/user identity
function addStableVariation(score, projectId, userId) {
  const combined = `${projectId}_${userId}`;
  const hash = simpleHash(combined);
  const variation = ((hash % 400) - 200) / 100; // Range: -2 to +2
  return Math.min(100, Math.max(0, score + variation));
}

// Main match score calculation
function calculateMatchScore(project, user) {
  const weights = {
    institution: 0.15,
    location: 0.05,
    interestTags: 0.1,
    skillTags: 0.5,
    roles: 0.2,
  };

  const institutionScore = compareValues(project.institution, user.college);
  const locationScore = compareValues(project.location, user.location);

  let roleScore = 0;
  if (project.positions?.length && Array.isArray(user.roles)) {
    roleScore = Math.max(
      ...project.positions.map((pos) =>
        user.roles.includes(pos.title) ? 1 : 0
      )
    );
  }

  const interestScore = compareTags(project.interest_tags, user.interests);
  const skillScore = compareTags(project.skill_tags, user.skills);

  const totalScore =
    institutionScore * weights.institution +
    locationScore * weights.location +
    interestScore * weights.interestTags +
    skillScore * weights.skillTags +
    roleScore * weights.roles;

  // Apply stable variation
  return Math.round(addStableVariation(totalScore * 100, project.id, user.id));
}

// Entry point
export const calculateMatchScores = (userData, projects) => {
  return projects.map((project) => {
    const match_percentage = calculateMatchScore(project, userData);
    return {
      ...project,
      match_percentage,
    };
  });
};
