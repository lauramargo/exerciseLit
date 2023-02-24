import { html, LitElement } from "lit";
import "../components/form.component";
export class PostsUI extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
      titleValue: { type: String },
      bodyValue: { type: String },
      
      selectedPost: { type: Object },
    };
  }
  constructor() {
    super();
    this.posts = [];
    
    
  }
  _onPostClick(post) {
    this.selectedPost = post;
    
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
              <a  href="#" @click="${() => this._onPostClick(post)}">
                <li
                  
                  class="post"
                  id="post_${post.id}"
                >
                  ${post.id}  ${post.title} ${post.body}
                </li>
                </a>
              `
            )}
           
          </ul>
        </section>
        <section class="postBox__list">
          <form-component
            
            .selectedPost="${this.selectedPost}"
            
            @post-change="${this.createPost}"
          ></form-component>
        </section>
      </div>
    `;
  }
  _onAddClick() {
    this.formVisible = true;
  }
  createPost(e) {
    const newPost = e.detail;
    this.posts = [...this.posts, newPost];
  }
  createRenderRoot() {
    return this;
  }

}
customElements.define("posts-ui", PostsUI);