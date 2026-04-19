// ===== 테마 전환 =====
const toggleBtn = document.getElementById('theme-toggle');

// 저장된 테마 불러오기
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️ Light';
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️ Light';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.textContent = '🌙 Dark';
    localStorage.setItem('theme', 'light');
  }
});

// ===== 프로젝트 필터링 =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // active 버튼 변경
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== GitHub API =====
async function loadGitHub() {
    const profileCard = document.getElementById('profile-card');
    const repoGrid = document.getElementById('repo-grid');

    if (!profileCard || !repoGrid) return;

    try {
        // 프로필 불러오기
        const profileRes = await fetch('https://api.github.com/users/ihh25');
        const profile = await profileRes.json();

        profileCard.innerHTML = `
            <img src="${profile.avatar_url}" alt="avatar" class="github-avatar" />
            <div class="github-profile-info">
                <h3>${profile.name || profile.login}</h3>
                <p>${profile.bio || ''}</p>
                <div class="github-stats">
                    <span>📁 Repos: ${profile.public_repos}</span>
                    <span>👥 Followers: ${profile.followers}</span>
                    <span>➡️ Following: ${profile.following}</span>
                </div>
                <a href="${profile.html_url}" target="_blank" class="github-link">View on GitHub</a>
            </div>
        `;

        // 저장소 불러오기
        const repoRes = await fetch('https://api.github.com/users/ihh25/repos?sort=updated');
        const repos = await repoRes.json();

        repoGrid.innerHTML = repos.map(repo => `
            <div class="repo-card">
                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                <p>${repo.description || 'No description'}</p>
                <div class="repo-meta">
                    <span>💻 ${repo.language || 'N/A'}</span>
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        profileCard.innerHTML = '<p>Failed to load GitHub data.</p>';
        repoGrid.innerHTML = '<p>Failed to load repositories.</p>';
    }
}

loadGitHub();