import { html, LitElement } from "lit";
import "./../ui/form.ui";
export class PostsUI extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
      formVisible: { type: Boolean },
      selectedPost: { type: Object },
    };
  }
  constructor() {
    super();
    this.posts = [];
    this.formVisible = false;
    this.selectedPost = null;
  }
  _onPostClick(post) {
    this.selectedPost = post;
    this.formVisible = true;
  }
  addPost(post) {
    this.posts = [...this.posts, post];
    this.requestUpdate();
  }
  render() {
    return html`
      <div class="postBox">
        <section class="postBox__list">
          <h2>Posts List</h2>
          <button class="formBox__btn" @click="${this._onAddClick}">Add</button>
          <ul id="posts">
            ${this.posts &&
            this.posts.map(
              (post) => html`
                <li
                  @click="${() => this._onPostClick(post)}"
                  class="post"
                  id="post_${post.id}"
                >
                  ${post.id} -- ${post.title}
                </li>
              `
            )}
          </ul>
        </section>
        <section class="postBox__list">
          <form-ui
            ?hidden="${this.formVisible}"
            .selectedPost="${this.selectedPost}"
            @post-created="${this.addPost}"
          ></form-ui>
        </section>
      </div>
    `;
  }
  _onAddClick() {
    this.formVisible = true;
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("posts-ui", PostsUI);