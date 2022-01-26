type NotificationType = 'error' | 'warn' | 'success';

export interface Notification {
    message: string,
    type: NotificationType
}
