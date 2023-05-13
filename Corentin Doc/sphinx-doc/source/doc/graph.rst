Graph
=====

CSV file
--------

.. csv-table:: imported csv file
    :file: ../_static/files/data.csv
    :header-rows: 2
    :class: longtable

.. plot::

    import pandas as pd
    import matplotlib.pyplot as plt

    # Lire les données du tableau
    df = pd.read_csv('../_static/files/data.csv',delimiter=',')

    # Créer le graphique courbe
    plt.plot(df['Jour'], df['Temperature'])

    # Ajouter un titre et des étiquettes d'axes
    plt.title('Graphique de températures')
    plt.xlabel('Jours')
    plt.ylabel('°C')

    # Afficher le graphique
    plt.show()

XSLX file
---------

.. xlsx-table:: xlsx Table Caption
    :file: ../_static/files/Classeur1.xlsx
    :sheet: Feuil1
    :header-rows: 1
    :include-columns: A-B
    :include-rows: 1-7

.. plot::

    import pandas as pd
    import matplotlib.pyplot as plt

    # Lire les données du tableau
    df1 = pd.read_excel('../_static/files/Classeur1.xlsx', sheet_name='Feuil1')
    df2 = pd.read_excel('../_static/files/Classeur1.xlsx', sheet_name='Feuil2')

    # Créer le graphique courbe
    plt.plot(df1['Jour'], df1['Temperature'])
    plt.plot(df1['Jour'], df1['Temperature'],'*')
    plt.plot(df2['Jour'], df2['Temperature'])

    # Ajouter un titre et des étiquettes d'axes
    plt.title('Graphique de températures')
    plt.xlabel('Jours')
    plt.ylabel('°C')

    # Ajouter la légende
    plt.legend()

    # Afficher le graphique
    plt.show()

XSL file
--------

.. xlsx-table:: xlsx Table Caption
    :file: ../_static/files/Classeur1.xlsx
    :sheet: Feuil1
    :header-rows: 1
    :include-columns: A-B
    :include-rows: 1-7

.. plot::

    import pandas as pd
    import matplotlib.pyplot as plt

    # Lire les données du tableau
    df1 = pd.read_excel('../_static/files/Classeur1.xls', sheet_name='Feuil1')
    df2 = pd.read_excel('../_static/files/Classeur1.xls', sheet_name='Feuil2')

    # Créer le graphique courbe
    plt.plot(df1['Jour'], df1['Temperature'])
    plt.plot(df1['Jour'], df1['Temperature'],'*')
    plt.plot(df2['Jour'], df2['Temperature'])

    # Ajouter un titre et des étiquettes d'axes
    plt.title('Graphique de températures')
    plt.xlabel('Jours')
    plt.ylabel('°C')

    # Ajouter la légende
    plt.legend()

    # Afficher le graphique
    plt.show()