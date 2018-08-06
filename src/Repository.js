'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Repository {
  constructor(data) {
    this.data = data;
  }
  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} parent The parent element in which to render the repository.
   */
  render(parent) {
    const repoName = Util.createAndAppend("ul", parent, {
      class: "repo-name"
    });
    const repoList = Util.createAndAppend("li", repoName, {
      class: "repo-list"
    });
    Util.createAndAppend("a", repoList, {
      html: `<strong>Repository URL:</strong> ${this.data.name}`,
      href: this.data.html_url,
      target: "_blank",
      class: "repo-link"
    });
    const repoDescription = Util.createAndAppend("p", repoList, {
      class: "description"
    });

    if (this.data.description !== null) {
      repoDescription.innerHTML = `<strong>Description:</strong> ${
          this.data.description
          }`;
    }
    Util.createAndAppend("p", repoList, {
      class: "forked",
      html: `<strong>Forked:</strong> ${this.data.forks_count}`
    });

    Util.createAndAppend("p", repoList, {
      class: "updated",
      html: `<strong>Updated on:</strong> ${this.data.updated_at.substring(
          10,
          0
        )} <strong>at</strong> ${this.data.updated_at.substring(11, 19)}`
    });
  }
  /**
   * Returns an array of contributors as a promise
   */
  fetchContributors() {
    return Util.fetchJSON(this.data.contributors_url);
  }

  /**
   * Returns the name of the repository
   */
  name() {
    return this.data.name;
  }
}
