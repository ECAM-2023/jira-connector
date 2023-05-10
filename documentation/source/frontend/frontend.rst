.. include:: ../_static/references/_sphinx.rst

Frontend
========

Lancer le frontend
-------------------

Pour lancer le frontend, suivez ces étapes :

1. Ouvrir un terminal bash dans **jira-connector**
2. Accéder au dossier **"jira-connector/react-axios-typescsript"** en utilisant cette commande :

.. code-block:: bash

    cd react-axios-typescript

3. Entrer les commandes suivantes :

.. code-block:: bash

    # Pour installer tous les packages nécessaires pour le frontend
    npm install --legacy-peer-deps
    # Pour lancer le frontend
    npm run start

Au lancement du frontend, voici la page home :

.. image:: ../_static/images/frontend-home.PNG
    :width: 1200

Présentation du frontend
------------------------

Il y a une barre de navigation sur le site qui permet d'accéder aux différentes composants.

À gauche dans la barre de navigation il y a tous les composants pour afficher les organizations, les customers,
les issues, les users et en ajouter des nouveaux.

.. image:: ../_static/images/frontend-nav-left.PNG
    :width: 700

- Organizations
- Customers
- Issues
- Users
- Add new

Voici la vue "Organizations" qui permet d'afficher une liste de toutes les organizations dans la base de donnée :

.. image:: ../_static/images/frontend-organizations.PNG
    :width: 1200

Voici la vue "Add organization" qui permet d'ajouter une organisation en indiquant son ID et son nom :

.. image:: ../_static/images/frontend-addorganization.PNG
    :width: 1200

| Il y a une validation qui oblige l'utilisateur à entrer des données pour ajouter une organisation.
| Lorsque les paramètres sont remplies et que le bouton "Submit" est appuyé, une requête POST vers le backend est réalisée pour ajouter l'organisation dans la base de donnée.
| Les autres vue pour ajouter une issue et un user sont identiques. Seul les paramètres changent.



À droite il y a les composants pour se connecter, s'enregistrer sur le site et accéder aux paramètres.

.. image:: ../_static/images/frontend-nav-right.PNG
    :width: 400
    
- Login
- Register
- Settings

Voici la vue "Register" pour s'enregistrer dans la base de donnée :

.. image:: ../_static/images/frontend-register.PNG
    :width: 1200

Voici la vue "Settings" pour s'enregistrer dans la base de donnée :

.. image:: ../_static/images/frontend-settings.PNG
    :width: 1200

Voici la vue "Login" pour s'enregistrer dans la base de donnée :

.. image:: ../_static/images/frontend-login.PNG
    :width: 1200