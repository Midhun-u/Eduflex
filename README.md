# Eduflex

Eduflex is Learning Management System (LMS) is a digital platform that helps create, manage, deliver, and track educational courses or training programs. It enables learners to access content anytime, while instructors or organizations can monitor progress, assessments, and performance.


# About

This Learning Management System (LMS) is an online platform that makes teaching and learning easier. Educators can create, update, and manage courses, add learning materials, and check student performance. Students can enroll in courses, study the materials, and track their progress in a simple and user-friendly way.The main goal of this project is to help learners who don’t have enough resources for their studies. Many students struggle with limited materials, lack of guidance, or difficulty keeping track of their learning. This LMS solves that problem by giving educators a space to share knowledge and by giving students easy access to courses and progress tracking.It also helps learners who want to improve their skills or switch to a new career. By providing structured courses and progress monitoring, the platform makes it easier for learners to grow, gain confidence, and achieve their career goals.

# Features

 * <h3>Authentication</h3>

 - Secure login and registration using JWT (JSON Web Tokens)
 - Google authentication for easy sign-in
 - Protected API routes with token validation
 - Safe handling of user sessions and data

 * <h3>For students</h3>

 - Safe handling of user sessions and data
 - Easy course enrollment
 - Access study courses anytime, anywhere
 - Select courses through category
 - One time payment life time access
 - Track personal learning progress in real-time
 - Learn at their own pace with structured courses
 - Can add courses to cart and purchase
 - Can add courses to wishlist

 * <h3>For educators </h3>

 - Create and update courses with content and assessments
 - Monitor student enrollment and progress
 - Track performance and engagement
 - Organize and manage course structure effectively

 * <h3>Platform Highlights</h3>

 - Simple and user-friendly interface
 - Centralized platform for teaching and learning
 - Real-time progress tracking and insights
 - Helps learners upskill or explore new career paths
 - Implemented pagination for easy browsing of courses and fast API
 - Caching for faster content loading and improved performance
 - Well-structured folders for organized code management


# Tech Stacks

    - Frontend : Next.js, TypeScript, Sass, Redux, React Toastify(For toaster messages ), Lucide React(For icons)

    - Backend : Node.js, Express.js, Bun.js, Hono.js , Typescript, REST API

    - Databases : MongoDB , PostgreSQL, Redis

    - ORM || ODM : Mongoose , Sequelize

    - Authentication : JWT (Json Web Token ) , Bcrypt , Firebase (For Google authentication)

    - Storage & Media : Cloudinary
    
    - Payments : Stripe

    - Email service : Nodemailer
    
    - HTTP & API Calls : Axios

    - Version Control : Git


# Installation

    * Prerequisites

    - Node js
    - Bun js
    - npm or yarn
    - Mongodb
    - Postgres
    - Redis
    - Git

    * installation

    - git clone https://github.com/Midhun-u/Eduflex.git
    - Inside project
    - cd client && npm install
    - cd services && 
        cd auth-service && npm install && npm run build,
        cd course-service && bun install && bun start,
        cd cart-service && bun install && bun start,
        cd wishlist-service && bun install && bun start,
        cd enrollment-service && bun install && bun start,
        cd payment-service && bun install bun start,


![Sign page](<./Sign page.png>)
![Login page](<Login page.png>)
![Home page](<Home page.png>)
![Courses page](<./Courses page.png>)
![Course details page](<./Course details page.png>)
![Cart page](<Cart page.png>)
![Cart checkout page](<Cart checkout page.png>)
![Wishlist page](<Wishlist page.png>)
![Category page](<Category page.png>)
![Payment page](<Payment screen.png>)
![Enrolled courses page](<Enrolled courses page.png>)
![Learning page](<Learning page.png>)
![Educator dashboard page](<Educator dashboard.png>)
![Add course page](<Add course page.png>)
![Educator courses details page](<Educator course details page.png>)
![Enrolled students page](<Enrolled students page.png>)
![Settings page](<Settings page.png>)
