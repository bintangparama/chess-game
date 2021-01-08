const grid = document.getElementById('grid');
const sidebar = document.getElementById('sidebar')
var griditems = [];
var pieces = [];
var moves = [];
var discardedpieces = [];

var vmin = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
var vmax = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;

var IsPortrait = false;
if (window.innerWidth < window.innerHeight) {
    sidebar.style.width = '100vw';
    sidebar.style.height = '10vh';
    IsPortrait = true;
}

var darkcolor = 'rgba(87, 59, 4, 1)';
var lightcolor = 'rgba(204, 180, 131, 1)';

var piecedata = [
    { id: 0, src: './assets/black_rook.png', color: 'black', type: 'rook' },
    { id: 1, src: './assets/black_knight.png', color: 'black', type: 'knight' },
    { id: 2, src: './assets/black_bishop.png', color: 'black', type: 'bishop' },
    { id: 3, src: './assets/black_queen.png', color: 'black', type: 'queen' },
    { id: 4, src: './assets/black_king.png', color: 'black', type: 'king' },
    { id: 5, src: './assets/black_bishop.png', color: 'black', type: 'bishop' },
    { id: 6, src: './assets/black_knight.png', color: 'black', type: 'knight' },
    { id: 7, src: './assets/black_rook.png', color: 'black', type: 'rook' },
    { id: 8, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 9, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 10, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 11, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 12, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 13, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 14, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },
    { id: 15, src: './assets/black_pawn.png', color: 'black', type: 'pawn' },

    { id: 48, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 49, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 50, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 51, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 52, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 53, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 54, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 55, src: './assets/white_pawn.png', color: 'white', type: 'pawn' },
    { id: 56, src: './assets/white_rook.png', color: 'white', type: 'rook' },
    { id: 57, src: './assets/white_knight.png', color: 'white', type: 'knight' },
    { id: 58, src: './assets/white_bishop.png', color: 'white', type: 'bishop' },
    { id: 59, src: './assets/white_queen.png', color: 'white', type: 'queen' },
    { id: 60, src: './assets/white_king.png', color: 'white', type: 'king' },
    { id: 61, src: './assets/white_bishop.png', color: 'white', type: 'bishop' },
    { id: 62, src: './assets/white_knight.png', color: 'white', type: 'knight' },
    { id: 63, src: './assets/white_rook.png', color: 'white', type: 'rook' }
];

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        var tile = document.createElement('div');
        tile.style.textAlign = 'center';
        tile.className = 'tile';
        
        if ((i + j) % 2 === 0) {
            tile.style.backgroundColor = lightcolor;
            tile.setAttribute('data-color', 'light');
        } else {
            tile.style.backgroundColor = darkcolor;
            tile.setAttribute('data-color', 'dark');
        }
        grid.appendChild(tile);
        griditems.push(tile)
    }
}

piecedata.forEach((val) => {
    var img = createimg(val.src);
    img.setAttribute('data-color', val.color);
    img.setAttribute('data-type', val.type);
    if (val.type === 'pawn') {
        img.setAttribute('data-first-move', 'no');
    }
    griditems[val.id].appendChild(img);
    pieces.push(img);
});

var original;
var available = [];
var availablepieces = [];

document.addEventListener('dragstart', (e) => {
    original = e.target;
    setTimeout(() => e.target.style.display = 'none', 0);
    available = [];

    switch (e.target.getAttribute('data-type')) {
        case 'pawn':
            var index = griditems.indexOf(e.target.parentNode);
            var IsBlack = e.target.getAttribute('data-color') === 'black';
            index = IsBlack ? index + 8 : index - 8;
            var item = griditems[index];
            
            if (!item.hasChildNodes()) {
                item.style.backgroundColor = item.getAttribute('data-color') + 'green';
                available.push(item);

                if (e.target.getAttribute('data-type') === 'pawn' && e.target.getAttribute('data-first-move') === 'no') {
                    index = IsBlack ? index + 8 : index - 8;
                    available.push(griditems[index]);
                }
            }

            index = griditems.indexOf(e.target.parentNode);
            var newid = IsBlack ? index + 7 : index - 7;
            var correctrow = IsBlack ? (index - (index % 8 )) + 8 === (newid - (newid % 8)) : (index - (index % 8 )) - 8 === (newid - (newid % 8));
            item = griditems[newid];

            if (item.hasChildNodes() && correctrow){
                var childcolor = item.firstChild.getAttribute('data-color');
                var targetcolor = e.target.getAttribute('data-color');
                check = false;
                if (childcolor !== targetcolor) {
                    available.push(item);
                    console.log(item);
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            var newid = IsBlack ? index + 9 : index - 9;
            var correctrow = IsBlack ? (index - (index % 8 )) + 8 === (newid - (newid % 8)) : (index - (index % 8 )) - 8 === (newid - (newid % 8));
            item = griditems[newid];

            if (item.hasChildNodes() && correctrow){
                var childcolor = item.firstChild.getAttribute('data-color');
                var targetcolor = e.target.getAttribute('data-color');
                check = false;
                if (childcolor !== targetcolor) {
                    available.push(item);
                    console.log(item);
                }
            }

            available.forEach((val) => val.style.backgroundColor = val.getAttribute('data-color') + 'green');
            break;
        case 'bishop':
            var index = griditems.indexOf(e.target.parentNode);
            var check = true;

            while (check) {
                var newid = index - 7;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            var index = griditems.indexOf(e.target.parentNode);
            var check = true;

            while (check) {
                var newid = index + 7;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            var index = griditems.indexOf(e.target.parentNode);
            var check = true;

            while (check) {
                var newid = index - 9;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            var index = griditems.indexOf(e.target.parentNode);
            var check = true;

            while (check) {
                var newid = index + 9;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }

            available.forEach((val) => val.style.backgroundColor = val.getAttribute('data-color') + 'green');
            break;
        case 'king': 
            var index = griditems.indexOf(e.target.parentNode);
            var kingmoves = [-9,-8,-7,-1,1,7,8,9];
            kingmoves.forEach((val) => {
                if (Math.abs(val) === 1) {
                    var newid = index + val;
                    var item = griditems[newid];
                    var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                    
                    if (item !== null && item !== undefined && correctrow) {
                        if (!item.hasChildNodes()) {
                            available.push(item);
                            console.log(item);
                        } else {
                            var childcolor = item.firstChild.getAttribute('data-color');
                            var targetcolor = e.target.getAttribute('data-color');
                            check = false;
                            if (childcolor !== targetcolor) {
                                available.push(item);
                                console.log(item);
                            }
                        }
                    }
                } else {
                    if (Math.abs(val) !== val) {
                        var newid = index + val;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        
                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = e.target.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    available.push(item);
                                    console.log(item);
                                }
                            }
                        }
                    } else {
                        var newid = index + val;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        
                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = e.target.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    available.push(item);
                                    console.log(item);
                                }
                            }
                        }
                    }
                }
            });

            available.forEach((val) => val.style.backgroundColor = val.getAttribute('data-color') + 'green');
            break;
        case 'rook':
            var index = griditems.indexOf(e.target.parentNode);
            var check = true;

            while (check) {
                var newid = index - 8;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;

            while (check) {
                var newid = index + 8;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;

            while (check) {
                var newid = index - 1;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                check = check && correctrow;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;

            while (check) {
                var newid = index + 1;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                check = check && correctrow;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }

            available.forEach((val) => val.style.backgroundColor = val.getAttribute('data-color') + 'green');
            break;
        case 'knight':
            var index = griditems.indexOf(e.target.parentNode);
            var knightmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
            knightmoves.forEach((val) => {
                if (Math.abs(val) === 17 || Math.abs(val) === 15) {
                    if (Math.abs(val) !== val) {
                        var newid = index + val;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 16 === (newid - (newid % 8));

                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = e.target.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    available.push(item);
                                    console.log(item);
                                }
                            }
                        }
                    } else {
                        var newid = index + val;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 16 === (newid - (newid % 8));

                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = e.target.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    available.push(item);
                                    console.log(item);
                                }
                            }
                        }
                    }
                } else {
                    if (Math.abs(val) !== val) {
                        var newid = index + val;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));

                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = e.target.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    available.push(item);
                                    console.log(item);
                                }
                            }
                        }
                    } else {
                        var newid = index + val;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));

                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = e.target.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    available.push(item);
                                    console.log(item);
                                }
                            }
                        }
                    }
                }
            });

            available.forEach((val) => val.style.backgroundColor = val.getAttribute('data-color') + 'green');
            break;
        case 'queen':
            var index = griditems.indexOf(e.target.parentNode);
            var check = true;
            while (check) {
                var newid = index - 7;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index + 7;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index - 9;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index + 9;
                var item = griditems[newid];
                var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                check = item !== null;
                check = check && correctrow;
                index = newid;

                if (check && item !== undefined) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index - 8;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index + 8;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index - 1;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                check = check && correctrow;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }
            index = griditems.indexOf(e.target.parentNode);
            check = true;
            while (check) {
                var newid = index + 1;
                var item = griditems[newid];
                check = item !== null && item !== undefined;
                var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                check = check && correctrow;
                index = newid;
                
                if (check) {
                    if (!item.hasChildNodes()) {
                        available.push(item);
                        console.log(item);
                    } else {
                        var childcolor = item.firstChild.getAttribute('data-color');
                        var targetcolor = e.target.getAttribute('data-color');
                        check = false;
                        if (childcolor !== targetcolor) {
                            available.push(item);
                            console.log(item);
                        }
                    }
                }
            }

            available.forEach((val) => val.style.backgroundColor = val.getAttribute('data-color') + 'green');
            break;
        default:
            break;
    }
});
document.addEventListener('dragend', (e) => {
    e.target.style.display = '';
    griditems.forEach((val) => {
        val.style.backgroundColor = val.getAttribute('data-color') === 'dark' ? darkcolor : lightcolor;
        val.style.opacity = 1;
    });
    pieces.forEach((val) => {
        val.style.opacity = 1;
    });
});
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('dragenter', (e) => {
    if (e.target.className === 'tile' || e.target.className === 'pieces' && !e.target.hasChildNodes()) {
        e.target.style.opacity = 0.7;
    }
});
document.addEventListener('dragleave', (e) => {
    if (e.target.className === 'tile' || e.target.className === 'pieces') {
        e.target.style.opacity = 1;
        e.target.parentNode.style.opacity = 1;
    }
});
document.addEventListener('drop', (e) => {
    e.preventDefault();

    if (e.target.className === 'tile' && !e.target.hasChildNodes()) {
        if (available.includes(e.target)) {
            moves.push({from: original.parentNode, to: e.target, piece: original, eatenpiece: false});
            e.target.parentNode.style.opacity = 1;
            original.parentNode.removeChild(original);
            e.target.appendChild(original);

            if (original.getAttribute('data-type') === 'pawn' && original.getAttribute('data-first-move') === 'no') {
                original.setAttribute('data-first-move', 'yes');
            }
        }
    } else if (e.target.className === 'tile' && e.target.hasChildNodes()) {
        if (available.includes(e.target)) {
            if (original.getAttribute('data-color') !== e.target.firstChild.getAttribute('data-color')) {
                if (e.target.getAttribute('data-type') === 'king'){
                    alert((original.getAttribute('data-color') === 'black' ? 'Black' : 'White') + ' won.')
                } else {
                    moves.push({from: original.parentNode, to: e.target, piece: original, eatenpiece: true, from2: e.target, piece2: e.target.firstChild});
                    original.parentNode.removeChild(original);
                    e.target.appendChild(original);
                    e.target.removeChild(e.target.firstChild);
                    pieces.splice(pieces.indexOf(e.target.firstChild), 1);
                }
            }
        }
    }

    if (e.target.className === 'pieces') {
        if (available.includes(e.target.parentNode)) {
            e.target.style.opacity = 1;
            if (original.getAttribute('data-color') !== e.target.getAttribute('data-color')) {
                if (e.target.getAttribute('data-type') === 'king'){
                    alert((original.getAttribute('data-color') === 'black' ? 'Black' : 'White') + ' won.')
                } else {
                    moves.push({from: original.parentNode, piece: original, eatenpiece: true, from2: e.target.parentNode, piece2: e.target});
                    original.parentNode.removeChild(original);
                    e.target.parentNode.appendChild(original);
                    e.target.parentNode.removeChild(e.target);
                    var text = (IsPortrait ? '' : '\n') +  ` ${e.target.getAttribute('data-color')} ${e.target.getAttribute('data-type')},`
                    discardedpieces.push(text);
                }
            }
        }
    }

    sidebar.innerText = '';
    discardedpieces.forEach((val) => sidebar.innerText = sidebar.innerText + val);
    checkcheck()
});
function createimg(src) {
    var img = document.createElement('img');
    var isPawn = src === './assets/black_pawn.png' || src === './assets/white_pawn.png'
    img.src = src;
    img.draggable = true;
    img.width = isPawn ? vmin / 11 : vmin / 9;
    img.height = vmin / 9;
    img.className = 'pieces';

    return img;
}
function checkcheck() {
    var kingindex;
    var checkspaces = [];
    pieces.forEach((val) => {
        if (val.getAttribute('data-color') === 'white') {
            var index = griditems.indexOf(val.parentNode);

            switch (val.getAttribute('data-type')) {
                case 'pawn':
                    var newid = index - 9;
                    var item = griditems[newid];
                    var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                    
                    if (item !== null && item !== undefined && correctrow) {
                        if (!item.hasChildNodes()) {
                            checkspaces.push(griditems.indexOf(item));
                        } else {
                            var childcolor = item.firstChild.getAttribute('data-color');
                            var targetcolor = val.getAttribute('data-color');
                            check = false;
                            if (childcolor !== targetcolor) {
                                checkspaces.push(griditems.indexOf(item));
                            }
                        }
                    }
                    var newid = index - 7;
                    var item = griditems[newid];
                    var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                    
                    if (item !== null && item !== undefined && correctrow) {
                        if (!item.hasChildNodes()) {
                            checkspaces.push(griditems.indexOf(item));
                        } else {
                            var childcolor = item.firstChild.getAttribute('data-color');
                            var targetcolor = val.getAttribute('data-color');
                            check = false;
                            if (childcolor !== targetcolor) {
                                checkspaces.push(griditems.indexOf(item));
                            }
                        }
                    }
                    break;
                case 'bishop':
                    index = griditems.indexOf(val.parentNode);
                    var check = true;
                    while (check) {
                        var newid = index - 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index - 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    break;
                case 'rook': 
                    index = griditems.indexOf(val.parentNode);
                    var check = true;
        
                    while (check) {
                        var newid = index - 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index - 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    break;
                case 'knight':
                    var knightmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
                    knightmoves.forEach((move) => {
                        if (Math.abs(move) === 17 || Math.abs(move) === 15) {
                            if (Math.abs(move) !== move) {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) - 16 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            } else {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) + 16 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            }
                        } else {
                            if (Math.abs(move) !== move) {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            } else {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            }
                        }
                    });
                    break;
                case 'king': 
                var kingmoves = [-9,-8,-7,-1,1,7,8,9];
                kingmoves.forEach((move) => {
                    if (Math.abs(move) === 1) {
                        var newid = index + move;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        
                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    } else {
                        if (Math.abs(move) !== move) {
                            var newid = index + move;
                            var item = griditems[newid];
                            var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                            
                            if (item !== null && item !== undefined && correctrow) {
                                if (!item.hasChildNodes()) {
                                    checkspaces.push(griditems.indexOf(item));
                                } else {
                                    var childcolor = item.firstChild.getAttribute('data-color');
                                    var targetcolor = val.getAttribute('data-color');
                                    check = false;
                                    if (childcolor !== targetcolor) {
                                        checkspaces.push(griditems.indexOf(item));
                                    }
                                }
                            }
                        } else {
                            var newid = index + move;
                            var item = griditems[newid];
                            var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                            
                            if (item !== null && item !== undefined && correctrow) {
                                if (!item.hasChildNodes()) {
                                    checkspaces.push(griditems.indexOf(item));
                                } else {
                                    var childcolor = item.firstChild.getAttribute('data-color');
                                    var targetcolor = val.getAttribute('data-color');
                                    check = false;
                                    if (childcolor !== targetcolor) {
                                        checkspaces.push(griditems.indexOf(item));
                                    }
                                }
                            }
                        }
                    }
                });
                    break;
                case 'queen': 
                    index = griditems.indexOf(val.parentNode);
                    var check = true;
                    while (check) {
                        var newid = index - 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index - 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index - 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index - 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    break;
            }
        } else if (val.getAttribute('data-color') === 'black' && val.getAttribute('data-type') === 'king') {
            kingindex = griditems.indexOf(val.parentNode);
        }
    });
    checkspaces.forEach((val) => {
        if (val === kingindex) alert('white checks black king');
    });
    checkspaces = [];

    pieces.forEach((val) => {
        if (val.getAttribute('data-color') === 'black') {
            var index = griditems.indexOf(val.parentNode);

            switch (val.getAttribute('data-type')) {
                case 'pawn':
                    var newid = index + 9;
                    var item = griditems[newid];
                    var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                    
                    if (item !== null && item !== undefined && correctrow) {
                        if (!item.hasChildNodes()) {
                            checkspaces.push(griditems.indexOf(item));
                        } else {
                            var childcolor = item.firstChild.getAttribute('data-color');
                            var targetcolor = val.getAttribute('data-color');
                            check = false;
                            if (childcolor !== targetcolor) {
                                checkspaces.push(griditems.indexOf(item));
                            }
                        }
                    }
                    var newid = index + 7;
                    var item = griditems[newid];
                    var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                    
                    if (item !== null && item !== undefined && correctrow) {
                        if (!item.hasChildNodes()) {
                            checkspaces.push(griditems.indexOf(item));
                        } else {
                            var childcolor = item.firstChild.getAttribute('data-color');
                            var targetcolor = val.getAttribute('data-color');
                            check = false;
                            if (childcolor !== targetcolor) {
                                checkspaces.push(griditems.indexOf(item));
                            }
                        }
                    }
                    break;
                case 'bishop':
                    index = griditems.indexOf(val.parentNode);
                    var check = true;
                    while (check) {
                        var newid = index - 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index - 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    break;
                case 'rook': 
                    index = griditems.indexOf(val.parentNode);
                    var check = true;
        
                    while (check) {
                        var newid = index - 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index - 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    break;
                case 'knight':
                    var knightmoves = [-17, -15, -10, -6, 6, 10, 15, 17];
                    knightmoves.forEach((move) => {
                        if (Math.abs(move) === 17 || Math.abs(move) === 15) {
                            if (Math.abs(move) !== move) {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) - 16 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            } else {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) + 16 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            }
                        } else {
                            if (Math.abs(move) !== move) {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            } else {
                                var newid = index + move;
                                var item = griditems[newid];
                                var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
        
                                if (item !== null && item !== undefined && correctrow) {
                                    if (!item.hasChildNodes()) {
                                        checkspaces.push(griditems.indexOf(item));
                                    } else {
                                        var childcolor = item.firstChild.getAttribute('data-color');
                                        var targetcolor = val.getAttribute('data-color');
                                        check = false;
                                        if (childcolor !== targetcolor) {
                                            checkspaces.push(griditems.indexOf(item));
                                        }
                                    }
                                }
                            }
                        }
                    });
                    break;
                case 'king': 
                var kingmoves = [-9,-8,-7,-1,1,7,8,9];
                kingmoves.forEach((move) => {
                    if (Math.abs(move) === 1) {
                        var newid = index + move;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        
                        if (item !== null && item !== undefined && correctrow) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    } else {
                        if (Math.abs(move) !== move) {
                            var newid = index + move;
                            var item = griditems[newid];
                            var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                            
                            if (item !== null && item !== undefined && correctrow) {
                                if (!item.hasChildNodes()) {
                                    checkspaces.push(griditems.indexOf(item));
                                } else {
                                    var childcolor = item.firstChild.getAttribute('data-color');
                                    var targetcolor = val.getAttribute('data-color');
                                    check = false;
                                    if (childcolor !== targetcolor) {
                                        checkspaces.push(griditems.indexOf(item));
                                    }
                                }
                            }
                        } else {
                            var newid = index + move;
                            var item = griditems[newid];
                            var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                            
                            if (item !== null && item !== undefined && correctrow) {
                                if (!item.hasChildNodes()) {
                                    checkspaces.push(griditems.indexOf(item));
                                } else {
                                    var childcolor = item.firstChild.getAttribute('data-color');
                                    var targetcolor = val.getAttribute('data-color');
                                    check = false;
                                    if (childcolor !== targetcolor) {
                                        checkspaces.push(griditems.indexOf(item));
                                    }
                                }
                            }
                        }
                    }
                });
                    break;
                case 'queen': 
                    index = griditems.indexOf(val.parentNode);
                    var check = true;
                    while (check) {
                        var newid = index - 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 7;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index - 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) - 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
                    while (check) {
                        var newid = index + 9;
                        var item = griditems[newid];
                        var correctrow = (index - (index % 8 )) + 8 === (newid - (newid % 8));
                        check = item !== null;
                        check = check && correctrow;
                        index = newid;
        
                        if (check && item !== undefined) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index - 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 8;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                available.push(item);
                                console.log(item);
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index - 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    index = griditems.indexOf(val.parentNode);
                    check = true;
        
                    while (check) {
                        var newid = index + 1;
                        var item = griditems[newid];
                        check = item !== null && item !== undefined;
                        var correctrow = (index - (index % 8 )) === (newid - (newid % 8));
                        check = check && correctrow;
                        index = newid;
                        
                        if (check) {
                            if (!item.hasChildNodes()) {
                                checkspaces.push(griditems.indexOf(item));
                            } else {
                                var childcolor = item.firstChild.getAttribute('data-color');
                                var targetcolor = val.getAttribute('data-color');
                                check = false;
                                if (childcolor !== targetcolor) {
                                    checkspaces.push(griditems.indexOf(item));
                                }
                            }
                        }
                    }
                    break;
            }
        } else if (val.getAttribute('data-color') === 'black' && val.getAttribute('data-type') === 'king') {
            kingindex = griditems.indexOf(val.parentNode);
        }
    });
}
function undo() {
    if (moves.length > 0) {
        var move = moves[moves.length - 1];

        move.from.appendChild(move.piece);

        if (move.eatenpiece) {
            move.from2.appendChild(move.piece2);
            discardedpieces.splice(discardedpieces.length - 1, 1);

            sidebar.innerText = '';
            discardedpieces.forEach((val) => sidebar.innerText = sidebar.innerText + val);
        }
        moves.splice(moves.length - 1, 1);
    }
}
