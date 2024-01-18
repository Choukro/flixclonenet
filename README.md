<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Chourko/flixclonenet">
    <img src="/public/assets/netflix-n.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">FlixCloneNet</h3>

  <p align="center">
    Clone d'une plateforme de streaming de séries et de films en ligne !
    <br />
    <a href="https://github.com/Choukro/flixclonenet"><strong>Voir le projet »</strong></a>
    <br />
    <br />
    <a href="https://flixclonenet.vercel.app/">Voir Démo</a>
    ·
    <a href="https://github.com/Choukro/flixclonenet/issues">Signaler Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#à-propos-de-ce-projet">À propos de ce projet</a>
      <ul>
        <li><a href="#bibliothèques-&-frameworks">Bibliothèques & frameworks</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-commencer">Pour commencer</a>
      <ul>
        <li><a href="#configuration requise">Configuration requise</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#objectifs">Objectifs</a></li>
      <ul>
        <li><a href="#éléments techniques">Éléments techniques</a></li>
      </ul>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#remerciements">Remerciements</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## À propos de ce projet

[![Product Name Screen Shot][product-screenshot]](https://flixclonenet.vercel.app/auth)

`React` est l’une des [bibliothèques les plus populaires](https://kinsta.com/fr/blog/bibliotheques-javascript/) pour la création d’applications web dynamiques. Elle est utilisée par de nombreuses entreprises et dispose d’une communauté active. En tant que développeur, comprendre le fonctionnement de cette bibliothèque était donc une chose dont j'avais besoin pour progresser et pouvoir construire des projets adaptés, facilement évolutifs et maintenables. Récemment, l'écosystème `React` a connu des changements importants. Ces changements comprennent le lancement de la nouvelle documentation [react.dev](https://react.dev/), la dépréciation de `create-react-app`, et la popularité croissante de frameworks alternatifs comme `Next.js`. 

Réaliser un projet avec ce framework m'a permis de prendre en main `React` et `Next.js`. J'ai donc choisi de réaliser un clone d'une plateforme de streaming de séries et de films en ligne !

<p align="right">(<a href="#readme-top">⬆️</a>)</p>



### Bibliothèques & frameworks

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![ReactQuery][ReactQuery.js]][ReactQuery-url]
* [![Material-UI][MaterialUI.js]][MaterialUI-url]
* [![Jest][Jest.js]][Jest-url]
* [![Prisma][Prisma.js]][Prisma-url]
* [![Postgres][Postgres.neon]][Postgres-url]
* [![Vercel][Vercel.js]][Vercel-url]


<p align="right">(<a href="#readme-top">⬆️</a>)</p>



<!-- GETTING STARTED -->
## Pour commencer

Pour mettre en place une copie locale et la faire fonctionner, suivez les étapes suivantes.

### Configuration requise

- [git][git] v2.43 ou supérieure
- [NodeJS][node] v18.17 ou supérieur
- [npm][npm] v10 ou supérieure

Pour vérifier qu'ils sont correctement installés et configuré vous pouvez executer :

```shell
git --version
node --version
npm --version
```

### Installation

1. Créer un compte sur TMDB ([https://www.themoviedb.org](https://www.themoviedb.org/?language=fr)) et demander une clé API gratuite 
2. Cloner le repo
   ```sh
   git clone https://github.com/Choukro/flixclonenet.git
   ```
3. Installer les paquets NPM
   ```sh
   npm install
   ```
4. Entrez votre API dans le fichier `.env.template`
   ```js
   const NEXT_PUBLIC_TMDB_API_KEY = 'ENTRER VOTRE API';
   ```
5. Configurer les autres variables d'environnement selon vos choix de la base de données et du service Cloud permettant le déploiement de l'application 

7. Remplacer le nom du fichier `.env.template` par `.env.local`

<p align="right">(<a href="#readme-top">⬆️</a>)</p>



<!-- OBJECTIFS -->
## Objectifs

L'objectif de ce projet `Next.js` est le suivants : 
- Cloner une plateforme de streaming de séries et de films en ligne avec : 
  - un accès aux films et aux séries
  - un classement par catégories
  - une section recherche de films ou de séries
  - la gestion de favoris 
  - la gestion de l'authentification

Les utilisateurs peuvent donc s'enregistrer et se connecter. Ils peuvent sélectionner des séries et des films en fonction de leur genre, et autres catégories. Ils peuvent également obtenir des détails sur la série ou le film sélectionné. Enfin, ils peuvent effectuer des recherches, et, ajouter leurs films et leurs séries en favoris.

_Pour plus d'exemples, vous pouvez créer votre compte en suivant [ce lien >>](https://flixclonenet.vercel.app/auth)_

<p align="right">(<a href="#readme-top">⬆️</a>)</p>

### Éléments techniques

Ce projet regroupe les éléments techniques suivants : 
- Hooks
- Context API (ou State Manager)
- Librairie de composant (MUI, React tooltip, ...)
- Appel API :
  - [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)
  - [NextAuth.js](https://next-auth.js.org/)
  - gestion des favoris
- Gestion des routes
- Gestion de l'authentification (Login/Register)
- Gestion de données en mémoire cache
- Gestion des performances
- Réalisation de tests
- Mise en production / Déploiement


<!-- ROADMAP -->
## Roadmap

- [x] Écrire la documentation
- [ ] _Tests_ :
  - [ ] Finir les tests d'intégration
  - [ ] Établir les test e2e avec `cypress`
- [ ] _Refactors_ :
  - [ ] Réorganiser et restructurer le code afin de favoriser sa lisibilité et sa clarté, mais aussi pour faciliter les tests
  - [ ] Utilisation de `Zustand` comme librairie de state Management
- [ ] _Authentification_ : Ajout de la fonctionnalité "Mot de passe oublié"

Voir les [issues ouvertes](https://github.com/Choukro/flixclonenet/issues) pour une liste complète des fonctionnalités proposées (et des problèmes connus).

<p align="right">(<a href="#readme-top">⬆️</a>)</p>


<!-- LICENSE -->
## License

Distribué sous la licence MIT. Voir `LICENSE.txt` pour plus d'informations.

<p align="right">(<a href="#readme-top">⬆️</a>)</p>



<!-- CONTACT -->
## Contact

Pierre-Henri Merrer - [Portfolio](https://ph-merrer.fr/)

Lien du projet : [https://flixclonenet.vercel.app/](https://flixclonenet.vercel.app/)

<!-- ACKNOWLEDGMENTS -->
<!-- ## Remerciements

* []()
* []()
* []() -->

<!-- <p align="right">(<a href="#readme-top">⬆️</a>)</p> -->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/Choukro/flixclonenet.svg?style=for-the-badge
[issues-url]: https://github.com/Choukro/flixclonenet/issues
[license-shield]: https://img.shields.io/github/license/Choukro/flixclonenet.svg?style=for-the-badge
[license-url]: https://github.com/Choukro/flixclonenet/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/pierre-henri-merrer/
[product-screenshot]: /public/assets/screenshot.png
[React.js]: https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[ReactQuery.js]:https://img.shields.io/badge/-React%20Query-000000?style=for-the-badge&logo=react%20query&logoColor=white
[ReactQuery-url]:https://tanstack.com/query/latest/docs/react/overview
[MaterialUI.js]:https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white
[MaterialUI-url]:https://mui.com/material-ui/getting-started/
[Jest.js]: https://img.shields.io/badge/Jest-green?style=for-the-badge&logo=Jest&logoColor=white
[Jest-url]: https://jestjs.io/fr/
[Prisma.js]: https://img.shields.io/badge/Prisma-red?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]:https://www.prisma.io/
[Postgres.neon]:https://img.shields.io/badge/postgres-red.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://neon.tech/
[Vercel.js]:https://img.shields.io/badge/Vercel-yellow?style=for-the-badge&logo=Vercel&logoColor=white
[Vercel-url]:https://vercel.com/products/dx-platform
[git]: https://git-scm.com/
[node]: https://nodejs.org
[npm]: https://www.npmjs.com/