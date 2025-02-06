/* eslint-disable react/jsx-key */
"use client";
import { useRouter } from "next/navigation";
import {useState,useEffect} from "react";
import axios from "axios";

function Hello({ data }) {
    const [output, setData] = useState({
  "answer": [
  {
    "id": 1,
    "topic": "Large Language Models (LLMs)",
    "subtopics": [
      "Transformer Architecture",
      "Fine-tuning Techniques",
      "Prompt Engineering",
      "Applications of LLMs"
    ],
    "duration": "4-6 weeks",
    "courses_courses": [
      "https://www.coursera.org/specializations/natural-language-processing",
      "https://www.coursera.org/learn/generative-ai-with-llms"
    ],
    "projects_to_do": [
      "Build a text summarization tool",
      "Create a chatbot using a pre-trained LLM"
    ],
    "outcome_of_learning_30_words": "Gain a deep understanding of LLMs, including their architecture, training, and applications. Develop practical skills in fine-tuning and deploying LLMs for various NLP tasks."
  },
  {
    "id": 2,
    "topic": "Explainable AI (XAI)",
    "subtopics": [
      "SHAP Values",
      "LIME",
      "Interpretable Models",
      "Evaluating Explainability"
    ],
    "duration": "3-4 weeks",
    "courses_courses": [
      "https://www.coursera.org/learn/explainable-ai",
      "https://www.coursera.org/learn/practical-data-science"
    ],
    "projects_to_do": [
      "Explain the predictions of a complex model",
      "Build an interpretable model for a specific task"
    ],
    "outcome_of_learning_30_words": "Learn techniques for making machine learning models more transparent and understandable. Develop skills in evaluating and comparing different XAI methods."
  },
  {
    "id": 3,
    "topic": "Reinforcement Learning (RL)",
    "subtopics": [
      "Q-Learning",
      "Deep Q-Networks (DQN)",
      "Policy Gradients",
      "Applications of RL"
    ],
    "duration": "4-6 weeks",
    "courses_courses": [
      "https://www.coursera.org/specializations/reinforcement-learning",
      "https://www.coursera.org/learn/deep-reinforcement-learning"
    ],
    "projects_to_do": [
      "Train an agent to play a game",
      "Implement an RL algorithm for a robotics task"
    ],
    "outcome_of_learning_30_words": "Master the fundamentals of reinforcement learning and apply RL algorithms to solve real-world problems. Build experience in training agents in complex environments."
  },
  {
    "id": 4,
    "topic": "Edge AI and TinyML",
    "subtopics": [
      "Model Optimization",
      "Quantization",
      "Pruning",
      "Deployment on Embedded Systems"
    ],
    "duration": "3-4 weeks",
    "courses_courses": [
      "https://www.coursera.org/learn/introduction-to-embedded-machine-learning",
      "https://www.edx.org/course/tinyml-introduction-to-machine-learning-on-edge"
    ],
    "projects_to_do": [
      "Deploy a model on a Raspberry Pi",
      "Optimize a model for a microcontroller"
    ],
    "outcome_of_learning_30_words": "Learn how to deploy machine learning models on edge devices with limited resources. Develop skills in model optimization and embedded systems programming."
  },
  {
    "id": 5,
    "topic": "Graph Neural Networks (GNNs)",
    "subtopics": [
      "Graph Convolutional Networks (GCNs)",
      "Graph Attention Networks (GATs)",
      "Applications of GNNs",
      "Working with Graph Data"
    ],
    "duration": "4-6 weeks",
    "courses_courses": [
      "https://www.coursera.org/learn/graph-neural-networks",
      "https://www.coursera.org/learn/representation-learning-with-graphs"
    ],
    "projects_to_do": [
      "Build a node classification model",
      "Implement a link prediction algorithm"
    ],
    "outcome_of_learning_30_words": "Understand the principles of graph neural networks and their applications to various domains. Gain experience in working with graph data and building GNN models."
  },
  {
    "id": 6,
    "topic": "AI Ethics and Fairness",
    "subtopics": [
      "Bias Detection",
      "Bias Mitigation",
      "Fairness Metrics",
      "Ethical Considerations"
    ],
    "duration": "3-4 weeks",
    "courses_courses": [
      "https://www.coursera.org/learn/ai-ethics",
      "https://www.coursera.org/learn/trustworthy-machine-learning"
    ],
    "projects_to_do": [
      "Analyze a dataset for bias",
      "Implement a bias mitigation technique"
    ],
    "outcome_of_learning_30_words": "Learn about the ethical challenges in AI and develop skills in detecting and mitigating bias in machine learning models. Understand the importance of fairness and accountability in AI."
  }
]
});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://3.108.217.83:5000/recommend_roles",data);
                setData(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        if(data) fetchData();
    }, [data]);
    
  const router = useRouter();
  const handleClick = (data:any) => {
    const query = encodeURIComponent(JSON.stringify(data));
    router.push(`/content?data=${query}`);
};


    if(!output) return <div className="text-black text-center">Loading....</div>;
    return ( 
        <div  className="flex  rounded  bg-black  border-2  items-center justify-center h-screen">
            <div  className="w-1/3  h-full bg-black flex flex-col items-center justify-center">
                <div onClick={() => handleClick(output.answer[0])} className="rounded-2xl bg-white flex flex-col gap-8 p-4 hover:bg-black hover:text-white duration-500 transition-all border  border-black h-2/3 w-full">
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
                <div onClick={() => handleClick(output.answer[1])} className="rounded-2xl bg-white  p-4 flex flex-col gap-4 hover:bg-black hover:text-white duration-500 transition-all border-black h-1/3 w-full ">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[1].topic}</div>
                <div>
                    <div className=" font-tripSansMono font-bold text-3xl">Outcome</div>
                    <div className="font-tripSansMono">{output.answer[0].outcome_of_learning_30_words}</div>
                    </div>
                </div>
            </div>
            <div  className="w-1/3   h-full  bg-black flex flex-col items-center justify-center">
                <div onClick={() => handleClick(output.answer[2])} className="rounded-2xl bg-white border-black flex flex-col hover:text-white hover:bg-black duration-500 transition-all justify-center border w-full h-1/6 p-4">
                  <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[2].topic}</div>
                </div>
                <div onClick={() => handleClick(output.answer[3])} className="rounded-2xl bg-white hover:text-white hover:bg-black duration-500 transition-all border-black border p-4 gap-8 flex flex-col  w-full h-4/6">
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
                <div onClick={() => handleClick(output.answer[4])} className="rounded-2xl bg-white border-black flex flex-col hover:text-white hover:bg-black duration-500 transition-all justify-center border w-full h-1/6 p-4">
                  <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[4].topic}</div>
                </div>
            </div>
            <div className="w-1/3  h-full  flex  bg-black  flex-col items-center justify-center">
                <div onClick={() => handleClick(output.answer[5])} className="rounded-2xl  flex flex-col gap-8 p-4 duration-500 transition-all hover:text-white hover:bg-black  bg-white w-full h-4/5 border-black border">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{output.answer[5].topic}</div>
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

export default Hello;