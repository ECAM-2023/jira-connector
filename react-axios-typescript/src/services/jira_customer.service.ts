import http from "../http-common";
import IJiraCustomerData from "../types/jira_customer.type";

class JiraCustomerDataService {
    getAll() {
        return http.get<Array<IJiraCustomerData>>("/jira/customer");
    }

    get(id: string) {
        return http.get<IJiraCustomerData>(`/jira/customer/${id}`);
    }

    create(data: IJiraCustomerData) {
        return http.post<IJiraCustomerData>("/jira/customer", data);
    }

    update(data: IJiraCustomerData, id: any) {
        return http.put<any>(`/jira/customer/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/jira/customer/${id}`);
    }
    
    findByAccountId(accountId: string) {
        return http.get(`/jira/customer?accountId_like=${accountId}`);
    }
}

export default new JiraCustomerDataService();
