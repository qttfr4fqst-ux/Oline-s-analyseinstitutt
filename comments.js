function showComments() {
    document.getElementById("adminContent").innerHTML = `
        <h2>💬 Kommentarer</h2>

        <button onclick="loadComments()">
            Oppdater kommentarer
        </button>

        <div id="commentsList">
            Ingen kommentarer enda.
        </div>
    `;
}
async function loadComments() {

const response = await fetch(SUPABASE_REST_URL + "/comments?select=*,posts!comments_post_id_fkey(*)", {
        headers: supabaseHeaders()
    });

   const comments = await response.json();

console.log("SVAR FRA SUPABASE:", comments);

    const list = document.getElementById("commentsList");

    if (comments.length === 0) {
        list.innerHTML = "Ingen kommentarer enda.";
        return;
    }

    list.innerHTML = "";

    comments.forEach(comment => {

list.innerHTML += `
    <div class="post-card">

        <h3>${comment.name}</h3>

        <p>${comment.comment}</p>

        <p>Godkjent: ${comment.approved}</p>

        <p>Innlegg: ${comment.posts?.title || "Ukjent innlegg"}</p>

        ${
            comment.approved
            ? ""
            :
            `<button onclick="approveComment('${comment.id}')">
                Godkjenn
            </button>`
        }

        <button onclick="deleteComment('${comment.id}')">
            Slett
        </button>

    </div>
`;

    });
}