Typescript
==========

On a créé un nouveau projet "projet-typescript" dans lequel nous avons lancé la commande :

.. code-block::

    npm init

    package name: (projet-typescript)
    version: (1.0.0)
    description:
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author: Maillard Corentin
    license: (ISC)

Cette commande va nous créer un "package.json" avec tous les paramètres encodés précédemment.
A chaque fois que l'on fait un projet typescript il faut exécuter la commande suivante :

.. code-block::
    
    npm install typescript --save-dev


Procédure : 

- Installer la dernière version de Node.js (v18.16.0) en allant sur le site (https://nodejs.org/en) et npm avec la commande "npm install -g npm@9.6.4"
- Créer un nouveau projet appelé "ts_prj_template". On utilise les commandes "npm init" puis "project", et "npm install" pour le setup du projet.
- Installer typescript dans package.json avec la commande "npm install typescript --save-dev"
- Créer un compte sur le site https://www.npmjs.com/
- Configurer eslint avec la commande "npm init @eslint/config"
- Installer Husky avec la commande "npm install husky --save-dev" (https://www.npmjs.com/package/husky) et entrer les commandes indiquées sur le README dans "Usage" (Attention: Il faut avoir fait un git init pour utiliser ces commandes)

.. code-block:: bash

    npm pkg set scripts.prepare="husky install"
    npm run prepare
    npx husky add .husky/pre-commit "npm test"
    git add .husky/pre-commit

- Dans le fichier .husky/pre-commit, modifier la ligne "npm test" par "npm run eslint"
- Rajouter les scripts suivants dans package.json :

.. code-block::

    "eslint": "eslint \"./src/**\"",
    "eslint:fix": "npm run eslint -- --fix",
    "commit": "npx git-cz"

- Créer dans la source un fichier "tsconfig.json" et y mettre les lignes de codes de ce ficher : https://github.com/tsconfig/bases/blob/main/bases/node18.json
- Ajouter dans le fichier ".eslintrc.json" :

.. code-block::

    "parserOptions": {
        ...,
        "project": ["./tsconfig.json"]
    },

- Entrer la commande 'npm run commit' qui va nous permettre de faire un commit avec commitizen
- Après le commit, faire la commande "git push -u origin main" pour le premier push
- Modifier le script "commit" et y ajouter "--disable-emoji" pour retirer les emojis des commits. **"commit": "npx git-cz --disable-emoji"**
- Configurer ESLint avec Prettier en utilisant cette commande : "npm install --save-dev eslint-config-prettier"
- Ajouter un fichier .prettierrc.json avec les paramètres de ce repo "https://github.com/typescript-eslint/typescript-eslint/blob/main/.prettierrc.json"
- Aller dans les paramètres (Ctrl + ,), chercher "format on save" et **enable**, et "format on save mode" sur **file**
  
Maintenant, Prettier devrait fonctionner automatiquement lorsqu'un fichier est sauvegardé.

On peut lancer Prettier sur tous les fichiers avec la commande "npx prettier --write ."

Résumé
------

ESLint
^^^^^^

Intérêt de ESLint:

Configurer le code et l'analyser pour trouver et résoudre les problèmes automatiquement.

Configuration de ESLint:

- Exécuter la commande :
  
.. code-block::
    
    npm init @eslint/config
    
- Ensuite on prend les paramètres : all (écrit style), commonjs, none, yes, browser+node, guide, standard-with-typescript, JSON, yes, npm.

Husky
^^^^^

Intérêt de Husky:

Améliorer les commits et permettre des Gits Hooks.

Configuration de Husky (https://www.npmjs.com/package/husky) :

- Exécuter ces lignes de code (Attention, il faut avoir déjà fait un "git init") :

.. code-block:: bash

    npm pkg set scripts.prepare="husky install"
    npm run prepare
    npx husky add .husky/pre-commit "npm test"
    git add .husky/pre-commit
    git commit -m "Keep calm and commit"

- Modifier la ligne "npm test" dans le fichier .husky/pre-commit et y mettre les scripts qu'on veut lancer. Par exemple "npm run eslint".

Prettier
^^^^^^^^

Intérêt de Prettier:

Formater le code automatiquement pour un gain de temps et d'efficacité.

Configuration de Prettier:

- Utiliser cette commande pour configurer ESLint avec Prettier :

.. code-block:: bash

    npm install --save-dev eslint-config-prettier

- Créer un fichier **.prettierrc.json** (configuration : https://prettier.io/docs/en/configuration.html) et y mettre les paramètres voulus, par exemple :

.. code-block:: bash

    {
    "arrowParens": "avoid",
    "bracketSpacing": true,
    "endOfLine": "lf",
    "bracketSameLine": false,
    "jsxSingleQuote": false,
    "printWidth": 120,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "all",
    "useTabs": false
    }

- Aller dans les paramètres (Ctrl + ,) puis **enable** le paramètre **"format on save"** et mettre **"format on save mode"** sur **file**
- Lancer Prettier avec les commandes :

.. code-block:: bash

    npx prettier --check . # Check all files
    npx prettier --write . # Check all files and fix automatically


Quelques liens 
---------------

| Site qui répertorie toutes les licenses : https://choosealicense.com/licenses/
| Site qui répertorie tous les shields (badges) : https://shields.io/
| Site de npm et ses packages : https://www.npmjs.com/
| Node.js v18.16.0 documentation : https://nodejs.org/dist/latest-v18.x/docs/api/
| Verdaccio : https://verdaccio.org/
| ESLint : https://eslint.org/
| **GitHub Repositories :**

- tsconfig-bases : https://github.com/tsconfig/bases
- Typescript-eslint : https://github.com/typescript-eslint/typescript-eslint
- eslint-config-prettier : https://github.com/prettier/eslint-config-prettier

| **npm registry :**

- https://www.npmjs.com/package/husky
- https://www.npmjs.com/package/axios

Packages
--------

npm-check
^^^^^^^^^^

Source : https://www.npmjs.com/package/npm-check

Intérêt : Vérifie les dépendances obsolètes, incorrectes et inutilisées

Installation :

.. code-block:: bash

    npm install -g npm-check

Utilisation :

.. code-block:: bash

    npm-check
    npm-check <path> <options>

Standard Version
^^^^^^^^^^^^^^^^

Source : https://www.npmjs.com/package/standard-version

Intérêt : Versioning et génération de CHANGELOG

Installation :

.. code-block:: bash

    npm i --save-dev standard-version

Utilisation :

.. code-block:: bash

    # Ajouter un script dans package.json : "release": "standard-version"
    npm run release -- --first-release

License Checker
^^^^^^^^^^^^^^^

Source : https://www.npmjs.com/package/license-checker

Intérêt : Afficher toutes les licenses des modules et leurs dépendances

Installation :

.. code-block:: bash

    npm install -g license-checker

Utilisation :

.. code-block:: bash

    # Ajouter un script dans package.json : "license": "license-checker --csv --production --out ./LICENSE.csv",
    npm install yui-lint
    npm run license

License Report
^^^^^^^^^^^^^^^

Source : https://www.npmjs.com/package/license-report

Intérêt : Générer un rapport de license des dépendances du projet

Installation :

.. code-block:: bash

    npm install -g license-report

Utilisation :

.. code-block:: bash

    # Ajouter un script dans package.json : "license-report": "license-report --output=csv --csvHeaders > ./LICENSE-REPORT.csv"
    npm run license-report

TypeDoc
^^^^^^^

Source : https://www.npmjs.com/package/typedoc

Intérêt : Automatiquement générer de la documentation pour les projets TypeScript

Installation :

.. code-block:: bash

    npm install typedoc --save-dev

Utilisation :

.. code-block:: bash

    typedoc src/index.ts
    npm-check <path> <options>

**Désinstallé car la commande "typedoc" ne fonctionnait pas.**

Suite du projet
---------------

- Ajout du script suivant dans package.json:

.. code-block::

    ...
    "scripts": {
        "build": "tsc -p ."
        ...
    }, ...

Modification de tsconfing.json pour ajouter les lignes suivantes dans le compiler:

.. code-block::

    ...
    "compilerOptions": {
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "outDir": "./build"
        ...
    }, ...

Ces lignes vont permettre de générer des fichiers **".js"**, **".js.map"**, **".d.ts"** et **".d.map"** dans un dossier build en lancant le script "npm run build".

Git Tagging
-----------

Source : https://git-scm.com/book/en/v2/Git-Basics-Tagging

Un tag est une référence vers un point spécifique de l'historique git. Les tags sont généralement utilisés pour une version.

Afficher les tags:

.. code-block:: bash

    git tag
    # Peut prendre un paramère -l ou --list
    git tag -l

Créer un tag:

.. code-block:: bash

    git tag -a 1.0.0 -m "Version 1.0.0"

Supprimer un tag:

.. code-block:: bash

    git tag -d 1.0.0

Création d'un nouveau projet
----------------------------

Maintenant nous allons passer au vrai projet car l'ancien n'était qu'un prototype. L'objectif sera d'accéder à **Jira en OAuth 2.0**.

**Historique de commandes pour la configuration :**

.. code-block:: bash

     # Initialisation du projet avec npm
    npm init

    npm install
    # Installation du package typescript
    npm install typescript --save-dev
    # Installation du package npm-check
    npm install -g npm-check
    # Installation de définitions pour Node.js (réduit certaines erreurs en TypeScript)
    npm i --save-dev @types/node
    # Installation de axios
    npm install axios
    # Installation du package dotenv
    npm install dotenv --save
    # Installation du package simple-oauth2
    npm install simple-oauth2

    # Génère un fichier tsconfig.json
    npx tsc --init 
    # Ensuite configurer le fichier tsconfing.json comme voulu

    # Pour ne plus avoir d'erreur "warning: LF will be replaced by CRLF in ..."
    git config --global core.autocrlf false

    # Installation et configuration de ESLint
    npm init @eslint/config

    # Création du repo GitHub et premier commit
    git init
    git add ...
    git commit -S -m "First commit"
    git branch -M main
    git remote add origin git@github.com:user/repo.git
    git push -u origin main

Configuration du fichier index.ts pour faire une requête GET avec OAuth2:

.. code-block:: typescript

    import axios, { AxiosResponse } from 'axios';

    // Définir les informations d'authentification OAuth2
    const clientId = '911FbCPRN8818PdoJRDpXsT6BQumvgUd';
    const clientSecret = 'ATOA2sBqH-REwCQQqCAzmdoij9yXNeYEViAyWjRdAfnqglNmfkWpUimpqgJuBu5zEsKu0B6E0E76';

    // Définir l'URL de l'API
    const apiUrl = 'https://api.atlassian.com/oauth/token/accessible-resources';

    // Obtenir un nouveau token d'accès à partir des "Client Credentials"
    const getAccessToken = async (): Promise<string> => {
    const response: AxiosResponse = await axios.post('https://api.atlassian.com/oauth/token', null, {
    params: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
    }
    });
    return response.data.access_token;
    };

    // Effectuer la requête GET avec l'authentification OAuth2
    const makeRequest = async (): Promise<void> => {
    const accessToken = await getAccessToken();
    const response: AxiosResponse = await axios.get(apiUrl, {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
    });
    console.log(response.data); // Afficher la réponse de l'API
    };

    // Appeler la fonction pour effectuer la requête GET
    makeRequest()
    .catch(error => console.error(error));

Une fois le fichier index.ts configuré, on entre les commandes:

.. code-block:: bash

    # Générer un fichier index.js
    tsc ./source/index.ts
    # Exécuter le fichier index.js avec node
    node ./source/index.js

    # Output la réponse de la requête