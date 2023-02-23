import { html, LitElement } from "lit";

export class PostsUI extends LitElement {

    static get properties() {
        return {
            posts: { type: Array},
            formVisible: { type: Boolean },
            selectedPost: { type: Object },
            
            
        }
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
      

      

    render() {
        return html`
        <div class="postBox">
        <section class="postBox__list">
        <h2>Posts List</h2>
        <button @click="${this._onAddClick}">Add</button>
        <div ?hidden=${!this.isFormEnabled}></div>

            <ul id="posts">
            ${this.posts && this.posts.map((post) => html`
                <li @click="${() => this._onPostClick(post)}" class="post" id="post_${post.id}">
                    ${post.id} -- ${post.title}
                </li>
            `)}
            </ul>
            </section>
            <section class="postBox__list">
            <form-ui .visible="${this.formVisible}" .selectedPost="${this.selectedPost}"></form-ui>
            </section>
            </div>
            
        `;
    }
    _handleAdd() {
        this.isFormEnabled = true;
      }

    createRenderRoot() {
        return this;
    }

}

customElements.define('posts-ui', PostsUI);