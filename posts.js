
function showPosts() {
   
    document.getElementById("adminContent").innerHTML = `
        <h2>📝 Innlegg</h2>

        <button onclick="newPost()">+ Nytt innlegg</button>

        <div id="postsList">
            Ingen innlegg enda.
        </div>
    `;
    loadPosts();
}

function newPost() {
    document.getElementById("postsList").innerHTML = `
        <h3>Nytt innlegg</h3>

        <label>Tittel</label>
        <input id="postTitle">

        <label>Innhold</label>
        <textarea id="postContent" rows="8"></textarea>

        <br><br>

        <button onclick="savePost()">Lagre innlegg</button>
    `;
}
async function savePost() {
    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (!title || !content) {
        alert("Du må skrive både tittel og innhold.");
        return;
    }

    const response = await fetch(SUPABASE_REST_URL + "/posts", {
        method: "POST",
        headers: supabaseHeaders(),
        body: JSON.stringify({
            title: title,
            content: content
        })
    });

    if (response.ok) {
    alert("Innlegget ble lagret!");
    await loadPosts();
          showPosts();
} else {
    const errorText = await response.text();
    alert(errorText);
}
}
async function loadPosts() {
    const response = await fetch(SUPABASE_REST_URL + "/posts?select=*", {
    headers: supabaseHeaders()
});
const posts = await response.json();
document.getElementById("postsList").innerHTML = "";
for (const post of posts) {
   document.getElementById("postsList").innerHTML += `
    <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
<button onclick="editPost('${post.id}')">Rediger</button>
<button onclick="deletePost('${post.id}')">Slett</button>
    </div>

    `;
}
}
async function deletePost(id) {

const confirmDelete = confirm("Vil du slette dette innlegget?");
    
    if (!confirmDelete) {
        return;
    }

const response = await fetch(SUPABASE_REST_URL + "/posts?id=eq." + id, {
        method: "DELETE",
        headers: supabaseHeaders()
    });

    if (response.ok) {
        alert("Innlegget ble slettet!");
        await loadPosts();
    } else {
        console.log("DELETE FEIL STATUS:", response.status);
        const errorText = await response.text();
        alert(errorText);
    }

}
async function editPost(id) {
    const response = await fetch(SUPABASE_REST_URL + "/posts?id=eq." + id, {
        headers: supabaseHeaders()
    });

    const posts = await response.json();
    const post = posts[0];

    document.getElementById("postsList").innerHTML = `
        <h3>Rediger innlegg</h3>

        <label>Tittel</label>
        <input id="editTitle" value="${post.title}">

        <label>Innhold</label>
        <textarea id="editContent">${post.content}</textarea>

        <button onclick="updatePost('${post.id}')">Lagre endringer</button>
    `;
}

async function updatePost(id) {
    const title = document.getElementById("editTitle").value.trim();
    const content = document.getElementById("editContent").value.trim();

    const response = await fetch(SUPABASE_REST_URL + "/posts?id=eq." + id, {
        method: "PATCH",
        headers: supabaseHeaders(),
        body: JSON.stringify({
            title: title,
            content: content
        })
    });

    if (response.ok) {
        alert("Innlegget ble oppdatert!");
        await loadPosts();
    } else {
        const errorText = await response.text();
        alert(errorText);
    }
}