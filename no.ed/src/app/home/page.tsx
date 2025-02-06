/* eslint-disable react/jsx-key */
"use client";


function hello() {
    // const [data, setData] = useState({});
    const output={
  "answer": [
    {
      "id": 1,
      "topic": "Data Structures and Algorithms",
      "subtopics": [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
        "Graphs",
        "Sorting Algorithms",
        "Searching Algorithms"
      ],
      "courses_links": [
        "https://www.coursera.org/specializations/algorithms",
        "https://www.udemy.com/course/data-structures-and-algorithms-in-python/"
      ],
      "documentaion_links": [
        "https://www.youtube.com/watch?v=B30u_s_W_80",
        "https://www.youtube.com/watch?v=RBSGKlAvoiM"
      ],
      "outcome_of_learning_30_words": "Understand fundamental data structures, implement efficient algorithms, and analyze their time and space complexity."
    },
    {
      "id": 2,
      "topic": "Object-Oriented Programming (OOP)",
      "subtopics": [
        "Classes and Objects",
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
        "Abstraction"
      ],
      "courses_links": [
        "https://www.coursera.org/learn/object-oriented-programming-in-java",
        "https://www.udemy.com/course/object-oriented-programming-in-c-plus-plus/"
      ],
      "documentaion_links": [
        "https://www.youtube.com/watch?v=pTB0E96I9bg",
        "https://www.youtube.com/watch?v=vLnPwxZ9Z7c"
      ],
      "outcome_of_learning_30_words": "Design and implement software using OOP principles, improving code reusability, maintainability, and scalability."
    },
    {
      "id": 3,
      "topic": "Databases",
      "subtopics": [
        "SQL",
        "NoSQL",
        "Database Design",
        "Database Management"
      ],
      "courses_links": [
        "https://www.coursera.org/learn/sql-for-data-science",
        "https://www.udemy.com/course/the-complete-sql-bootcamp/"
      ],
      "documentaion_links": [
        "https://www.youtube.com/watch?v=HXV3zeQKqzs",
        "https://www.youtube.com/watch?v=7S_tzUa1-t8"
      ],
      "outcome_of_learning_30_words": "Work with relational and NoSQL databases, design efficient database schemas, and manage database systems effectively."
    },
    {
      "id": 4,
      "topic": "Web Development",
      "subtopics": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "REST APIs"
      ],
      "courses_links": [
        "https://www.freecodecamp.org/learn/",
        "https://www.udemy.com/course/the-web-developer-bootcamp/"
      ],
      "documentaion_links": [
        "https://www.youtube.com/watch?v=pKd0Rpw7O48",
        "https://www.youtube.com/watch?v=3PHXj9g-9q0"
      ],
      "outcome_of_learning_30_words": "Build and deploy web applications using modern technologies, creating interactive and responsive user interfaces."
    },
    {
      "id": 5,
      "topic": "Software Engineering Principles",
      "subtopics": [
        "Version Control (Git)",
        "Agile Methodologies",
        "Software Design Patterns",
        "Testing",
        "Debugging"
      ],
      "courses_links": [
        "https://www.coursera.org/learn/software-engineering",
        "https://www.udemy.com/course/software-engineering-fundamentals/"
      ],
      "documentaion_links": [
        "https://www.youtube.com/watch?v=HVsyItA7-qI",
        "https://www.youtube.com/watch?v=8b7B5o_wM30"
      ],
      "outcome_of_learning_30_words": "Apply software engineering best practices to design, develop, and maintain high-quality software projects."
    },
    {
      "id": 6,
      "topic": "Cloud Computing",
      "subtopics": [
        "AWS",
        "Azure",
        "GCP",
        "Cloud Security",
        "Serverless Computing"
      ],
      "courses_links": [
        "https://aws.amazon.com/training/",
        "https://azure.microsoft.com/en-us/training/"
      ],
      "documentaion_links": [
        "https://www.youtube.com/watch?v=o9pEzgHor-A",
        "https://www.youtube.com/watch?v=a7H8q6k_z8E"
      ],
      "outcome_of_learning_30_words": "Deploy and manage applications in the cloud using leading platforms, understanding cloud security and cost optimization."
    }
    ]
}
    
    return ( 
        <div  className="flex  rounded  bg-black  border-2  items-center justify-center h-screen">
            <div className="w-1/3  h-full bg-black flex flex-col items-center justify-center">
                <div className="rounded-2xl bg-white flex flex-col gap-8 p-4 hover:bg-black hover:text-white duration-500 transition-all border  border-black h-2/3 w-full">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[0].topic}</div>
                    <div>
                    <div className="font-tripSansMono font-bold text-3xl">Subtopics</div>
                    <ul className="list-disc list-inside font-tripSansMono">
                        {output.answer[0].subtopics.slice(0, 6).map((subtopic, key) => {
                            return <li key={key}> {subtopic}</li>;
                        })}
                    </ul>
                    </div>
                  
                <div>
                    <div className=" font-tripSansMono font-bold text-3xl">Outcome</div>
                    <div className="font-tripSansMono">{output.answer[0].outcome_of_learning_30_words}</div>
                    </div>
                </div>
                <div className="rounded-2xl bg-white  p-4 flex flex-col gap-4 hover:bg-black hover:text-white duration-500 transition-all border-black h-1/3 w-full ">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[1].topic}</div>
                <div>
                    <div className=" font-tripSansMono font-bold text-3xl">Outcome</div>
                    <div className="font-tripSansMono">{output.answer[0].outcome_of_learning_30_words}</div>
                    </div>
                </div>
            </div>
            <div className="w-1/3   h-full  bg-black flex flex-col items-center justify-center">
                <div className="rounded-2xl bg-white border-black flex flex-col hover:text-white hover:bg-black duration-500 transition-all justify-center border w-full h-1/6 p-4">
                  <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[2].topic}</div>
                </div>
                <div className="rounded-2xl bg-white hover:text-white hover:bg-black duration-500 transition-all border-black border p-4 gap-8 flex flex-col  w-full h-4/6">
                  <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[3].topic}</div>
                    <div>
                    <div className="font-tripSansMono font-bold text-3xl">Subtopics</div>
                    <ul className="list-disc list-inside font-tripSansMono">
                        {output.answer[3].subtopics.slice(0, 6).map((subtopic, key) => {
                            return <li key={key}> {subtopic}</li>;
                        })}
                    </ul>
                    </div>

               <div>
                    <div className=" font-tripSansMono font-bold text-3xl">Outcome</div>
                    <div className="font-tripSansMono">{output.answer[3].outcome_of_learning_30_words}</div>
                </div>
                </div>
                <div className="rounded-2xl bg-white border-black flex flex-col hover:text-white hover:bg-black duration-500 transition-all justify-center border w-full h-1/6 p-4">
                  <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[4].topic}</div>
                </div>
            </div>
            <div className="w-1/3  h-full  flex  bg-black  flex-col items-center justify-center">
                <div className="rounded-2xl  flex flex-col gap-8 p-4 duration-500 transition-all hover:text-white hover:bg-black  bg-white w-full h-4/5 border-black border">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[1].topic}</div>
                     <div>
                    <div className="font-tripSansMono font-bold text-3xl">Subtopics</div>
                    <ul className="list-disc list-inside font-tripSansMono">
                        {output.answer[3].subtopics.slice(0, 6).map((subtopic, key) => {
                            return <li key={key}> {subtopic}</li>;
                        })}
                    </ul>
                    </div>
                   
                <div>
                    <div className=" font-tripSansMono font-bold text-3xl">Outcome</div>
                    <div className="font-tripSansMono">{output.answer[5].outcome_of_learning_30_words}</div>
                </div>
                </div>
                
                <div className="rounded-2xl flex flex-col justify-center text-white bold text-center  text-5xl bg-[#FF4949] w-full h-1/5 border-black border">
                    <div>
                    TO UNLOCK :<br/>
                    {0}/7 COMPLETED
                    </div>
                </div>
            </div>
            
        </div>
     );
}

export default hello;