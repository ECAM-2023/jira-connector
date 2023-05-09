import http from "../http-common";
import IJiraWorklogData from "../types/jira_worklog.type";

class JiraWorklogDataService {
    getAll() {
        return http.get<Array<IJiraWorklogData>>("/jira/issue/worklog");
    }

    get(id: string) {
        return http.get<IJiraWorklogData>(`/jira/issue/worklog/${id}`);
    }

    create(data: IJiraWorklogData) {
        return http.post<IJiraWorklogData>("/jira/issue/worklog", data);
    }

    update(data: IJiraWorklogData, id: any) {
        return http.put<any>(`/jira/issue/worklog/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/jira/issue/worklog/${id}`);
    }
    
    findByIssueId(issue_id: string) {
        return http.get(`/jira/issue/worklog?issue_id_like=${issue_id}`);
    }
}

export default new JiraWorklogDataService();
