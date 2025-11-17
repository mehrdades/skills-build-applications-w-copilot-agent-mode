from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Marvel')
        self.user = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=self.team)
        self.workout = Workout.objects.create(name='Web Swing', description='Swing through the city')
        self.workout.suggested_for.add(self.team)
        self.activity = Activity.objects.create(user=self.user, type='Swing', duration=30)
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=100)

    def test_user_email_unique(self):
        with self.assertRaises(Exception):
            User.objects.create(name='Duplicate', email='spiderman@marvel.com', team=self.team)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Marvel')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Spider-Man')

    def test_activity_str(self):
        self.assertIn('Swing', str(self.activity))

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Web Swing')

    def test_leaderboard_str(self):
        self.assertIn('Marvel', str(self.leaderboard))
