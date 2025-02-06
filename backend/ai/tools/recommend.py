from google import genai

def get_recommended_roles(api_key, tags):
    prompt = f'''List a few recommended roles that align with 
    the following interests: {tags} and return the list of roles.
    Use this JSON schema:

    Just retrieve the roles and return them as a list and just return a list and nothing else not as a JSON object
    '''
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
    )


    return response