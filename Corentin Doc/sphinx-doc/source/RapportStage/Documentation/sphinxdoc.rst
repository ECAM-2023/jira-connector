Sphinx-doc
==========


| C'est un générateur de document qui, avec un seul code, permet de sortir plusieurs formes différentes de documents. Ex: html, latexpdf, plantuml, ... L'installation se fera via se lien : `sphinx-doc install <https://www.sphinx-doc.org/en/master/usage/installation.html#windows>`_.
| L'installation de Chocolatey sera nécéssaire pour faire une installation rapide de sphinx-doc sur Windows. L'installation se fera via se lien : `chocolatey install <https://chocolatey.org/install>`_.


Pour finir l'installation, la commande suivante devra être lancée dans powershell en mode administrateur :

.. code-block::

    choco install sphinx


Une fois sphinx-doc installé, le dossier "sphinx-doc" va être créé pour pouvoir lancer sphinx-doc.

.. code-block::

    sphinx-quickstart
    

- Séparer les répertoires "source" et "build"
- Remplir le nom du projet, de l'auteur et la version du projet
- Indiquer la langue du projet

Commandes
---------

HTML
^^^^

On peut créer un fichier html à partir du code sphinx-doc avec la commande suivante:

.. code-block::

    .\make.bat html
    

Latex
^^^^^

Pour pouvoir créer des documents en latex, il faut avoir préalablement installé latexmk qui
est téléchargeable avec MikTex. (Si vous vous trouvez sur windows, il faudra d'abord
installer Strawberry Perl avant de pouvoir installer MikTex). Une fois ces étapes réalisées,
la commande suivante vous permettra de générer un version en latex automatiquement:

.. code-block::

    .\make.bat latexpdf
    

Extensions
----------

Plantuml
^^^^^^^^

Plantuml permet de créer des diagrammes à partir de texte brut. Pour utiliser platuml,
il faut aussi avoir installé `java v7 ou v8 <https://www.java.com/fr/download/help/windows_manual_download.html#download>`_.
Après il faut télécharger le fichier plantuml-1.2023.5.jar qui est disponible 
dans le `github <https://github.com/plantuml/plantuml/releases/tag/v1.2023.5>`_. 
Le fichier sera à mettre dans source/_static/libraries (nouveau dossier).

| Dans le fichier conf.py, il faut ajouter les lignes suivantes:

.. code-block::

    # -- Options for plantuml output ----------------------------------------------
    #
    plantuml = 'java -jar ../_static/librairies/plantuml-1.2023.5.jar'
    plantuml_output_format = 'png'
    plantuml_latex_output_format = 'png'


Tree
^^^^

La commande suivante permet de créer un fichier avec l'arborescence du sphinx doc /f pour montrer les fichiers internes aux dossiers
.. code-block::

    tree /f /a > arborescence.txt 


.. code-block::

On peut choisir l'emplacement d'enregistrement en modifiant le chemin de "arborescence.txt".


File
----

Pour pouvoir lire et utiliser les types de fichiers (CSV, XLS, XLSX), il faut d'abord ajouter
dans les extensions du fichier conf.py :

.. code-block::

    { 
    ...
    'sphinxcontrib.exceltable',
    'sphinxcontrib.xlsxtable'
    }

CSV
^^^

.. code-block::

    .. csv-table:: manually created file
        :header: "Description", "Reference"
        :width: 100%

        "RTD theme", `sphinx-rtd-theme`_
        "copy button", `sphinx-copybutton`_
        "exceltable", `sphinxcontrib-exceltable`_
        "xlsxtable", `sphinxcontrib-xlsxtable`_

    .. csv-table:: imported csv file
        :file: ../_static/files/table.csv
        :header-rows: 1
        :class: longtable


XLS
^^^

.. code-block::

    .. exceltable:: xls Table caption
        :file: ../_static/files/table.xls
        :sheet: Feuil1
        :header: 1
        :selection: A1:D5

XLSX
^^^^

.. code-block::

    .. xlsx-table:: xlsx Table Caption
        :file: ../_static/files/table.xlsx
        :sheet: Feuil1
        :header-rows: 1
        :include-columns: A-D
        :include-rows: 1-7
