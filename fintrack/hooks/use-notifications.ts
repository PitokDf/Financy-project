import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const { 
    data: notifications = [], 
    isLoading,
    refetch: refresh 
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await axiosClient.get('/notifications');
      return (response as any).data as Notification[];
    },
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: async () => {
      const response = await axiosClient.get('/notifications/unread-count');
      return (response as any).data.count as number;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosClient.patch(`/notifications/${id}/read`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['notifications', 'unreadCount'] });

      const previousNotifications = queryClient.getQueryData<Notification[]>(['notifications']);
      const previousUnreadCount = queryClient.getQueryData<number>(['notifications', 'unreadCount']);

      queryClient.setQueryData<Notification[]>(['notifications'], old => 
        old?.map(n => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
      
      const notification = previousNotifications?.find(n => n.id === id);
      if (notification && !notification.isRead) {
        queryClient.setQueryData<number>(['notifications', 'unreadCount'], old => Math.max(0, (old || 0) - 1));
      }

      return { previousNotifications, previousUnreadCount };
    },
    onError: (err, id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(['notifications', 'unreadCount'], context.previousUnreadCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      await axiosClient.patch('/notifications/read-all');
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['notifications', 'unreadCount'] });

      const previousNotifications = queryClient.getQueryData<Notification[]>(['notifications']);
      const previousUnreadCount = queryClient.getQueryData<number>(['notifications', 'unreadCount']);

      queryClient.setQueryData<Notification[]>(['notifications'], old => 
        old?.map(n => ({ ...n, isRead: true, readAt: new Date().toISOString() }))
      );
      queryClient.setQueryData<number>(['notifications', 'unreadCount'], 0);

      return { previousNotifications, previousUnreadCount };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(['notifications', 'unreadCount'], context.previousUnreadCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosClient.delete(`/notifications/${id}`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['notifications', 'unreadCount'] });

      const previousNotifications = queryClient.getQueryData<Notification[]>(['notifications']);
      const previousUnreadCount = queryClient.getQueryData<number>(['notifications', 'unreadCount']);

      const notificationToDelete = previousNotifications?.find(n => n.id === id);

      queryClient.setQueryData<Notification[]>(['notifications'], old => 
        old?.filter(n => n.id !== id)
      );

      if (notificationToDelete && !notificationToDelete.isRead) {
        queryClient.setQueryData<number>(['notifications', 'unreadCount'], old => Math.max(0, (old || 0) - 1));
      }

      return { previousNotifications, previousUnreadCount };
    },
    onError: (err, id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(['notifications', 'unreadCount'], context.previousUnreadCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  });

  return {
    notifications,
    unreadCount,
    isLoading,
    refresh,
    markAsRead: (id: string) => markAsReadMutation.mutate(id),
    markAllAsRead: () => markAllAsReadMutation.mutate(),
    deleteNotification: (id: string) => deleteNotificationMutation.mutate(id),
  };
}
