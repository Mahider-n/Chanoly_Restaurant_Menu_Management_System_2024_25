package com.hintsete.courselistapp

data class Course(
    val id: Int,
    val title: String,
    val code: String,
    val creditHours: Int,
    val description: String,
    val prerequisites: String
)

// Sample data
val sampleCourses = listOf(
    Course(
        id = 1,
        title = "Mobile Application Development",
        code = "CS402",
        creditHours = 3,
        description = "This course covers modern mobile app development techniques using Android and Jetpack Compose.",
        prerequisites = "CS201, CS301"
    ),
    Course(
        id = 2,
        title = "Data Structures and Algorithms",
        code = "CS201",
        creditHours = 4,
        description = "Fundamental data structures and algorithms with analysis of time and space complexity.",
        prerequisites = "CS101"
    ),
    Course(
        id = 3,
        title = "Fundamentals of Artificial Intelligence",
        code = "CS410",
        creditHours = 3,
        description = "Introduction to AI concepts including machine learning, neural networks, and intelligent agents.",
        prerequisites = "CS201, MATH202"
    ),
    Course(
        id = 4,
        title = "Fundamentals of Cyber Security",
        code = "CS415",
        creditHours = 3,
        description = "Basic principles of information security, cryptography, and secure system design.",
        prerequisites = "CS201, NET301"
    ),
    Course(
        id = 5,
        title = "Graphics",
        code = "CS420",
        creditHours = 3,
        description = "Computer graphics fundamentals including rendering techniques, 3D modeling, and GPU programming.",
        prerequisites = "CS201, MATH205"
    ),
    Course(
        id = 6,
        title = "Introduction to Operating Systems",
        code = "CS305",
        creditHours = 4,
        description = "Overview of operating system concepts including processes, memory management, and file systems.",
        prerequisites = "CS201"
    )

)