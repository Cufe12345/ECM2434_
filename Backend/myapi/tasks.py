import datetime
from .models import Quest
from .models import QuestSubmission
from .models import UserProfile as User
import random

def update_quest_daily():
    # Find all quests with state set to 1
    active_quests = Quest.objects.filter(state=1)
    random_quest = None
    print("HJSAJSIIPIZZAS")
    if(len(active_quests) == 0):
        all_quests = list(Quest.objects.all())
        if all_quests:  # Check for at least 1 quest
            curr_quest = all_quests[0]
        else:
            return None

    # If there are any, set their state and active date to 0
    if active_quests and len(active_quests) > 0:
        curr_quest = active_quests[0]
        for quest in active_quests:
            quest.state = 0
            quest.date_made_active = None
            quest.save()
    # Find all quests and select a random one to set to state 1
    all_quests = list(Quest.objects.all())
    if all_quests:  # Check for at least 1 quest
        while random_quest == None or random_quest == curr_quest:
            random_quest = random.choice(all_quests)

        random_quest.state = 1
        random_quest.date_made_active = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        random_quest.save()
        return random_quest
    else:
        return "No quests found"
    
def check_streak(userId):
    # Find the latest user submission
    latest_submission = QuestSubmission.objects.filter(user=userId).order_by('date_created').first()
    
    # Check if the latest submission was submitted before yesterday
    if latest_submission and latest_submission.submission_date.date() < datetime.date.today() - datetime.timedelta(days=1):
        user = User.objects.get(id=userId)
        user.streak = 0
        user.save()
        return 0
    # Previous submission is valid
    elif latest_submission and latest_submission.verified == True:
        return 1
    # Do nothing (no previous submission / submission not verified)
    return 0

def update_streak(userId):
    check_outcome = check_streak(userId)
    if check_outcome == 1:
        user = User.objects.get(id=userId)
        user.streak += 1
        user.save()
    else:
        pass
    return "Streak updated"