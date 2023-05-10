// Generated by https://quicktype.io

export interface TopLevel {
    comment:      Comment;
    eventType:    string;
    issue:        Issue;
    level:        string;
    message:      string;
    timestamp:    number;
    webhookEvent: string;
}

export interface Comment {
    author:       Author;
    body:         string;
    created:      string;
    id:           string;
    jsdPublic:    boolean;
    self:         string;
    updateAuthor: Author;
    updated:      string;
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

export interface Issue {
    fields: Fields;
    id:     string;
    key:    string;
    self:   string;
}

export interface Fields {
    assignee:  null;
    issuetype: Issuetype;
    priority:  Priority;
    project:   Project;
    status:    Status;
    summary:   string;
}

export interface Issuetype {
    avatarId:       number;
    description:    string;
    hierarchyLevel: number;
    iconUrl:        string;
    id:             string;
    name:           string;
    self:           string;
    subtask:        boolean;
}

export interface Priority {
    iconUrl: string;
    id:      string;
    name:    string;
    self:    string;
}

export interface Project {
    avatarUrls:     { [key: string]: string };
    id:             string;
    key:            string;
    name:           string;
    projectTypeKey: string;
    self:           string;
    simplified:     boolean;
}

export interface Status {
    description:    string;
    iconUrl:        string;
    id:             string;
    name:           string;
    self:           string;
    statusCategory: StatusCategory;
}

export interface StatusCategory {
    colorName: string;
    id:        number;
    key:       string;
    name:      string;
    self:      string;
}
