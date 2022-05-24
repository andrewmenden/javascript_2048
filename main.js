let board = [];
makeBoard();
spawnTile();
colorBoard();

function getColor(value) {
    switch (value) {
        case 0: return "#ccc0b4";
        case 2: return "#FAE7E0";
        case 4: return "#ECddC8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f57c5f";
        case 64: return "#f65d3b";
        case 128: return "#edce71";
        case 256: return "#edcb60";
        case 512: return "#eec750";
        case 1024: return "#ecc43e";
        case 2048: return "#eec22d";
        case 4096: return "#ef666d";
        case 8192: return "#ed4d57";
        case 16384: return "#f4403f";
        case 32678: return "#70b3d5";
        case 65536: return "#5ca0df";
        case 131072: return "#1783cc";
        }
}

function makeBoard() {
    for (let i = 0; i < 4; i++) {
        let curr = [];
        for (let j = 0; j < 4; j++) {
            const e = document.createElement("div");
            e.style.backgroundColor = "rgb(207, 207, 214)";
            e.style.display = "table-cell";
            e.style.gridColumn = "${j+1}";
            e.style.gridRow = "${i+1}";
            e.style.borderRadius = "10%";
            e.style.textAlign = "center";
            e.style.fontSize = "5vmin";
            e.style.paddingTop = "calc(10.875vmin - 0.5em)";
            e.style.fontFamily = "Arial, Helvetica, sans-serif";
            document.getElementById("board").appendChild(e);
            curr.push(e);
        }
        board.push(curr);
    }
}

function setBoard(newBoard) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j].innerHTML = newBoard[i][j].toString();
        }
    }
}

function moveRowLeft(row) {
    let output = [];
    for (let i = 0; i < 4; i++) {
        output[i] = Number(row[i].innerHTML);
    }
    
    let temp = [0,0,0,0];

    let j = 0;
    for (let i = 0; i < 4; i++) {
        if (output[i] != 0) {		
			if (j > 0 && output[i] == temp[j-1]) {
				temp[j-1] <<= 1;
			} else {
				temp[j] = output[i];
			}
			j++;
		}
    }

    j = 0;
	for (let i = 0; i < 4; i++) {
		output[i] = 0;
		if (temp[i] != 0) {
			output[j] = temp[i];
			j++;
		}
	}

    return output;
}

function moveRowRight(row) {
    let output = [];
    for (let i = 0; i < 4; i++) {
        output[i] = Number(row[i].innerHTML);
    }
    
    let temp = [0,0,0,0];

    let j = 0;
	for (let i = 0; i < 4; i++) {
		if (output[3-i] != 0) {
			if (j > 0 && output[3-i] == temp[4-j])
			{
				temp[4-j] <<= 1;
			} else {
				temp[3-j] = output[3-i];
			}
			j++;
		}	
	}

	j = 0;
	for (let i = 0; i < 4; i++) {
		output[3-i] = 0;
		if (temp[3-i] != 0) {
			output[3-j] = temp[3-i];
			j++;
		}
	}
    return output;
}

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        let curr = moveRowLeft(board[i]);

        for (let j = 0; j < 4; j++) {
            if (curr[j] === 0) {
                board[i][j].innerHTML = null;    
            } else {
                board[i][j].innerHTML = curr[j];
            }
        }
    }
    //maybe add animations
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        let curr = moveRowRight(board[i]);

        for (let j = 0; j < 4; j++) {
            if (curr[j] === 0) {
                board[i][j].innerHTML = null;    
            } else {
                board[i][j].innerHTML = curr[j];
            }
        }
    }
    //maybe add animations
}

function moveUp() {
    for (let i = 0; i < 4; i++) {
        let psuedoRow = [];
        for (let j = 0; j < 4; j++) {
            psuedoRow.push(board[j][i]);
        }
        psuedoRow = moveRowLeft(psuedoRow);
        for (let j = 0; j < 4; j++) {
            if (psuedoRow[j] === 0) {
                board[j][i].innerHTML = null;    
            } else {
                board[j][i].innerHTML = psuedoRow[j].toString();
            }
        }
    }
}

function moveDown() {
    for (let i = 0; i < 4; i++) {
        let psuedoRow = [];
        for (let j = 0; j < 4; j++) {
            psuedoRow.push(board[j][i]);
        }
        psuedoRow = moveRowRight(psuedoRow);
        for (let j = 0; j < 4; j++) {
            if (psuedoRow[j] === 0) {
                board[j][i].innerHTML = null;
            } else {
                board[j][i].innerHTML = psuedoRow[j].toString();
            }
        }
    }
}

function boardIsFull() {
    for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (board[i][j].innerHTML.length === 0) {
                return false;
            }
		}
	}

	return true;
}

function spawnTile() {
    if (boardIsFull()) {
        return;
    }

    let x = Math.floor(4*Math.random());
    let y = Math.floor(4*Math.random());

    while (board[y][x].innerHTML.length !== 0) {
        x = Math.floor(4*Math.random());
        y = Math.floor(4*Math.random());
    }

    if (Math.floor(20*Math.random()) === 0) {
        board[y][x].innerHTML = "4";
    } else {
        board[y][x].innerHTML = "2";
    }
}

function boardElementsToNumbers(board) {
    let output = []
    for (let i = 0; i < 4; i++) {
        let curr = [];
        for (let j = 0; j < 4; j++) {
            curr.push(Number(board[i][j].innerHTML));
        }
        output.push(curr);
    }
    return output
}

function boardEquals(board1, board2) {
    let boardNumber2 = boardElementsToNumbers(board2);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board1[i][j] != boardNumber2[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function colorBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j= 0; j < 4; j++) {
            let color = getColor(Number(board[i][j].innerHTML));
            board[i][j].style.backgroundColor = color;
            if (Number(board[i][j].innerHTML) == 2 ||Number(board[i][j].innerHTML) == 4) {
                board[i][j].style.color = "#776E65"
            } else {
                console.log("u was read");
                board[i][j].style.color = "#FFFFFF";
            }
        }
    }
}

document.addEventListener("keydown", (event)=> {
    let oldBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (let i = 0; i < 4; i++) {
        for (let j= 0; j < 4; j++) {
            oldBoard[i][j] = Number(board[i][j].innerHTML);
        }
    }

    switch (event.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight()
            break;
        case "ArrowUp":
            moveUp()
            break;
        case "ArrowDown":
            moveDown()
            break;
        default:
            return;
    }
    if (!boardEquals(oldBoard, board)) {
        spawnTile();
        colorBoard();
    }

})
