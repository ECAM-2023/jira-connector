<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
![npmpackage]


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
    </li
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

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

To get a local copy up and running, follow these simple example steps.

### Prerequisites

postgresql: [postgresql-install] (305 Mo)

After installing the installer this is what you will see:

![install_main_page]

OS : Windows 10/11 (Lower versions might not work)

IDE : Visual Studio Code (don't have it ? click [here] to download it)

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

Go where you want to install this project and create a folder
```
cd perfect_place
mkdir folder_name
```

go to the folder newly created
```
cd folder_name
```

clone this project by using this in a terminal:
```
git clone https://github.com/ECAM-2023/jira-connector.git
```
there you are you have installed the project !

## To view the documentation, follow these instructions :
1. Open a bash/powershell terminal in the project
2. Get in the "documentation" folder of the projet in the terminal using this command :
```
cd .\jira-connector\documentation\
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


<p align="right">(<a href="#readme-top">back to top</a>)</p>


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



<!-- MARKDOWN LINKS & IMAGES -->
[npmpackage]:  https://img.shields.io/badge/npm_packages-9.6.4-green
[contributors-shield]: https://img.shields.io/badge/contributors-3-greenv
[contributors-url]: https://github.com/ECAM-2023/jira-connector/graphs/contributors
[install_main_page]: documentation/source/_static/images/inst_MP.PNG
[Node.js]: https://img.shields.io/badge/node.js-555555?logo=nodedotjs
[Node-url]: https://nodejs.org/
[React.js]: https://img.shields.io/badge/React-555555?logo=react
[React-url]: https://reactjs.org/
[axios]: https://img.shields.io/badge/axios-555555?logo=axios
[axios-url]: https://axios.org/
[postgresql]: https://img.shields.io/badge/postgresql-555555?logo=postgresql
[postgresql-url]: https://postgresql.org/
[postgresql-install]: https://www.enterprisedb.com/postgresql-tutorial-resources-training?uuid=4726a163-a071-4af4-8395-6d239c34d4a1&campaignId=Product_Trial_PostgreSQL_15
[Express]: https://img.shields.io/badge/Express-555555?logo=Express
[express-url]: https://Express.org/
[sequelize]: https://img.shields.io/badge/sequelize-555555?logo=sequelize
[sequelize-url]: https://sequelize.org/
[typescript]: https://img.shields.io/badge/typescript-555555?logo=typescript
[typescript-url]: https://typescript.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-555555?&logo=bootstrap
[Bootstrap-url]: https://getbootstrap.com
[here]: https://code.visualstudio.com/Download
