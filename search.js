document.addEventListener("DOMContentLoaded", function() {

  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  input.addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();
    results.innerHTML = "";

    if (!keyword) return;

    const filtered = PITU_DATABASE.filter(item =>
      item.name.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
      results.innerHTML = `<div class="no-result">Không tìm thấy</div>`;
      return;
    }

    filtered.forEach(item => {
      const div = document.createElement("a");
      div.href = "/mdvh18/" + item.id + "/";
      div.className = "search-item";

      div.innerHTML = `
        <img src="${item.banner}" />
        <span>${item.name}</span>
      `;

      results.appendChild(div);
    });
  });

});
