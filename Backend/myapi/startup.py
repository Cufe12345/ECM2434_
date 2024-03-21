from django.db.models import Exists, OuterRef
from .models import Quest
import random


def run_startup_check():

    print("Running startup check")

    active_exists = Quest.objects.filter(state=1).exists()

    try:
        # If no active quest, randomly activate one
        if not active_exists:
            all_quests = list(Quest.objects.all())
            if all_quests:  # Make sure there is at least one quest
                random_quest = random.choice(all_quests)
                random_quest.state = 1
                random_quest.save()
                return "Random quest activated"
            else:
                return "No quests to activate"
        else:
            return "Active quest exists"

    except Exception as e: 
        return "Error of type {0} occurred during startup task.\nArguments:\n{1!r}".format(type(e).__name__, e.args)