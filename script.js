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