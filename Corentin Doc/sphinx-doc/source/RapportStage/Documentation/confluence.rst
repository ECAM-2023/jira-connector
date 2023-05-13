Confluence
==========

Pour avoir une liaison entre confluence et github, il faut tout d'abord avoir créé un espace confluence. Lors de sa création, la clé d'identification
de l'espace sera appellé 'GITHUB'. Une fois cette opération effectuée, le fichier 'conf.py' va être modifiée pour ajouter les configurations
suivantes:

.. code-block::

    # -- Options for CONFLUENCE output ----------------------------------------------
    # https://sphinxcontrib-confluencebuilder.readthedocs.io/en/stable/configuration/
    confluence_publish = True #permet de publier sur confluence
    confluence_space_key = 'GITHUB' 
    confluence_parent_page = 'Projet1'
    confluence_parent_page_id_check = '524437'
    # (for Confluence Cloud)
    confluence_server_url = 'https://corentinmaillard.atlassian.net/wiki/'
    confluence_server_user = 'Corentin.Maillard@gmail.com'
    confluence_server_pass = 'ATATT3xFfGF0MPbVpMzsbLx4NIMJfW-eka6cYykg-cH6eWCJkDmr4bWzgoYoHe2UkErvCANTASExKckAXh2Wa_GeibeXJZfeqkouva306EVC4hFVBLGL2YJEU1zGEqbwhUtiXd1PNbUXnF1W_DFstU31-9ldoqRAez-7pSAtSAIkiKsKTAO47g4=52B7DD56'
    confluence_ask_password = False
    confluence_page_hierarchy = True
    confluence_use_index = True
    confluence_add_secnumbers = True
    confluence_include_search = True
    confluence_prev_next_buttons_location = 'top'
    confluence_global_labels = [
        'GITHUB',
        'DOCKER',
        'RESTRUCTUREDTEXT'
        'SPHINX-DOC',
        'RUNNER',
        'CI/CD'
    ]
    confluence_root_homepage = False
    confluence_sourcelink = {
    #    'type': 'github',
        'base':  'https://github.com',
        'url':'{base}/{owner}/{repo}/{view}/{version}/{page}{suffix}',
        'owner': 'MaillardCorentin',
        'repo': 'sphinx-doc',
        'container': '',
        'version': 'main/source',
        'view': 'blob',
        'protocol': 'https',
    }
    confluence_watch = True
    confluence_publish_onlynew = False
    confluence_page_generation_notice = True
    confluence_cleanup_from_root = False
    # confluence_domain_indices = [
    #     'py-modindex',
    # ]


Les lignes qui doivent être modifiées sont : 

.. code-block::

    confluence_space_key = 'GITHUB'

Définir la clé de l'espace, ici c'est GITHUB, mais cela dépend en fait de la clé définie lors de la création de l'espace.

.. code-block::

    confluence_parent_page = 'Projet1'
    confluence_parent_page_id_check = '524437'

Définir sur quelle page confluence il faudra publier les fichiers grâce au nom de la page ('Projet1') et de son id ('524437').

.. code-block::

    confluence_server_url = 'https://corentinmaillard.atlassian.net/wiki/'
    confluence_server_user = 'Corentin.Maillard@gmail.com'
    confluence_server_pass = 'ATATT3xFfGF0MPbVpMzsbLx4NIMJfW-eka6cYykg-cH6eWCJkDmr4bWzgoYoHe2UkErvCANTASExKckAXh2Wa_GeibeXJZfeqkouva306EVC4hFVBLGL2YJEU1zGEqbwhUtiXd1PNbUXnF1W_DFstU31-9ldoqRAez-7pSAtSAIkiKsKTAO47g4=52B7DD56'

Configurer l'URL, le User et le pass qui est l'API Token.

Pour récuperer l'API token de Confluence, il faut d'abord créer `l'API token ici <https://id.atlassian.com/manage-profile/security/api-tokens>`_. Un fois l'API token créé, le pass va être généré.
Il suffira de le copier pour le mettre au niveau du pass.

.. code-block::

    confluence_root_homepage = False
    confluence_cleanup_from_root = False

Comme la génération se fait sur une page choisie et non sur la root de confluence, 
les deux paramètres ci-dessus doivent être passé à 'False'.

| Une fois tous ces paramètres configuré, il ne reste qu'à faire la commande suivante pour que tout soit publié sur confluence:

.. code-block::

    .\make.bat confluence