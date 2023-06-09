// Generated by https://quicktype.io

export interface TopLevel {
    attachment:   Attachment;
    level:        string;
    message:      string;
    timestamp:    number;
    webhookEvent: string;
}

export interface Attachment {
    author:    Author;
    content:   string;
    created:   string;
    filename:  string;
    id:        string;
    mimeType:  string;
    self:      string;
    size:      number;
    thumbnail: string;
}

export interface Author {
    accountId:   string;
    accountType: string;
    active:      boolean;
    avatarUrls:  { [key: string]: string };
    displayName: string;
    self:        string;
    timeZone:    string;
}
