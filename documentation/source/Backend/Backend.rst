.. include:: ../_static/references/_sphinx.rst

Documentation Backend
=====================

hébergement serveur web
-----------------------

Serveur express
^^^^^^^^^^^^^^^

Pour héberger le serveur qui contiendra l'api il faut créer un fichier server.js qui contiendra ceci:

.. code-block:: javascript

    const express = require("express");

    const app = express();

    // parse requests of content-type - application/json
    app.use(express.json());  /* bodyParser.json() is deprecated */

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

    // simple route
    app.get("/", (req, res) => {
    res.json({ message: "Welcome to jira connector's API." });
    });

    // Routes Tutorial
    require("./app/routes-jira/turorial.routes")(app);

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });

j'ai utilisé express pour héberger un serveur qui écoute sur le port 8080,
à la racine j'ai mit un petit message d'accueil
et pour les routes le fichier utilise le dossier "routes-jira" dans lequel j'ai mit un exemple de route "tutorial.routes".

cors
^^^^

Pour ajouter de la sécurité j'ai ajouté ces lignes:

.. code-block:: javascript

    const cors = require("cors");

    var corsOptions = {
    origin: true,
    :Method: ['GET']
    };

    app.use(cors(corsOptions));

Ici, nous utilisons cors qui permet de limiter les urls qui ont accès au serveur backend et aussi les types de requêtes qui lui sont envoyés.


Routes
------

Dans le fichier "tutorial.routes", il y a :

.. code-block:: javascript

    module.exports = app => {
    const tutorials = require("../controllers-jira/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use("/api/v1/tutorials", router);
    };

j'ai définit la racine comme étant "/api/v1/tutorials" et j'ai ajouté 7 routes différentes qui permettent de lire, créer, modifier, supprimer, filtrer.

chaque route possède un 2ème paramètre qui est la fonction qui va être utlisée.

les routes utilisent le dossier "controllers-jira" qui contient le code auquel la route va faire appel.

controller
----------

C'est dans le fichier controller que toute les fonctions sont implémentées.

la première partie consiste a faire le lien avec la base de données, puisque nous réalisons des opérations avec celle-ci.

le code a ajouter est tel:

.. code-block:: javascript

    const db = require("../models");
    const Tutorial = db.tutorials;
    const Op = db.Sequelize.Op;

j'ai créer une constante qui utilise la liste des base de données du fichier "index.js" dans le dossier "models"

et je crée "Tutorial" qui représente la base de donnée, et Op qui représente les opérateurs utilisables dans la base de données.

Ensuite viennes toutes les fonctions:

J'utilise la constante "Tutorial" et réalise des opérations sur celle-ci.

il y a plusieurs opérations possible; create, findAll, findByPk, update, destroy. 

Pour renvoyer les données demandée, j'attend d'abord que la base de donnée me les envoies avec un ".then()" et ensuite je les envoie en réponse,

je vérifie aussi, si il y a des erreur avec le ".catch()"

Pour le cas de "create" je dois fournir le modèle de donnée (datatemplate) de l'objet à ajouter

qui se base sur le modèle reçu en requête et ne prend que le nécessaire 

.. code-block:: javascript

    // Create and Save a new Tutorial
    exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        });
    };

    // Retrieve all Tutorials from the database.
    exports.findAll = (req, res) => {

    Tutorial.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        });
    };


Pour sélectionner un seul tutoriel j'utilise le paramètre "id" fourni dans la route au préalable.

.. code-block:: javascript

    // Find a single Tutorial with an id
    exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
        });
    };

    // Update a Tutorial by the id in the request
    exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Tutorial was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
        });
    };

    // Delete a Tutorial with the specified id in the request
    exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Tutorial was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
        });
    };

    // Delete all Tutorials from the database.
    exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all tutorials."
        });
        });
    };

En plus de cela je peux ajouter des conditions, 

Par exemple, dans "findAllPublished" je peux ajouter la condition où l'attribut "published" est true.

.. code-block:: javascript
    
    // find all published Tutorial
    exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        });
    };