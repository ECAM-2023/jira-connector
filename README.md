

[![Contributors][contributors-shield]][contributors-url]

<!-- PROJECT LOGO -->
  <h1 align="center">Jira-Connector-Project</h3>

  <p align="center">
    An ETL to make a link with jira
    <br />
    <a href="https://github.com/ECAM-2023/jira-connector"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/ECAM-2023/jira-connector/issues">Report Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project is separated in 3 part, the jira connector, the backend and the frontend. This is by using all of them that you can have the ETL experience.



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* [![Node][Node.js]][node-url]
* [![postgresql][postgresql]][postgresql-url]
* [![Express][Express]][express-url]
* [![axios][axios]][axios-url]
* [![sequelize][sequelize]][sequelize-url]
* [![typescript][typescript]][typescript-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

OS : Windows 10/11 (Lower versions might not work)

IDE : Visual Studio Code

VSCode Extensions :
- Python
- reStructuredText
- MySQL
- Live Server
- Prettier

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


## To view the documentation, follow these instructions :
1. Open a bash/powershell terminal in the project
2. Get in the "documentation" folder of the projet in the terminal using this command :
```
cd documentation
```
3. Everytime you want to generate and update your documentation, empty the "build" folder with this command :
```
./make.bat clean
```
4. Generate the documentation in HTML with this command :
```
./make.bat html
```
5. Get in the folder "build/html" and open "index.html" in your browser to view the documentation

## To start the project, use these commands :

### For the frontend :
1. Open a bash terminal
2. Get in the "react-axios-typescript" folder using this command :
```
cd react-axios-typescript
```
3. Use these commands in the terminal :
```
npm install --legacy-peer-deps
# then
npm run start
```

### For the backend :
1. Open a bash terminal 
2. Get in the "node-express-sequelize-postgres" folder using this command :
```
cd node-express-sequelize-postgres
```
3. Use these commands in the terminal :
```
npm install --legacy-peer-deps
# then
node server.js
```


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Views 
    - [x] Organizations
    - [x] Issues
    - [x] Users
    - [x] Customers
- [ ] Add Additional Components
- [ ] Multi-language Support
    - [x] English
    - [ ] French

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Van Olffen Victor - 20253@ecam.be

Mettioui Mourad - 195019@ecam.be

Maillard Corentin - 21306@ecam.be

Project Link: [https://github.com/ECAM-2023/jira-connector](https://github.com/ECAM-2023/jira-connector)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/badge/contributors-3-green
[contributors-url]: https://github.com/ECAM-2023/jira-connector/graphs/contributors
[product-screenshot]: images/screenshot.png
[Node.js]: https://img.shields.io/badge/node.js-555555?logo=nodedotjs
[Node-url]: https://nodejs.org/
[React.js]: https://img.shields.io/badge/React-555555?logo=react
[React-url]: https://reactjs.org/
[axios]: https://img.shields.io/badge/axios-555555?logo=axios
[axios-url]: https://axios.org/
[postgresql]: https://img.shields.io/badge/postgresql-555555?logo=postgresql
[postgresql-url]: https://postgresql.org/
[Express]: https://img.shields.io/badge/Express-555555?logo=Express
[express-url]: https://Express.org/
[sequelize]: https://img.shields.io/badge/sequelize-555555?logo=sequelize
[sequelize-url]: https://sequelize.org/
[typescript]: https://img.shields.io/badge/typescript-555555?logo=typescript
[typescript-url]: https://typescript.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-555555?&logo=bootstrap
[Bootstrap-url]: https://getbootstrap.com
