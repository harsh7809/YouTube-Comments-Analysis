import requests
from textblob import TextBlob

def analyze_comments(VIDEO_URL):
    API_KEY = 'Enter your Api-key'
    video_id = VIDEO_URL.split('v=')[1]
    url = f'https://www.googleapis.com/youtube/v3/commentThreads?key={API_KEY}&part=snippet&videoId={video_id}'

    comments = []
    while url:
        response = requests.get(url)
        data = response.json()

        for item in data['items']:
            comments.append(item['snippet']['topLevelComment']['snippet']['textOriginal'])

        if 'nextPageToken' in data:
            next_page_token = data['nextPageToken']
            url = f'{url}&pageToken={next_page_token}'
        else:
            url = None

    return comments

def analyze_sentiment(comments):
    positives = 0
    negatives = 0
    neutrals = 0
    for comment in comments:
        sentiment = TextBlob(comment).sentiment.polarity
        if sentiment > 0:
            positives += 1
        elif sentiment < 0:
            negatives += 1
        else:
            neutrals += 1
    total = len(comments)
    positivity = (positives / total) * 100
    negativity = (negatives / total) * 100
    neutralty = (neutrals / total) * 100
    return round(positivity, 1), round(negativity, 1), round(neutralty, 1)
    
