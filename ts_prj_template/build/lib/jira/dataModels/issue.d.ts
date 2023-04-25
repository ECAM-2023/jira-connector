export interface TopLevel {
    level: string;
    message: string;
    timestamp: number;
    webhookEvent: string;
    worklog: Worklog;
}
export interface Worklog {
    author: Author;
    comment: string;
    created: string;
    id: string;
    issueId: string;
    self: string;
    started: string;
    timeSpent: string;
    timeSpentSeconds: number;
    updateAuthor: Author;
    updated: string;
}
export interface Author {
    accountId: string;
    accountType: string;
    active: boolean;
    avatarUrls: {
        [key: string]: string;
    };
    displayName: string;
    self: string;
    timeZone: string;
}
