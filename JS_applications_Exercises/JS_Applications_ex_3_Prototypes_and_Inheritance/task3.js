function solve() {
    
    class Post{

        constructor(title,content) {

            this.title =  title;
            this.content = content;
        }

        toString(){
            
            return `Post: ${this.title}\nContent: ${this.content}`
            
        };
    }

    class SocialMediaPost extends Post{

        constructor(title,content, likes, dislikes) {
            super(title,content);

            this.likes = likes;
            this.dislikes=dislikes;
            this.comments = [];
        }

        addComment(comment){

            this.comments.push(comment);
        }

        toString(){


            if (this.comments.length!==0) {

                let commentsForPrint = this.comments.reduce((acc, curVal)=> {

                    acc = acc.concat(` * ${curVal}\n`);
                    
                    return acc;
    
                },'')
    
                return super.toString()+ `\nRating: ${this.likes - this.dislikes}`+`\nComments:\n`+ commentsForPrint.trimEnd();
            }

            else return super.toString()+ `\nRating: ${this.likes - this.dislikes}`

        }

    }

    class BlogPost extends Post{

        constructor(title,content, views) {
            super(title,content);

            this.views = views;
        }

        view(){

            this.views++;
            return this
        }

        toString(){

            return super.toString()+`\nViews: ${this.views}`
        }
    }
    
    return {Post, SocialMediaPost, BlogPost}

}

solve()

let post = new Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new SocialMediaPost("TestTitle", "TestContent", 5, 10);

// scm.addComment("Good post");
// scm.addComment("Very good post");
// scm.addComment("Wow!");

console.log(scm.toString());

let bp = new BlogPost("TestTitle", "TestContent", 5);

bp.view().view();

console.log(bp.toString());