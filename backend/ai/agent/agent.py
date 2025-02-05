from smolagents import (
    CodeAgent,
    ToolCallingAgent,
    HfApiModel,
    ManagedAgent,
    DuckDuckGoSearchTool,
    LiteLLMModel,
)
from markdownify import markdownify
from requests.exceptions import RequestException
from smolagents import tool
from dotenv import load_dotenv
from tools.web import visit_webpage, get_links_from_markdown
import os

load_dotenv()

model= LiteLLMModel(
    model_id='gemini/gemini-1.5-flash',
    api_key=os.getenv("GOOGLE_GEN_AI")
)

# model_id = "Qwen/Qwen2.5-Coder-32B-Instruct"
# model = HfApiModel(model_id)



web_agent = ToolCallingAgent(
    tools=[DuckDuckGoSearchTool(), visit_webpage, get_links_from_markdown],
    model=model,
)

managed_web_agent = ManagedAgent(
    agent=web_agent,
    name="search",
    description="Runs web searches for you. Give it your query as an argument.",
)

manager_agent = CodeAgent(
    tools=[],
    model=model,
    managed_agents=[managed_web_agent,visit_webpage],
    additional_authorized_imports=["time", "numpy", "pandas","json"],
)

## Rough Draft of the resume( The  parsed resume will be passed to the function)
# Resume ={
#     "skills": ["Python", "Machine Learning", "Data Science"],
#     "experience": "3 years",
#     "education": "Bachelor's degree in Computer Science",
#     "tech_stack": ["Python", "TensorFlow", "Scikit-learn"],
# }

answer_format = [
    {
        "id":1,
        "topic":"Python",
        "subtopics":["Data Types","Control Structures","Functions","Classes"],
        "expected_duration":"3-4 weeks",
        "courses_links":["https://www.codecademy.com/learn/learn-python-3","https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/"],
        "documentaion_links":["https://www.youtube.com/watch?v=rfscVS0vtbw","https://www.youtube.com/watch?v=rfscVS0vtbw"],
        "outcome_of_learning_30_words":"You will be able to write clean and efficient code in Python and understand the basics of programming.",
    }
]


async def create_roadmap(resume:str, role:str):
    answer= manager_agent.run(f'''For this {resume} create a roadmap to become a {role} , make sure not to add topics that the user had already covered.Research about the current trends and then create the roadmap from web.Have 6 topics.Follow the following format for the answer {answer_format}. Just make sure to add the links to the courses and youtube videos and return only the answer in the required format''')
    print(answer)

    return answer