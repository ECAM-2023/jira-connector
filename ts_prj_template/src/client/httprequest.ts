import axios, { AxiosResponse } from 'axios';
import { Oauth2 } from '../lib/jira/dataModels/authentification';
import { User } from '../lib/jira/dataModels/users';
import { Organization } from '../lib/jira/dataModels/organization';
import { Customer } from '../lib/jira/dataModels/customer';

let auth: Oauth2 = {
    clientID: 'nr3DZPJ129vipN5AwMPBiAk0AZDBIs0I',
    clientSecret:
        'ATOAa7cwLZ80GoDvHTBInIjh-IJgKrndrYA7ubmF-Km46tb1QiNKxJGBwv3SvFFoL4HJC8918369',
    accessToken: '',
    cloudID: '',
    expiresIn: 1,
};

let users: User[] = [];
let organizations: Organization[] = [];
let customers: Customer[] = [];

const apiUrlCloudID =
    'https://api.atlassian.com/oauth/token/accessible-resources';

// Obtenir un nouveau token d'accès à partir des "Client Credentials"
(async (): Promise<void> => {
    const responseAccessToken: AxiosResponse = await axios.post(
        'https://api.atlassian.com/oauth/token',
        null,
        {
            params: {
                grant_type: 'client_credentials',
                client_id: auth.clientID,
                client_secret: auth.clientSecret,
            },
        },
    );
    auth.expiresIn = responseAccessToken.data.expires_in;
    auth.accessToken = responseAccessToken.data.access_token;
    const responseApiCloudID: AxiosResponse = await axios.get(apiUrlCloudID, {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    });
    auth.cloudID = responseApiCloudID.data[0].id;

    // const responseUser: AxiosResponse = await axios.get(
    //     `https://api.atlassian.com/ex/jira/${auth.cloudID}/rest/api/3/users/search?startAt=0&maxResults=50`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${auth.accessToken}`,
    //         },
    //     },
    // );

    // for (let i = 0; i < responseUser.data.length; i++) {
    //     let utilisateur: User = {
    //         accountId: responseUser.data[i].accountId,
    //         accountType: responseUser.data[i].accountType,
    //         emailAddress: responseUser.data[i].emailAddress,
    //         displayName: responseUser.data[i].displayName,
    //     };
    //     axios.post('http://localhost:8080/api/v1/jira/', {
    //         accountId: responseUser.data[i].accountId,
    //         accountType: responseUser.data[i].accountType,
    //         emailAddress: responseUser.data[i].emailAddress,
    //         displayName: responseUser.data[i].displayName,
    //     });
    //     users.push(utilisateur);
    // }
    // axios.post('http://localhost:8080/api/v1/jira/', users).then(response => {
    //     console.log(response);
    // });
    //   const response: AxiosResponse = await axios.post(
    //     "localhost:8080/api/v1/jira/",
    //     {
    //       params,
    //     }
    //   );
    //console.log(users);

    const responseOrganization: AxiosResponse = await axios.get(
        `https://api.atlassian.com/ex/jira/${auth.cloudID}/rest/servicedeskapi/organization`,
        {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        },
    );

    for (let i = 0; i < responseOrganization.data.values.length; i++) {
        let organization: Organization = {
            organizationID: responseOrganization.data.values[i].id,
            name: responseOrganization.data.values[i].name,
        };

        //post customer
        axios.post('http://10.1.100.244:8080/api/v1/jira/organization/', {
            organizationID: responseOrganization.data.values[i].id,
            name: responseOrganization.data.values[i].name,
        });

        organizations.push(organization);
    }
    //console.log(organizations);

    for (let i = 0; i < organizations.length; i++) {
        let organizationId = organizations[i].organizationID;
        const responseOrganizationCustomer: AxiosResponse = await axios.get(
            `https://api.atlassian.com/ex/jira/${auth.cloudID}/rest/servicedeskapi/organization/${organizationId}/user`,
            {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            },
        );
        for (
            let j = 0;
            j < responseOrganizationCustomer.data.values.length;
            j++
        ) {
            let customer: Customer = {
                accountId:
                    responseOrganizationCustomer.data.values[j].accountId,
                accountType: 'customer',
                emailAddress:
                    responseOrganizationCustomer.data.values[j].emailAddress,
                displayName:
                    responseOrganizationCustomer.data.values[j].displayName,
            };

            const found = customers.find(obj => {
                return obj.displayName === customer.displayName;
            });
            if (found) {
            } else {
                axios.post('http://10.1.100.244:8080/api/v1/jira/customer/', {
                    accountId:
                        responseOrganizationCustomer.data.values[j].accountId,
                    accountType: 'customer',
                    emailAddress:
                        responseOrganizationCustomer.data.values[j]
                            .emailAddress,
                    displayName:
                        responseOrganizationCustomer.data.values[j].displayName,
                });
            }
            axios.post('http://10.1.100.244:8080/api/v1/jira/viewco/', {
                accountId:
                    responseOrganizationCustomer.data.values[j].accountId,
                organizationID: organizationId,
            });
        }
    }

    // console.log(JSON.stringify(customers));

    // console.log(JSON.stringify(users));
})();
