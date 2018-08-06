'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
  constructor(data) {
    this.data = data;
  }
  /**
   * Render the contributor info to the DOM.
   * @param {HTMLElement} contributorList The parent element in which to render the contributor.
   */
  render(contributorsList) {
    const contributorItem = Util.createAndAppend("li", contributorsList, {
      class: "contributor-item"
    });
    Util.createAndAppend("img", contributorItem, {
      class: "contributor-avatar",
      src: this.data.avatar_url
    });
    Util.createAndAppend("a", contributorItem, {
      html: `<h4>${this.data.login}</h4>`,
      class: "contributor-login",
      href: this.data.html_url,
      target: "_blank"
    });
    Util.createAndAppend("h5", contributorItem, {
      class: "contribution",
      html: this.data.contributions
    });
  }
}
