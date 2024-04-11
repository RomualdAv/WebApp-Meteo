# WebApp-Meteo
Application web avec ExpressJS et Twig pour suivre la météo de la journée en cours. Utilisera l'API externe du Meteorologisk Institutt : locationforecast 2.0 et SQLite pour la BDD.

Plusieurs scénarios utilisateur seront pris en compte :
 - En tant qu'utilisateur, je souhaite ajouter une ville en précisant son nom et ses coordonnées LON et LAT.
 - En tant qu'utilisateur, je veux consulter la liste des villes ajoutées.
 - En tant qu'utilisateur, je veux rechercher une ville dans la liste des villes ajoutées via une barre de recherche.
 - En tant qu'utilisateur, je veux accéder à la page météorologique d'une ville en la sélectionnant dans la liste.


Pour lancer l'app il suffit de :

- Télécharger le .zip et le décompresser
- Ouvrir un terminal et executer la commande cd [chemin de la racine du dossier décompressé]
- executer la commande node app.js
- se rendre dans Localhost:3000 dans le navigateur
