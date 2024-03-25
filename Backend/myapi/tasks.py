import datetime

from django.shortcuts import get_object_or_404
from .models import Quest
from .models import QuestSubmission
from .models import UserProfile as User
from django.utils import timezone
import random


def update_quest_daily():
    now = timezone.now()
    # Find all quests with state set to 1
    active_quests = Quest.objects.filter(state=1)
    print(f"Active quests: {active_quests}")
    random_quest = None
    print("HJSAJSIIPIZZAS")
    if(len(active_quests) == 0):
        print("no active")
        all_quests = list(Quest.objects.all())
        if all_quests:  # Check for at least 1 quest
            curr_quest = all_quests[0]
        else:
            return None

    # If there are any, set their state and active date to 0
    if active_quests and len(active_quests) > 0:
        curr_quest = active_quests[0]
        print(curr_quest.locationID)
        for quest in active_quests:
            quest.state = 0
            quest.date_made_active = None
            quest.save()
        print("Quests reset")
    # Find all quests and select a random one to set to state 1
    all_quests = list(Quest.objects.all())
    print(f"All quests: {all_quests}")
    if all_quests:  # Check for at least 1 quest
        print("Seeking new random quest")
        while random_quest == None or random_quest == curr_quest:
            random_quest = random.choice(all_quests)

        random_quest.state = 1
        random_quest.date_made_active = now.replace(hour=0, minute=0, second=0, microsecond=0)
        print(random_quest)
        random_quest.save()
        return random_quest
    else:
        return "No quests found"
    
def check_streak(userId):
    # Find the latest user submission
    latest_submission = QuestSubmission.objects.filter(user=userId).order_by('date_created').first()
    # Check if the latest submission was submitted before yesterday
    if latest_submission and latest_submission.date_created.date() < timezone.now().date() - datetime.timedelta(days=1):
        user = User.objects.get(id=userId)
        user.streak = 0
        user.save()
        return 0
    # Previous submission is valid
    elif latest_submission and latest_submission.verified == True:
        return 1
    # Do nothing (no previous submission / submission not verified)
    return 1

def update_streak(userId):
    check_outcome = check_streak(userId)
    if check_outcome == 1:
        user = get_object_or_404(User, id=userId)
        print(f"User streak: {user.streak}")
        return user.streak+1
        user.streak += 1
        user.save()
    else:
        return 0
    return "Streak updated"