import React, { useEffect, useState } from 'react';
import { getCurrentYear, getDayOfYear, getDaysInYear } from '../utils/date';
import { getRandomQuote, getStreakMessage } from '../utils/quotes';

const Dashboard = ({ tasks, habits }) => {
  const [quote, setQuote] = useState(getRandomQuote());
  const [showConfetti, setShowConfetti] = useState(false);
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const completedHabitsToday = habits.filter(habit => habit.completedToday).length;
  const totalHabits = habits.length;
  
  const currentStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);  
  const resolutionScore = Math.round(
    ((completedTasks + (completedHabitsToday * 7)) / (tasks.length + (totalHabits * 7))) * 100 || 0
  );
  
  const dayOfYear = getDayOfYear();
  const totalDays = getDaysInYear();
  const yearProgress = (dayOfYear / totalDays) * 100;
  
  const currentYear = getCurrentYear();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setQuote(getRandomQuote());
    }, 30000); // Change quote every 30 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Check for celebration triggers
    const hasNewStreak = habits.some(h => h.streak >= 7 && h.streak % 7 === 0);
    const hasPerfectDay = completedHabitsToday === totalHabits && totalHabits > 0;
    
    if (hasNewStreak || hasPerfectDay) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [habits, completedHabitsToday, totalHabits]);
  
  return (
    <>
      {showConfetti && Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}vw`,
            background: `hsl(${Math.random() * 360}, 100%, 60%)`,
            animationDelay: `${Math.random() * 1}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0'
          }}
        />
      ))}
      
      <div className="year-progress-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            {currentYear} Progress
          </h3>
          <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
            Day {dayOfYear} of {totalDays}
          </span>
        </div>
        <div className="year-progress-bar">
          <div 
            className="year-progress-fill" 
            style={{ width: `${yearProgress}%` }}
          />
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
          {Math.round(yearProgress)}% of the year completed
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-title">Resolution Score</div>
          <div className="card-value" style={{ color: 'var(--primary)' }}>
            {resolutionScore}%
          </div>
          <div className="card-subtitle">
            Based on task completion and daily habits
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-title">Tasks</div>
          <div className="card-value">{tasks.length}</div>
          <div className="card-subtitle">
            {completedTasks} completed • {pendingTasks} pending
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-title">Today's Habits</div>
          <div className="card-value">{completedHabitsToday}/{totalHabits}</div>
          <div className="card-subtitle">
            {completedHabitsToday === totalHabits && totalHabits > 0 ? 'Perfect day! 🎯' : 'Keep going!'}
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-title">Current Streak</div>
          <div className="card-value">
            <span className="streak-fire">🔥</span> {currentStreak} days
          </div>
          <div className="card-subtitle">
            {getStreakMessage(currentStreak)}
          </div>
        </div>
        
        <div className="motivation-card">
          <div className="card-title">Daily Motivation</div>
          <div className="motivation-quote">
            <span className="quote-icon">❝</span>
            {quote.text}
            <span className="quote-icon">❞</span>
          </div>
          <div className="motivation-author">— {quote.author}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;