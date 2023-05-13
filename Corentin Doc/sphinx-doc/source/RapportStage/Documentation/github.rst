GitHub
======

Connexion avec SSH
------------------

| La connexion SSH permet de sécuriser l'envoi de commit sur github grâce à une clé SSH publique que l'on enregistre sur github. Tout d'abord via VS code, il faut lancer un terminal bash afin de pouvoir exécuter les commandes suivantes qui seront présentées. Pour créer une clé de type ed25519 en 4096 bits, la commande suivante sera utilisée :

.. code-block::

    ssh-keygen -t ed25519 -b 4096 -C "your_email@example.com"
    

Une fois la commande tapée, il sera possible d'ajouter une passphrase pour sécuriser l'utilisation de la clé. Une fois la clé générée et la passphrase choisie, il faut vérifier que le SSH-agent est en cours d'exécution avec la commande suivante :

.. code-block::

    eval "$(ssh-agent -s)"
    

Si le SSH-agent est en cours d'exécution alors la phrase "Agent pid numéro" va être affichée. Ensuite, ajoutez votre clé privée SSH à SSH-agent avec la commande suivante :

.. code-block::

    ssh-add ~/.ssh/id_ed25519
    

Enfin, il ne reste plus qu'a ajouter la clé publique ed25519 sur github. Pour ce faire, il faut d'abord copier la clé publique avec la commande :

.. code-block::

    clip < ~/.ssh/id_ed25519.pub
    

| Puis sur github, aller dans les "Settings" => "SSH and GPG keys" => "New SSH key" et coller la clé SSH.
| La commande suivante permet de vérifier que la connexion SSH est bien configurée en recevant un "Hi avec nom"

.. code-block::

    ssh -vT git@github.com
    


Connexion avec GPG
------------------

La connexion GPG permet de signer des commits pour qu'ils soient vérifiés sur github. 
Comme pour la connexion SSH, tout se fera sur le terminal de commande git bash. 
La première commande à utiliser est celle pour créer la clé GPG :

.. code-block::

    gpg --full-generate-key
    

| Il vous sera demandé de choisir les paramètres suivantes:
- Le type de clé ici, nous prendrons la "(1) RSA and RSA".
- La durée de validation, nous avons choisis que la clé n'expire pas.
- Nom.
- Adresse mail.
- Comment.
- Un passphrase (optionnel, utilisé pour augmenter la sécurité).
| Pour récuperer la clé GPG, il faudra utiliser 2 commandes. Il faut d'abord récupérer l'id de la clé :

.. code-block::

    gpg --list-secret-keys --keyid-format=long
    

..  code-lock::

    ------------------------------------
    sec rsa4096/6177BE00E84B74D1 2023-04-03 [SC]
        2A02383F3EDDA2A7465C567F6177BE00E84B74D1
    uid                 [ultimate] Name (GITHUB KEY - emailAdresse) <emailAdresse>
    ssb rsa4096/4BB6D45482678BE3 2016-03-10 [E]
    
Et après utiliser l'id de la clé (6177BE00E84B74D1) pour afficher la clé à copier dans github :

.. code-block::

    gpg --armor --export 6177BE00E84B74D1
    

On copie la clé et on la met sur github dans sur la même page que 
SSH key mais cette fois ci on choisi GPG keys

On peut maintenant faire des commits signés avec la commande suivante:

.. code-block::

    git commit -S -m "Message"
    

Commitizen
----------

C'est une règle lors de la création d'un commit, il faut l'écrire sous la forme suivante:

.. code-block::

    git commit -S -m "type(Scope): Short" -m "Long" -m "Breaking Point" -m "Issues Close"
    