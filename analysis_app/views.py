from django.shortcuts import render
from .analysis_script import analyze_comments,analyze_sentiment

def analysis(request):
    if request.method == 'POST':
        video_url = request.POST.get('video_url')       
        comments = analyze_comments(video_url)
        Length=len(comments)
        positives, negatives, neutrals = analyze_sentiment(comments)
        
        context = {
        'Length': Length,
        'video_url' : video_url, 
        'positivity': positives,
        'negativity': negatives,
        'neutralty': neutrals
                   }
        return render(request, 'home.html',context)
    return render(request, 'home.html')