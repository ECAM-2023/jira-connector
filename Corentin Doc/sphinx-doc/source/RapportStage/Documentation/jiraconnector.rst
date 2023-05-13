Jira-Connector
==============

Liste des extensions
--------------------

- "Prettier - Code formatter" : "v9.12.0"
- "Prettier ESLint" : "v5.1.0"
- "Python" : "v2023.8.0"

Liste des packages
------------------

Dans le fichier package.json, on peut voir tous les packages qui vont être rajoutés:

.. code-block::

    "dependencies": {
        "@types/node": "^18.16.1",
        "express": "^4.18.2",
        "winston": "^3.8.2"
    },
    "devDependencies": {
        "@types/body-parser": "^1.19.2",
        "@types/express": "^4.17.17",
        "@typescript-eslint/eslint-plugin": "^5.59.1",
        "axios": "^1.3.6",
        "eslint": "^8.39.0",
        "eslint-config-prettier": "^8.8.0",
        "eslint-plugin-import": "^2.27.5",
        "eslint-plugin-n": "^15.7.0",
        "eslint-plugin-promise": "^6.1.1",
        "typescript": "^5.0.4"
    }

Pour les installer, il suffit de faire la commande :

.. code-block::

    npm install

Requêtes HTTPS
--------------

Pour lancer les requêtes HTTPS, il faut lancer le script nodehttp du fichier package.json avec la commande:

.. code-block::

    npm run nodehttp --atlassianEmail=args1 --atlassianToken=args2 --baseUrl=args3

Il faut remplacer :

- Le args1 par l'email utilisé pour créer le compte attlasian. Ex: nom@gmail.com
- Le args2 par le token créé sur Jira précédement.
- Le args3 par le nom du site atlassian. Ex: https://nomdusite.atlassian.net

Webhook
-------

Pour lancer le webhook sur le port 3000, il faut exécuter la commande suivante pour lancer le script du webhook présent dans le fichier package.json:

.. code-block::

    npm run node

Pour recevoir les events sur le port 3000 en localhost, l'API ngrok va être utilisé pour pouvoir avoir une
adresse publique que l'on utilise comme URL de callback dans la programmation du webhook sur Jira.
Pour obtenir une adresse publique temporaire, il faut lancer la commande suivante en powershell : 

.. code-block::

    ngrok http 3000

| Ce qui va faire le lien entre l'adresse publique de ngrok et le port 3000 en localhost.
| Pour plus d'info sur la création du webhook sur jira, aller voir la partie "webhook de la documentation".