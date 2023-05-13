Postman
=======

Méthode de connexion
--------------------

API token
^^^^^^^^^

Vu que nous voulons récupérer les users, il faut tout d'abord créer un API token sur `Jira <https://id.atlassian.com/manage-profile/security/api-tokens>`_.
Un fois cette étape réalisée, il faut choisir comme type d'Authorization "Basic Auth" et utiliser le token précédemment créé avec l'adresse mail utilisée
lors de la création du compte Atlassian.

OAuth 2.0
^^^^^^^^^

Pour pouvoir utiliser la connexion en OAuth 2.0, il faut d'abord aller sur `Atlassian Developer <https://developer.atlassian.com/>`_. 
Ensuite, cliquer sur le profil et choisir 'developer console'.
On crée une nouvelle app en OAuth 2.0. Un fois cela réalisé, il faudra encore donner les permissions. Voici les permissions pour jira service management que nous avons données:

.. code-block::

    read:jira-work
    manage:jira-project
    manage:jira-configuration
    read:jira-user
    write:jira-work
    manage:jira-webhook
    manage:jira-data-provider

    read:servicedesk-request
    manage:servicedesk-customer
    write:servicedesk-request
    read:servicemanagement-insight-objects

Un fois que les Classics scopes sont configurés, il nous reste à configurer les Granulars Scopes : 

.. code-block::

    read:application-role:jira
    read:audit-log:jira
    read:user:jira
    read:customer:jira-service-management
    read:organization:jira-service-management
    read:servicedesk:jira-service-management
    read:requesttype:jira-service-management
    read:queue:jira-service-management
    read:request:jira-service-management

| Maintenant pour confirmer et appliquer ces permissions, il faut aller dans Authorization et copier chacun des liens avant de les exécuter.
| Et finalement il ne reste plus qu'à aller dans les Settings pour récupérer le "Client ID" et "Secret".
| Dans postman, il faut choisir comme type d'Authorization "OAuth 2.0" et Configurer un nouveau token en remplissant les champs suivants : 

.. code-block::

    Token Name: nom du token(au choix)
    Grant Type: Client Credentials
    Access Token URL: https://auth.atlassian.com/oauth/token
    Client ID: client ID (récupérer précédemment)
    Client Secret: secret (récupérer précédemment)
    Scope: (pas besoin déjà défini dans Atlassian developer)
    Client Authentication: Send as Basic Auth header

Ce qui va nous permettre d'obtenir un token d'une validité d'une heure.
| Il va aussi nous falloir récupérer le cloud ID. Ce qui est réalisé avec le token récupéré précédemment, il faut faire un GET à l'URL suivant:

.. code-block::

    https://api.atlassian.com/oauth/token/accessible-resources

Et l'id indiqué sera votre cloud id. Il ne vous reste plus qu'à utiliser les commandes en OAuth 2.0 pour faire vos requests.


Dev environment
---------------

Permet de stocker toutes les valeurs que l'on va utiliser dans nos requests comme par exemple : Username, APItoken, clientID, clientSecret, ...


