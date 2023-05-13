ngrok
-----

Source : https://ngrok.com/download

- Installer ngrok dans Powershell en administrateur avec la commande:

.. code-block::

    choco install ngrok

- Aller sur ce lien après avoir créé un compte : https://dashboard.ngrok.com/get-started/your-authtoken
- Récupérer notre Authtoken et entrer cette commande dans Powershell :

.. code-block::
    
    ngrok config add-authtoken 2OejQ...apYZFS

- Puis enfin la commande:

.. code-block::

    ngrok http 3000

- Récupérer le lien à droite de Forwarding : https://8ac7-213-214-47-218.ngrok-free.app
- Aller dans les WebHooks sur Jira et créer un nouveau WebHook
- Mettre le lien dans le WebHook
- Faire la commande "npm run build" pour build les fichiers puis **"node build/webhook.js"**.
- Aller sur Jira Service Management et modifier une issue
- Il devrait y avoir **POST / 200 OK** dans les HTTP requests sur Powershell
- Il y a un fichier **jira.json** qui a été créé à la base du projet, en utilisant Prettier dessus on peut le reformater. Ce fichier contient les informations des requêtes qui ont eu lieu
- Télécharger l'extension VSCode **Paste JSON as Code**
- Copier tous le fichier **jira.json**
- Aller dans le fichier **./source/worklog.ts**
- Vider le fichier **./source/worklog.ts** s'il n'est pas vidé puis faire Ctrl+Shift+p ensuite **Paste JSON as Code**
- Vider le fichier **jira.json**
- Créer une nouvelle issue sur Jira
- Créer un nouveau fichier **./source/issue.ts**
- Formater les nouvelles valeurs du fichier **jira.json**
- Copier tout le fichier **jira.json**, aller dans le fichier vide **./source/issue.ts** et faire **Paste JSON as Code**
- Répéter le processus pour un nouveau fichier **./source/comment.ts**, **./source/attachment.ts**, **./source/issue-link.ts** et **./source/changelog.ts**.