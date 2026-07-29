document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.content');

    function showSection(id, animate) {
        const target = document.getElementById(id);
        if (!target) return;
        const current = document.querySelector('.content.active');
        if (current === target) return;

        if (!animate) {
            if (current) current.classList.remove('active');
            target.classList.add('active');
            return;
        }

        // zmierz wysokość przed i po podmianie treści, potem animuj height
        const startHeight = container.offsetHeight;
        if (current) current.classList.remove('active');
        target.classList.add('active');

        container.style.height = 'auto';
        const endHeight = container.offsetHeight;

        container.style.height = startHeight + 'px';
        container.offsetHeight; // wymuś reflow, żeby przeglądarka zarejestrowała start
        container.style.height = endHeight + 'px';

        container.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName !== 'height') return;
            container.style.height = 'auto';
            container.removeEventListener('transitionend', onEnd);
        });
    }

    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const id = link.getAttribute('data-section');
            history.replaceState(null, '', '#' + id);
            showSection(id, true);
        });
    });

    // otwórz sekcję z hasha przy wejściu (np. link do /#articles)
    const initial = location.hash.replace('#', '');
    if (initial && document.getElementById(initial)) {
        showSection(initial, false);
    }

    // filtrowanie artykułów po tagach
    const tags = document.querySelectorAll('.tag');
    const articles = document.querySelectorAll('.article-tile');
    let activeTag = null;

    tags.forEach(tag => {
        tag.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedTag = tag.textContent.trim().toLowerCase();

            if (activeTag === selectedTag) {
                activeTag = null;
                tags.forEach(t => t.classList.remove('active-tag'));
                articles.forEach(article => article.style.display = 'flex');
            } else {
                activeTag = selectedTag;
                tags.forEach(t => t.classList.remove('active-tag'));
                tag.classList.add('active-tag');
                articles.forEach(article => {
                    const articleTags = article.getAttribute('data-tags').split(',').map(t => t.trim().toLowerCase());
                    if (articleTags.includes(selectedTag)) {
                        article.style.display = 'flex';
                    } else {
                        article.style.display = 'none';
                    }
                });
            }

            // po filtrowaniu dopasuj wysokość kontenera
            container.style.height = 'auto';
        });
    });
});
