/** 새로운 게시물 게시물의 내용을 서버로 보냄 */
const submitPost = async () => {
    const getPostContent = document.getElementById("newPost").value;
    const response = await fetch("http://localhost:8000/post-editor", {
        method: "POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({  postContent : getPostContent }),
    });

    if(response.ok){
        alert('게시가 완료 되었습니다');
        document.location.href = "/client";
    } else {
        alert("서버에 이상이 있습니다.");
    }
    console.log();
};

/** 수정한 게시물의 내용을 서버로 보냄 */
const updatePost = async () => {
    const getPostContent = document.getElementById("newPost").value;
    const response = await fetch(`http://localhost:8000/post-editor/${postId}`, {
        method: "POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({  postContent : getPostContent }),
    });

    console.log(getPostContent)
    if(response.ok){
        alert('수정 완료 되었습니다');
        document.location.href = "/client";
    } else {
        alert("서버에 이상이 있습니다.");
    }
    console.log();
};

/** 수정할 게시물에 기존 데이터 받아오기 */
const getPostContent = async () => {
    const response = await fetch(`http://localhost:8000/post-editor/${postId}`, {method:"GET"});
    const responseData = await response.json();

    document.getElementById("newPost").value = responseData[0].post_content;

}

const submitSwitch = () => {
    !postId ? submitPost() : updatePost(); 
}

const postId = location.search.split('?postId=')[1];
postId && getPostContent();