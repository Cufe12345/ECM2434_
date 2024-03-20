import datetime
from .models import Quest
from .models import QuestSubmission
import random

def update_quest_daily():
    # Find all quests with state set to 1
    active_quests = Quest.objects.filter(state=1)
    random_quest = None

    curr_quest = active_quests[0]

    # If there are any, set their state to 0
    if active_quests:
        for quest in active_quests:
            quest.state = 0
            quest.save()

    # Find all quests and select a random one to set to state 1
    all_quests = list(Quest.objects.all())
    if all_quests:  # Check for at least 1 quest
        while random_quest == None or random_quest == curr_quest:
            random_quest = random.choice(all_quests)

        random_quest.state = 1
        random_quest.save()
        return random_quest
    else:
        return "No quests found"
    
def checkStreak(userId):
    userSubmission = QuestSubmission.objects.filter(user=userId)
    # Find the latest user submission
    latest_submission = QuestSubmission.objects.filter(user=userId).order_by('date-created').first()
    
    # Check if the latest submission was submitted yesterday
    if latest_submission and latest_submission.submission_date.date() == datetime.date.today() - datetime.timedelta(days=1):
        # Do something if the latest submission was submitted yesterday
        # ...
        pass
    else:
        # Do something else if the latest submission was not submitted yesterday
        # ...
        pass
    
    return "Checked streak status"