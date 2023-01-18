/** post에 전체 목록 가져오기 */
const getPostList = async () => {
    const response = await fetch("http://localhost:8000/", {method : "GET"});
    const responseData = await response.json();

    for(let value of responseData){
        createTableList(value);
    }
    
    console.log(responseData);
}

/** post데이터를 받아와 html 태그 생성 Input : post정보 */
const createTableList = (postData) => {
    let getBoardTag = document.getElementsByClassName('board-list-body')[0];
    const trTag = document.createElement('tr');
    for(let key in postData){
        const tdTag = document.createElement('td');
        tdTag.textContent = postData[key];
        trTag.appendChild(tdTag);
    }
    const tdTag = document.createElement('td');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    updateButton.textContent = "수정";
    deleteButton.textContent = "삭제";

    updateButton.addEventListener("click" , () => document.location.href=`./post-editor/index.html?postId=${postData.post_id}`)
    deleteButton.addEventListener("click" , async () => {
        const userAnswer = confirm("삭제 하시겠습니까?");
        if(userAnswer){
            const response = await fetch(`http://localhost:8000/delete-post/${postData.post_id}`, {method : "DELETE"})
            if(response.ok){
                alert("삭제 완료 되었습니다.")
                document.location.reload();
            }
        }
    })


    tdTag.appendChild(updateButton);
    tdTag.appendChild(deleteButton);

    trTag.appendChild(tdTag);

    getBoardTag.appendChild(trTag);
}

getPostList();