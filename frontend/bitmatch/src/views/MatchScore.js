let projects = fetch('http://localhost:5432/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching projects:', error));
  
let user = fetch('http://localhost:8000/user_123/')
    .then(res => res.json())
    .then(data => console.log('User data:', data))
    .catch(error => console.error('Error fetching user:', error));
  
function calculateMatchScore(Project, User) {
    // Define weights for each attribute (optional)
    const weights = {
        school: 0.25,
        jobTitle: 0.15,
        tags: 0.60 
    };

    // Function to compare two values and return a score (0 to 1)
    function compareValues(valueA, valueB) {
        if (valueA === valueB) {
            return 1; // Perfect match
        } else {
            // For non-numeric values, return 0 if they don't match
            return 0;
        }
    }

    // Function to compare tags of Project and User
    function compareTags(tagsP, tagsU){
        let count = 0; // Value to keep Track of how many instances of 
        let score = 0.0;
        for(let i = 0; i < tagsP.length; i++){
            for(let j = 0; j < tagsP.length; j ++){
                if (tagsU[i] == tagsP[j]){
                    count ++;
                }
            }
        }
        score = (count/tagsP.length);
        return score; 
    }
    // Calculate scores for each attribute
    const score1 = compareValues(Project.school, User.school) 
    const score2 = compareValues(Project.jobTitle, User.jobTitle) 
    const score3 = compareTags(Project.tags, User.tags) 
    // Sum the scores
    const totalScore = (score1 * 0.25) + (score2 * 0.15) + (score3 * 0.6);

    // Normalize the score to a range of 0 to 100
    const normalizedScore = Math.round(totalScore * 100);
    return normalizedScore;
}

function main(){
    let scores = [];
    for(let i = projects; projects.length(); i++){
        scores.push(calculateMatchScore(projects[i], user));
    }
    scores.sort((a,b) => a-b);
}
// Example usage
/*const Project = {
    school: "Cal Poly Pomona",
    jobTitle: "Data Scientist",
    tags: ["Python", "Data Science"]
};

const User = {
    school: "Cal Poly Pomona",
    jobTitle: "Software Engineer",
    tags: ["Python", "Object Orientated Programing"]
};


let sample = calculateMatchScore(Project, User);
console.log(sample);*/