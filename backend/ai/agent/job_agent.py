import re
import requests
from markdownify import markdownify
from requests.exceptions import RequestException
from smolagents import tool, CodeAgent, ToolCallingAgent, HfApiModel, ManagedAgent, DuckDuckGoSearchTool

model_id = "Qwen/Qwen2.5-Coder-32B-Instruct"

@tool
def visit_webpage(url: str) -> str:
    """Visits a webpage at the given URL and returns its content as a markdown string.

    Args:
        url: The URL of the webpage to visit.

    Returns:
        The content of the webpage converted to Markdown, or an error message if the request fails.
    """
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Convert the HTML content to Markdown
        markdown_content = markdownify(response.text).strip()

        # Remove multiple line breaks
        markdown_content = re.sub(r"\n{3,}", "\n\n", markdown_content)

        return markdown_content

    except RequestException as e:
        return f"Error fetching the webpage: {str(e)}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"
    

@tool
def extract_links(markdown_content: str) -> list[str]:
    """Extracts the links from a Markdown-formatted text.

    Args:
        markdown_content: The Markdown-formatted text to extract links from.

    Returns:
        A list of URLs found in the text.
    """
    # Use a regular expression to find all URLs in the text
    urls = re.findall(r"\[.*?\]\((.*?)\)", markdown_content)

    return urls

def find_job_openings(role: str, experience_level: str) -> list[str]:
    """Finds the latest job openings for a given role and experience level.

    Args:
        role: The job role to search for.
        experience_level: The experience level required for the job.

    Returns:
        A list of URLs for the job openings.
    """
    model = HfApiModel(model_id)

    manager_agent = CodeAgent(
        tools=[DuckDuckGoSearchTool()],
        model=model,
        managed_agents=[extract_links],
        additional_authorized_imports=["time", "numpy", "pandas"],
    )

    query = f"Give me the latest job openings in India for the following role with {experience_level} experience: {role}. Return the links for the job openings."
    
    answer = manager_agent.run(query)

    return answer

