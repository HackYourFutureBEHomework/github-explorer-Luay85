'use strict';

/* global Util, Repository, Contributor */

class App {
  constructor(url) {
    this.initialize(url);
  }
  /**
   * Initialization
   * @param {string} url The GitHub URL for obtaining the organization's repositories.
   */
  async initialize(url) {
    const root = document.getElementById('root');
    const header = Util.createAndAppend("header", root, {
      class: "header",
      html: "<h3>HYF Repositories</h3>"
    });
    const repositorySelect = Util.createAndAppend("select", header, {
      class: "select"
    });
    Util.createAndAppend("option", repositorySelect, {
      class: "option",
      disabled: '',
      html: "-- Select a repository --"
    });
    try {
      const res = await Util.fetchJSON(url);
      this.repos = res.sort((url, res) => url.name.localeCompare(res.name)).map(url => new Repository(url));
      this.repos.forEach((url, res) => {
        Util.createAndAppend("option", repositorySelect, {
          class: "option",
          html: url.name(),
          value: res
        });
      });
      repositorySelect.addEventListener("change", () => this.fetchContributorsAndRender(repositorySelect.value)),
        Util.createAndAppend("div", root, {
          class: "main-div"
        });
    } catch (error) {
      this.renderError(error);
    }
  }
  /**
   * Fetch contributor information for the selected repository and render the
   * repo and its contributors as HTML elements in the DOM.
   * @param {number} index The array index of the repository.
   */
  async fetchContributorsAndRender(index) {
    const repo = this.repos[index],
      mainDiv = document.querySelector('.main-div');
    try {
      const contributors = await repo.fetchContributors();
      mainDiv.innerHTML = '';

      const left = Util.createAndAppend("div", mainDiv, {
        class: "repo-details",
      });
      const right = Util.createAndAppend("div", mainDiv, {
        class: "contributor-div",
      });
      const contributorsList = Util.createAndAppend("ul", right, {
        class: "contributor-list",
        html: "<h5>Contributions</h5>"
      });
      repo.render(left),
        contributors
        .map(contributor => new Contributor(contributor))
        .forEach(contributor => contributor.render(contributorsList));
    } catch (error) {
      this.renderError(error);
    }
  }
  /**
   * Render an error to the DOM.
   * @param {Error} error An Error object describing the error.
   */
  renderError(error) {
    const mainDiv = document.querySelector(".main-div");
    mainDiv.innerHTML = "",
      Util.createAndAppend("div", mainDiv, {
        html: error.message,
        class: "alert alert-error"
      });
  }
}

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFutureBelgium/repos?per_page=100';
window.onload = () => new App(HYF_REPOS_URL);
