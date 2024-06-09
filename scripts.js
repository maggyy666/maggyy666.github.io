document.addEventListener('DOMContentLoaded', function () {
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
        });
    });
    
});


