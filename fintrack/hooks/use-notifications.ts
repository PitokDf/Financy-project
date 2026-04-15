import { useState, useCallback, useEffect } from 'react';
import axiosClient from '@/lib/api/client';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BUDGET_ALERT' | 'PATTERN_FOUND' | 'ACHIEVEMENT' | 'LEVEL_UP' | 'REMINDER' | 'STREAK_WARNING' | 'CHALLENGE_COMPLETE';
  isRead: boolean;
  metadata?: any;
  createdAt: string;
  readAt?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get('/notifications');
      setNotifications((response as any).data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await axiosClient.get('/notifications/unread-count');
      setUnreadCount((response as any).data.count);
    } catch (error) {
      console.error('Failed to fetch unread count', error);
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axiosClient.patch(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosClient.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await axiosClient.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    isLoading,
    refresh: fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
