const centerRule = (activePage: number, total: any) => {
    if(activePage - 1 <= 0) {
        return 1;
    }
    if(activePage === total) {
        return activePage - 2;
    }

    return activePage - 1;
}

export const pagination = (total: any, activePage: number) => {
    if(total <= 5) {
        return Array.from({length: total}, (_: any, i: number) => i + 1);
    }

    const visiblePages = 3;
    let pages = [
        1,
        ...Array.from({length: visiblePages}, (_, i) => i + centerRule(activePage, total)),
        total
    ];
    // [1, 2, 3, 6] -> [1, 2, 3, ..., 6]
    pages = pages.filter((page, index, array) => array.indexOf(page) === index);
    
    const firstPage = pages[0];
    const secondPage = pages[1];
    if(firstPage === (secondPage - 2)) {  // [1, ..., 4, 5, 6]
        pages.splice(pages.indexOf(secondPage), 0, firstPage + 1);
    } else if(firstPage < (secondPage - 2)) {
        pages.splice(pages.indexOf(secondPage), 0, '...');
    }

    const penultimatePage = pages[pages.length - 2];
    const lastPage = pages[pages.length - 1];
    
    if(penultimatePage === (lastPage - 2)) {
        pages.splice(pages.indexOf(lastPage), 0, penultimatePage + 1);
    } else if(penultimatePage < (lastPage - 2)) { // [1, 4, 5, 6]    
        pages.splice(pages.indexOf(lastPage), 0, '...');
    }
    
    return pages;
}
    
