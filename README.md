# ![BITMATCH Logo](https://github.com/user-attachments/assets/86a9155c-f1ad-49d0-b01d-2580ee7b71a4)

BitMatch is a web application platform designed to bridge the gap between innovators seeking project feedback and college students looking for hands-on experience. Many innovators struggle to promote their ideas, receive constructive input, and recruit talent, while students face challenges in finding meaningful projects to build skills and enhance their resumes.

## 🚀 Solution

BitMatch provides a streamlined platform where:

- **Innovators** can showcase their projects, connect with interested students, and receive valuable feedback.
- **Students** can find projects aligned with their skills and interests, allowing them to gain real-world experience and collaborate with like-minded individuals.

## 🔑 Key Features

### 🎯 Project Promotion

- Innovators can create organizations and list projects under them.
- Listings include like/dislike features, comments, and recruitment options.

### 🔍 Match Score

- Students input their existing skills into a profile.
- The system suggests the most relevant projects based on a percentage match score.
- Students can apply to join suitable projects.

### 💬 Direct Messaging

- Innovators and students can communicate directly within the platform.
- Enables seamless discussions about project roles, requirements, and feedback.

## 🛠 Tech Stack

### Frontend

- React w/ Tailwind CSS (ShadCN)

### Backend

- Django
- Azure Postgres Instance
- Azure Blob Store (For Images)

### Deployment

- Frontend on Static Web Apps
- Backend on Azure VM
- Terraform for infrastructure as code (IaC)

## 🏗 Architecture Diagram

![image](https://github.com/user-attachments/assets/ab2ffb5f-9fe8-437f-8f8e-40358a914c7e)


## 🛠 Running Locally

### 1️⃣ **Backend Setup**

#### Install Python and Virtual Environment + Dependencies

```sh
pip install virtualenv
```

#### Create and Activate Virtual Environment

##### Windows:

```sh
python -m venv env
env\Scripts\activate
```

##### Mac/Linux:

```sh
python3 -m venv env
source env/bin/activate
```

### 2️⃣ **Install Backend Dependencies**

After activating the virtual environment, install the necessary dependencies for the backend:

```sh
cd backend
pip install -r requirements.txt
```

### 3️⃣ **Running the Backend Server**

Activate the virtual environment (if not already activated), and then run the backend server:

##### Windows:

```sh
env\Scripts\activate
```

##### Mac/Linux:

```sh
source env/bin/activate
```

Then, run the backend server:

```sh
cd backend/bitmatch
python manage.py runserver
```

### 4️⃣ **Frontend Setup**

#### Install Node.js and NPM + Dependencies

```sh
# Navigate to frontend directory
cd frontend
npm install
```

### 5️⃣ **Running the Frontend Server**

Navigate to the `frontend/bitmatch` directory, and run the frontend server:

```sh
cd frontend/bitmatch
npm run dev
```

- Press `Ctrl + Click` on the link to open the application in your browser.
- You will see live updates whenever you save your code.

## ✨ Contributors (Team BitByBit)

This project was for Professor Yu Sun's CS4800 class @ Cal Poly Pomona.
| | | | |
| :---: | :---: | :---: | :---: |
| <img width="50" src="https://avatars.githubusercontent.com/u/137100338?v=4"/></br>[Larry La](https://github.com/larrylaa) | <img width="50" src="https://avatars.githubusercontent.com/u/2145912?v=4"/></br>[Rebecca Smith](https://github.com/Rebeccals) | <img width="50" src="https://avatars.githubusercontent.com/u/118137779?v=4"/></br> [Luis Dominguez](https://github.com/luisd101) | <img width="50" src="https://avatars.githubusercontent.com/u/102125255?v=4"/></br>[William Garcia](https://github.com/ColumnSkunky) |
