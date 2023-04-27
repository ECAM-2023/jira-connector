import http from "../http-common";
import IJiraUserData from "../types/jira_user.type";

class JiraUserDataService {
    getAll() {
        return http.get<Array<IJiraUserData>>("/jira/user");
    }

    get(id: string) {
        return http.get<IJiraUserData>(`/jira/user/${id}`);
    }

    create(data: IJiraUserData) {
        return http.post<IJiraUserData>("/jira/user", data);
    }

    update(data: IJiraUserData, id: any) {
        return http.put<any>(`/jira/user/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/jira/user/${id}`);
    }
    
    findByAccountId(accountId: string) {
        return http.get(`/jira/user?accountId_like=${accountId}`);
    }
}

export default new JiraUserDataService();
