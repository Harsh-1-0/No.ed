import requests
import os
from collections import Counter
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

def get_repositories(username):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        data = response.json()
        return [
            {
                "name": repo["name"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "language": repo["language"],
                "topics": repo.get("topics", []),
                "description": repo["description"] if repo["description"] else "No description",
            }
            for repo in data
        ]
    else:
        print(f"Error fetching repositories: {response.status_code}")
        return []

def get_commit_history(username):
    url = f"https://api.github.com/users/{username}/events"
    response = requests.get(url, headers=HEADERS)
    commits, commit_types, commit_dates = [], Counter(), []

    if response.status_code == 200:
        data = response.json()
        for event in data:
            if event["type"] == "PushEvent":
                for commit in event["payload"]["commits"]:
                    commits.append({
                        "repo": event["repo"]["name"],
                        "message": commit["message"],
                        "timestamp": event["created_at"]
                    })
                    commit_dates.append(event["created_at"][:10])
                    
                    msg = commit["message"].lower()
                    if "fix" in msg:
                        commit_types["Bug Fix"] += 1
                    elif "add" in msg or "new" in msg:
                        commit_types["Feature Addition"] += 1
                    elif "refactor" in msg:
                        commit_types["Refactoring"] += 1
                    elif "test" in msg or "unit" in msg:
                        commit_types["Testing"] += 1
                    elif "docs" in msg or "readme" in msg:
                        commit_types["Documentation"] += 1
                    else:
                        commit_types["General"] += 1

    return commits, commit_types, commit_dates

def get_issue_pr_data(username):
    url = f"https://api.github.com/search/issues?q=author:{username}"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        data = response.json()
        issues_prs = {"issues_opened": 0, "prs_opened": 0, "prs_merged": 0}
        
        for item in data.get("items", []):
            if "pull_request" in item:
                if item["state"] == "open":
                    issues_prs["prs_opened"] += 1
                else:
                    issues_prs["prs_merged"] += 1
            else:
                issues_prs["issues_opened"] += 1

        return issues_prs
    else:
        print(f"Error fetching issues and PRs: {response.status_code}")
        return {}

def get_organizations(username):
    url = f"https://api.github.com/users/{username}/orgs"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        return [org["login"] for org in response.json()]
    else:
        print(f"Error fetching organizations: {response.status_code}")
        return []

def analyze_commit_patterns(commit_dates):
    date_counts = Counter(commit_dates)
    return sorted(date_counts.items(), key=lambda x: x[0])[-10:]

def main():
    username = input("Enter GitHub username: ").strip()
    print(f"Fetching details for GitHub user: {username}...\n")

    repos = get_repositories(username)
    print(f"Total Repositories: {len(repos)}")
    for repo in repos[:5]:
        print(f"  - {repo['name']} ({repo['language']}) | Stars: {repo['stars']} | Forks: {repo['forks']}")
        print(f"    Topics: {', '.join(repo['topics']) if repo['topics'] else 'None'}")
        print(f"    Description: {repo['description']}\n")

    commits, commit_types, commit_dates = get_commit_history(username)
    print(f"Total Commits Analyzed: {len(commits)}")
    for key, value in commit_types.items():
        print(f"  - {key}: {value}")

    print("Commit Patterns:")
    for date, count in analyze_commit_patterns(commit_dates):
        print(f"  {date}: {count} commits")

    issues_prs = get_issue_pr_data(username)
    print(f"\nIssues & PRs:")
    print(f"  - Issues Opened: {issues_prs['issues_opened']}")
    print(f"  - PRs Opened: {issues_prs['prs_opened']}")
    print(f"  - PRs Merged: {issues_prs['prs_merged']}")

    orgs = get_organizations(username)
    print(f"\nOrganizations: {', '.join(orgs) if orgs else 'None'}")

if __name__ == "__main__":
    main()
