import http from "../http-common";
import IJiraIssueData from "../types/jira_issue.type";

class JiraIssueDataService {
    getAll() {
        return http.get<Array<IJiraIssueData>>("/jira/issue");
    }

    get(id: string) {
        return http.get<IJiraIssueData>(`/jira/issue/${id}`);
    }

    create(data: IJiraIssueData) {
        return http.post<IJiraIssueData>("/jira/issue", data);
    }

    update(data: IJiraIssueData, id: any) {
        return http.put<any>(`/jira/issue/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/jira/issue/${id}`);
    }
    
    findByIssueId(issue_id: string) {
        return http.get(`/jira/issue?issue_id_like=${issue_id}`);
    }
}

export default new JiraIssueDataService();
