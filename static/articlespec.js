document.addEventListener('DOMContentLoaded', (event) => {
    const toc = document.querySelector('.table-of-contents');
    const sections = Array.from(document.querySelectorAll('.section, .subsection, .subsubsection'));

    let sectionCounter = 0, subsectionCounter = 0, subsubsectionCounter = 0;

    sections.forEach((section, index) => {
        const id = `section-${index}`;
        section.id = id;

        const link = document.createElement('a');
        link.href = `#${id}`;

        const listItem = document.createElement('li');
        listItem.className = section.className;

        if (section.className === 'section') {
            sectionCounter++;
            subsectionCounter = 0;
            link.textContent = `${sectionCounter} ----------- ${section.textContent}`;
        } else if (section.className === 'subsection') {
            subsectionCounter++;
            subsubsectionCounter = 0;
            link.textContent = `${sectionCounter}.${subsectionCounter} ----------- ${section.textContent}`;
            listItem.style.paddingLeft = '15px';
        } else if (section.className === 'subsubsection') {
            subsubsectionCounter++;
            link.textContent = `${sectionCounter}.${subsectionCounter}.${subsubsectionCounter} ----------- ${section.textContent}`;
            listItem.style.paddingLeft = '30px';
        }

        listItem.appendChild(link);
        toc.appendChild(listItem);
    });
});