HTTPS request
=============

Authentication
--------------

Nous avons utilisé OAuth 2.0 pour s'identifier et faire des requêtes sécurisées. 
Il faut premièrement récupérer l'access token avec cette ligne de commande :

.. code-block:: 

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

Ensuite il faut récupérer le cloud ID : 

.. code-block::

        const responseApiCloudID: AxiosResponse = await axios.get(apiUrlCloudID, {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    });

Maintenant que nous avons le cloud ID, nous pouvons faire nos requêtes HTTPS.

Request type
------------

Get users
^^^^^^^^^

Dans src/lib/jira/datamodels, créer un fichier nommé :"users" avec comme code: 

.. code-block:: javascript

    export interface users {
    accountId: number;
    displayName: string;
    accountType: string;
}

Afin de créer une interface qui sera exportée et reprise dans le fichier de requêtes.

Cette ligne de code permet de créer une liste de l'objet "users":

.. code-block:: javascript

    const user: users[] = [];

Nous pourrons ensuite définir leurs valeurs par rapport aux réponses de requêtes. 

Comme ici, nous enregistrons les données reçues de jira dans un objet: 

.. code-block:: javascript

    const responseUser: AxiosResponse = await axios.get(
        `https://api.atlassian.com/ex/jira/${auth.cloudId}/rest/api/3/users/search?startAt=0&maxResults=50`,
        {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        },
    );

    for (let i = 0; i < responseUser.data.length; i++) {
        const User = {
            accountId: responseUser.data[i].accountId,
            displayName: responseUser.data[i].displayName,
            accountType: responseUser.data[i].accountType,
        };
        user.push(User);
    }

    for (let i = 0; i < responseUser.data.length; i++) {
        logger.info('user: ' + user[i].accountId + ' name: ' + user[i].displayName + ' type: ' + user[i].accountType);
    }