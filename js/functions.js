function error(errorType, errorMessage, e) {
    var dangerBlock = document.createElement("div");
    dangerBlock.className = "alert alert-" + errorType + " " + "dangerBlock";
    dangerBlock.role = "alert";
    dangerBlock.innerHTML = errorMessage;
    document.body.append(dangerBlock);
    var errorHeight = dangerBlock.offsetHeight;
    dangerBlock.style.top = "-" + errorHeight + "px";
    var errorClose = false;
    dangerBlock.addEventListener("click", function () {
        errorClose = true;
    });
    imgClose = document.createElement("img");
    imgClose.src = "img/close.svg";
    imgClose.style.position = "absolute";
    imgClose.style.right = "30px";

    dangerBlock.append(imgClose);
    let count = 0;
    let interval = setInterval(() => {
        if (count === 1) {
            dangerBlock.style.top = "3vh";
            errorClose = false;
        } else if (errorClose == true || count === 10) {
            clearInterval(interval);
            dangerBlock.style.top = "-" + errorHeight + "px";
        }
        count++;
    }, 500);
    e.preventDefault();
}

function getCell(row, coord) {
    const index = parseInt(row) - 1;
    if (coord === "x") {
        return index * cellHeight;
    } else if (coord === "y") {
        return index * cellWidth;
    }
    return 0;
}

function getCellCoords(cellId) {
    const row = cellId[4];
    const col = cellId[5];

    return [row, col];
}

function getCellIdFromCoords(row, col) {
    return "id" + row + col;
}

function isCellOccupied(row, col) {
    if (row >= 1 && row <= 8 && col >= 1 && col <= 8) {
        const cellId = getCellIdFromCoords(row, col);
        const cell = $("#" + cellId);

        return cell.attr("class").split(" ").some((className) =>
            className.startsWith("cell_white_") || className.startsWith("cell_black_")
        );
    }
    return true; // Считаем, что клетки за пределами доски заняты.Или нет ?
}
function calculatePossibleMoves(figureElement) {
    const pawn = /pawn/g;
    const night = /night/g;
    const bishop = /bishop/g;
    const rook = /rook/g;
    const queen = /queen/g;
    const king = /king/g;

    const figureClass = figureElement.attr("class").split(" ")[0];

    const figureType = figureClass.split("_")[1];
    const figureCount = figureClass.split("_")[2];

    const figureColor = figureClass.split("_")[0];

    const currentCellId = figureElement.attr("class").split(" ")[2];

    const [currentRow, currentCol] = getCellCoords(currentCellId);

    const possibleMoves = [];

    if (pawn.test(figureType)) {
        if (figureColor === "white") {
            var direction = 1;
            var startRow = 2;
        } else {
            var direction = -1;
            var startRow = 7;
        }

        // Ход вперед это тебе не назад
        const oneStepForwardRow = parseInt(currentRow) + parseInt(direction);

        const oneStepForwardCellId = getCellIdFromCoords(
            oneStepForwardRow,
            currentCol
        );
        const oneStepForwardCol = currentCol;
        if (oneStepForwardRow >= 1 && oneStepForwardRow <= 8 && !isCellOccupied(oneStepForwardRow, currentCol)
        ) {
            possibleMoves.push(oneStepForwardCellId);

            // Ход вперед на две клетки (Ну ты фокусник)
            const twoStepsForwardRow = parseInt(currentRow) + 2 * parseInt(direction);
            const twoStepsForwardCellId = getCellIdFromCoords(
                twoStepsForwardRow,
                currentCol
            );
            const intermediateRow = parseInt(currentRow) + parseInt(direction);
            if (currentRow == startRow && !isCellOccupied(intermediateRow, oneStepForwardCol) && !isCellOccupied(twoStepsForwardRow, oneStepForwardCol)) {
                if (!isCellOccupied(twoStepsForwardRow, oneStepForwardCol) && !figureElement.attr("class").includes("moved")) {
                    possibleMoves.push(twoStepsForwardCellId);
                }
            }
        }

        // Братиш я тебе покушать принес
        const diagonalMoves = [
            [parseInt(currentRow) + parseInt(direction), parseInt(currentCol) - 1],
            [parseInt(currentRow) + parseInt(direction), parseInt(currentCol) + 1],
        ];

        diagonalMoves.forEach(([diagRow, diagCol]) => {
            const diagonalCellId = getCellIdFromCoords(diagRow, diagCol);

            if (diagRow >= 1 && diagRow <= 8 && diagCol >= 1 && diagCol <= 8) {
                const targetFigure = $("#" + diagonalCellId);

                if (targetFigure.length > 0 && isCellOccupied(diagRow, diagCol)) {
                    var targetColor = targetFigure.attr("class").split("_")[1];
                    if (!(figureColor == targetColor)) {
                        possibleMoves.push(diagonalCellId);
                    }
                }
            }
        });
    }
    if (night.test(figureType)) {
        const knightMoves = [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1],
        ];
        //НЕ НЕ ЭТО НЕ СВАСТОН!!Это знак солнца 卐
        knightMoves.forEach(([rowOffset, colOffset]) => {
            const newRow = parseInt(currentRow) + rowOffset;
            const newCol = parseInt(currentCol) + colOffset;

            if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {
                const targetCellId = getCellIdFromCoords(newRow, newCol);
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = targetCell
                    .attr("class")
                    .split(" ")
                    .some(
                        (className) =>
                            className.startsWith("cell_white_") ||
                            className.startsWith("cell_black_")
                    );

                if (
                    !isTargetOccupied ||
                    (isTargetOccupied &&
                        !targetCell.attr("class").includes(figureColor.split("_")[0]))
                ) {
                    possibleMoves.push(targetCellId);
                }
            }
        });
    }
    if (bishop.test(figureType)) {
        const diagonalDirections = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1], // вверх-влево, вверх-вправо, вниз-влево, вниз-вправо.А может не нада?
        ];

        for (const [rowDir, colDir] of diagonalDirections) {
            let currentRowBishop = parseInt(currentRow) + rowDir;
            let currentColBishop = parseInt(currentCol) + colDir;

            while (
                currentRowBishop >= 1 &&
                currentRowBishop <= 8 &&
                currentColBishop >= 1 &&
                currentColBishop <= 8
            ) {
                const targetCellId = getCellIdFromCoords(
                    currentRowBishop,
                    currentColBishop
                );
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = isCellOccupied(
                    currentRowBishop,
                    currentColBishop
                );

                if (!isTargetOccupied) {
                    possibleMoves.push(targetCellId);
                } else {
                    if (!targetCell.attr("class").includes(figureColor.split("_")[0])) {
                        possibleMoves.push(targetCellId); // Хавай братиш,хавай
                    }
                    break; // Дальше незя.ТЫ НЕ ПРОЙДЕШЬ! :)
                }

                currentRowBishop += rowDir;
                currentColBishop += colDir;
            }
        }
    }
    if (rook.test(figureType)) {
        const straightDirections = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1], // вверх, вниз, влево, вправо.А потом в дурку, да?
        ];

        for (const [rowDir, colDir] of straightDirections) {
            let currentRowRook = parseInt(currentRow) + rowDir;
            let currentColRook = parseInt(currentCol) + colDir;

            while (
                currentRowRook >= 1 &&
                currentRowRook <= 8 &&
                currentColRook >= 1 &&
                currentColRook <= 8
            ) {
                const targetCellId = getCellIdFromCoords(
                    currentRowRook,
                    currentColRook
                );
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = isCellOccupied(currentRowRook, currentColRook);

                if (!isTargetOccupied) {
                    possibleMoves.push(targetCellId);
                } else {
                    if (!targetCell.attr("class").includes(figureColor.split("_")[0])) {
                        possibleMoves.push(targetCellId); // Можно съесть фигуру противникаб,или его самого.
                    }
                    break; // Дальше по этому направлению ходить нельзя, так как клетка занята.Та самая Жирная в самолете.
                }

                currentRowRook += rowDir;
                currentColRook += colDir;
            }
        }
    }
    if (queen.test(figureType)) {
        // Комбинируем направления слона и ладьи.Да ну?
        const queenDirections = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1], // диагональные
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1], // прямые
            //Угнетение кривых да?Рассист
        ];

        for (const [rowDir, colDir] of queenDirections) {
            let currentRowQueen = parseInt(currentRow) + rowDir;
            let currentColQueen = parseInt(currentCol) + colDir;

            while (
                currentRowQueen >= 1 &&
                currentRowQueen <= 8 &&
                currentColQueen >= 1 &&
                currentColQueen <= 8
            ) {
                const targetCellId = getCellIdFromCoords(
                    currentRowQueen,
                    currentColQueen
                );
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = isCellOccupied(
                    currentRowQueen,
                    currentColQueen
                );

                if (!isTargetOccupied) {
                    possibleMoves.push(targetCellId);
                } else {
                    if (!targetCell.attr("class").includes(figureColor.split("_")[0])) {
                        possibleMoves.push(targetCellId); // Хавай малыха
                    }
                    break; // nahuh
                }

                currentRowQueen += rowDir;
                currentColQueen += colDir;
            }
        }
    }

    if (king.test(figureType)) {

        const kingMoves = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];

        kingMoves.forEach(([rowOffset, colOffset]) => {
            const newRow = parseInt(currentRow) + rowOffset;
            const newCol = parseInt(currentCol) + colOffset;

            if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {
                const targetCellId = getCellIdFromCoords(newRow, newCol);
                const targetFigure = $("#" + targetCellId);
                const targetFigureColor = targetFigure.attr("class")
                    ? targetFigure.attr("class").split("_")[0]
                    : null;

                if (
                    !isCellOccupied(newRow, newCol) ||
                    targetFigureColor == figureColor
                ) {
                    possibleMoves.push(targetCellId);
                }
            }
        });

        return [possibleMoves, figureColor, figureType, figureCount];
    }

    return [possibleMoves, figureColor, figureType, figureCount];
}
function calculateAllMoves(figureElement) {

    const bishop = /bishop/g;
    const rook = /rook/g;
    const queen = /queen/g;

    const figureClass = figureElement.attr("class").split(" ")[0];

    const figureType = figureClass.split("_")[1];
    const figureCount = figureClass.split("_")[2];

    const figureColor = figureClass.split("_")[0];

    const currentCellId = figureElement.attr("class").split(" ")[2];

    const [currentRow, currentCol] = getCellCoords(currentCellId);

    const possibleMoves = [];



    if (bishop.test(figureType)) {
        const diagonalDirections = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1], // вверх-влево, вверх-вправо, вниз-влево, вниз-вправо.А может не нада?
        ];

        for (const [rowDir, colDir] of diagonalDirections) {
            let currentRowBishop = parseInt(currentRow) + rowDir;
            let currentColBishop = parseInt(currentCol) + colDir;

            while (
                currentRowBishop >= 1 &&
                currentRowBishop <= 8 &&
                currentColBishop >= 1 &&
                currentColBishop <= 8
            ) {
                const targetCellId = getCellIdFromCoords(
                    currentRowBishop,
                    currentColBishop
                );
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = isCellOccupied(
                    currentRowBishop,
                    currentColBishop
                );



                possibleMoves.push(targetCellId); // Хавай братиш,хавай




                currentRowBishop += rowDir;
                currentColBishop += colDir;
            }
        }
    }
    if (rook.test(figureType)) {
        const straightDirections = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1], // вверх, вниз, влево, вправо.А потом в дурку, да?
        ];

        for (const [rowDir, colDir] of straightDirections) {
            let currentRowRook = parseInt(currentRow) + rowDir;
            let currentColRook = parseInt(currentCol) + colDir;

            while (
                currentRowRook >= 1 &&
                currentRowRook <= 8 &&
                currentColRook >= 1 &&
                currentColRook <= 8
            ) {
                const targetCellId = getCellIdFromCoords(
                    currentRowRook,
                    currentColRook
                );
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = isCellOccupied(currentRowRook, currentColRook);



                possibleMoves.push(targetCellId); // Можно съесть фигуру противникаб,или его самого.


                currentRowRook += rowDir;
                currentColRook += colDir;
            }
        }
    }
    if (queen.test(figureType)) {
        // Комбинируем направления слона и ладьи.Да ну?
        const queenDirections = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1], // диагональные
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1], // прямые
            //Угнетение кривых да?Рассист
        ];

        for (const [rowDir, colDir] of queenDirections) {
            let currentRowQueen = parseInt(currentRow) + rowDir;
            let currentColQueen = parseInt(currentCol) + colDir;

            while (
                currentRowQueen >= 1 &&
                currentRowQueen <= 8 &&
                currentColQueen >= 1 &&
                currentColQueen <= 8
            ) {
                const targetCellId = getCellIdFromCoords(
                    currentRowQueen,
                    currentColQueen
                );
                const targetCell = $("#" + targetCellId);
                const isTargetOccupied = isCellOccupied(
                    currentRowQueen,
                    currentColQueen
                );


                possibleMoves.push(targetCellId); // Хавай малыха




                currentRowQueen += rowDir;
                currentColQueen += colDir;
            }
        }
    }



    return [possibleMoves, figureColor, figureType, figureCount];
}
function obrabotchikVsehDvijeni() {


    allHodi = [];

    $(".figure").each(function (id) {
        elem = $(".figure")[id];
        jqElem = $(elem);

        // cPM сокращение от c alculate P ossible M oves
        cAM = calculateAllMoves(jqElem);
        // console.log(cPM);

        allHodi.push(cAM);
    });
};
//Оригинально неправда ли?
function obrabotchikVozmoznichDvijeni() {


    vozmoznieHodi = [];

    $(".figure").each(function (id) {
        elem = $(".figure")[id];
        jqElem = $(elem);

        // cPM сокращение от c alculate P ossible M oves
        cPM = calculatePossibleMoves(jqElem);
        // console.log(cPM);

        vozmoznieHodi.push(cPM);
    });
}

function canIMove(figureCellCordsx, figureCellCordsy, x, y, color, name, i, vH, figureClone) {

    if (!figureClone.attr("class").includes("cantMove")) {
        let canCastleWhiteRight = true;
        let canCastleWhiteLeft = true;
        let canCastleBlackRight = true;
        let canCastleBlackLeft = true;
        let isTrue = false;
        let hasMovedClass;
        if ($(figureClone).attr("class")) {
            hasMovedClass = figureClone.attr("class").split(" ").includes("moved");
        } else {
            hasMovedClass = false;
        }



        if (name === "king") {

            vH.forEach(function (arr) {
                arr[0].forEach(function (id) {
                    // console.log(id[2] == 1 && id[3] == 5);
                    if (arr[1] == "black") {
                        if (
                            (id[2] == 1 && id[3] == 7) ||
                            (id[2] == 1 && id[3] == 6) ||
                            (id[2] == 1 && id[3] == 5)
                        ) {
                            canCastleWhiteRight = false;
                            // console.log("nepon");
                        } else if (
                            (id[2] == 1 && id[3] == 3) ||
                            (id[2] == 1 && id[3] == 4) ||
                            (id[2] == 1 && id[3] == 5)
                        ) {
                            canCastleWhiteLeft = false;
                        }
                    }
                    if (arr[1] == "white") {
                        if (
                            (id[2] == 8 && id[3] == 7) ||
                            (id[2] == 8 && id[3] == 6) ||
                            (id[2] == 8 && id[3] == 5)
                        ) {
                            canCastleBlackRight = false;
                        } else if (
                            (id[2] == 8 && id[3] == 3) ||
                            (id[2] == 8 && id[3] == 4) ||
                            (id[2] == 8 && id[3] == 5)
                        ) {
                            canCastleBlackLeft = false;
                        }
                    }
                });

            });
            vH.forEach(function (arr) {
                arr[0].forEach(function (id) {
                    // console.log(canCastleWhiteRight+'    jaegjhiugaehiughaeuighaeuGHEAWUGEAH');
                    if (arr[1] === color && arr[2] === "king") {
                        if (arr[0]) {
                            if (arr[1] == color && arr[2] == name && arr[3] == i + 1) {
                                arr[0].forEach(function (id) {
                                    if (id[2] == y && id[3] == x) {
                                        isTrue = true;
                                    }
                                });
                            }
                            // console.log(canCastleWhiteRight+'    jaegjhiugaehiughaeuighaeuGHEAWUGEAH');

                            if (!hasMovedClass) {


                                if (color === "white") {

                                    if (canCastleWhiteRight) {


                                        if (
                                            y == 1 &&
                                            x == 7 &&
                                            !isCellOccupied(1, 7) &&
                                            !isCellOccupied(1, 6) &&
                                            !$(".white_rook_1").hasClass("moved")
                                        ) {


                                            const whiteRook = $(".white_rook_2");
                                            const rookTargetCellId = "id16";
                                            const rookTargetCell = $("#" + rookTargetCellId);
                                            const rookOriginalCellId = "id18";
                                            const rookOriginalCell = $("#" + rookOriginalCellId);
                                            const whiteKing = $("#white_figure_king_0");

                                            rookTargetCell.attr(
                                                "class",
                                                "cell cell_white_rook_1 moved"
                                            );
                                            rookOriginalCell.attr("class", "cell");
                                            countInt = 0;

                                            whiteRook.attr("class", "white_rook_2 figure cell16 moved");
                                            whiteRook.css({
                                                left: getCell(6, "y") + "px",
                                                bottom: getCell(1, "y") + "px",
                                            });
                                            $("#id17").attr("class", "cell cell_white_king_0 moved");
                                            $("#id15").attr("class", "cell");
                                            whiteKing.css({
                                                left: getCell(7, "x") + "px",
                                                bottom: getCell(1, "y") + "px",
                                            });
                                            isTrue = true;
                                        }
                                    }
                                    // Короткая рокировка белых
                                    if (canCastleWhiteLeft) {
                                        if (
                                            y == 1 &&
                                            x == 3 &&
                                            !isCellOccupied(1, 3) &&
                                            !isCellOccupied(1, 2) &&
                                            !isCellOccupied(1, 4) &&
                                            !$(".white_rook_2").hasClass("moved") &&
                                            canCastleWhiteLeft
                                        ) {


                                            const whiteRook = $(".white_rook_1");
                                            const rookTargetCellId = "id14";
                                            const rookTargetCell = $("#" + rookTargetCellId);
                                            const rookOriginalCellId = "id11";
                                            const rookOriginalCell = $("#" + rookOriginalCellId);
                                            const whiteKing = $("#white_figure_king_0");

                                            whiteRook.attr("class", "white_rook_1 figure cell14 moved");
                                            rookTargetCell.attr(
                                                "class",
                                                "cell cell_white_rook_1 moved"
                                            );
                                            rookOriginalCell.attr("class", "cell");
                                            whiteRook.css({
                                                left: getCell(4, "y") + "px",
                                                bottom: getCell(1, "y") + "px",
                                            });

                                            $("#id13").attr("class", "cell cell_white_king_0 moved");
                                            $("#id15").attr("class", "cell");
                                            whiteKing.css({
                                                left: getCell(3, "x") + "px",
                                                bottom: getCell(1, "y") + "px",
                                            });

                                            isTrue = true; // Ход рокировки успешен
                                        }
                                    }
                                } else {
                                    if (canCastleBlackRight) {
                                        if (
                                            y == 8 &&
                                            x == 7 &&
                                            !isCellOccupied(8, 7) &&
                                            !isCellOccupied(8, 6) &&
                                            !$(".black_rook_1").hasClass("moved") &&
                                            canCastleBlackRight
                                        ) {
                                            const blackRook = $(".black_rook_2");
                                            const rookTargetCellId = "id86";
                                            const rookTargetCell = $("#" + rookTargetCellId);
                                            const rookOriginalCellId = "id88";
                                            const rookOriginalCell = $("#" + rookOriginalCellId);
                                            const blackKing = $("#black_figure_king_0");

                                            rookTargetCell.attr(
                                                "class",
                                                "cell cell_black_rook_1 moved"
                                            );
                                            rookOriginalCell.attr("class", "cell");
                                            countInt = 0;

                                            blackRook.attr("class", "black_rook_2 figure cell86 moved");
                                            blackRook.css({
                                                left: getCell(6, "y") + "px",
                                                bottom: getCell(8, "y") + "px",
                                            });
                                            $("#id17").attr("class", "cell cell_black_king_0 moved");
                                            $("#id15").attr("class", "cell");
                                            blackKing.css({
                                                left: getCell(7, "x") + "px",
                                                bottom: getCell(8, "y") + "px",
                                            });
                                            isTrue = true;
                                        }
                                    }
                                    canCastleBlackLeft;
                                    // Длинная рокировка белых
                                    if (canCastleBlackLeft) {


                                        if (
                                            y == 8 &&
                                            x == 3 &&
                                            !isCellOccupied(8, 3) &&
                                            !isCellOccupied(8, 2) &&
                                            !isCellOccupied(8, 4) &&
                                            !$(".black_rook_2").hasClass("moved") &&
                                            canCastleBlackLeft
                                        ) {

                                            // ВНИМАНИЕ: Немедленно перемещаем фигуры!
                                            const blackRook = $(".black_rook_1");
                                            const rookTargetCellId = "id84";
                                            const rookTargetCell = $("#" + rookTargetCellId);
                                            const rookOriginalCellId = "id81";
                                            const rookOriginalCell = $("#" + rookOriginalCellId);
                                            const blackKing = $("#black_figure_king_0");

                                            blackRook.attr("class", "black_rook_1 figure cell84 moved");
                                            rookTargetCell.attr(
                                                "class",
                                                "cell cell_black_rook_1 moved"
                                            );
                                            rookOriginalCell.attr("class", "cell");
                                            blackRook.css({
                                                left: getCell(4, "y") + "px",
                                                bottom: getCell(8, "y") + "px",
                                            });

                                            $("#id13").attr("class", "cell cell_black_king_0 moved");
                                            $("#id15").attr("class", "cell");
                                            blackKing.css({
                                                left: getCell(3, "x") + "px",
                                                bottom: getCell(8, "y") + "px",
                                            });

                                            isTrue = true; // Ход рокировки успешен
                                        }
                                    }
                                }
                                // Аналогично для черных (y == 8)
                            }
                        }
                    }


                    // if()
                });
            });
            vH.forEach(function (arr) {
                if (arr[0].length != 0) {
                    if (arr[1] == color && arr[2] == name && arr[3] == i + 1) {
                        arr[0].forEach(function (id) {
                            if (id[2] == y && id[3] == x) {
                                isTrue = true;
                            }
                        });
                    }

                }
            });
        } else {
            // Логика для других фигур
            // console.log(vH); 



            vH.forEach(function (arr) {
                if (arr[0].length != 0) {
                    if (arr[1] == color && arr[2] == name && arr[3] == i + 1) {
                        arr[0].forEach(function (id) {
                            if (id[2] == y && id[3] == x) {
                                isTrue = true;
                            }
                        });
                    }

                }
            });
        }
        return isTrue;
    } else {
        $('.' + color + '_king_1').css({
            animation: 'kingRed 5s ease-in-out forwards'
        });
        return false
    }

}
function playOnce() {
    const audio = new Audio('../img/move.mp3'); // Замените на ваш путь
    audio.playbackRate = 2.0;
    audio.play();
}

function checkDiagonalCheck([startCol, startRow], diff, color) {
    let y = parseInt(startRow);
    let x = parseInt(startCol);
    let figures = [];



    while (y >= 1 && x <= 8 && x >= 1 && y <= 8) {


        const cell = $('.cell' + x + y);
        const cellClass = cell.attr('class');
        // console.log(cellClass , isCellOccupied(x, y) , !cellClass.includes(color + '_king_1'));

        if (cellClass && isCellOccupied(x, y)) {
            if (!cellClass.includes(color + '_king_1')) {
                figures.push({ cell, cellClass, x, y });

            }



            // break; // Остановиться на первой встреченной фигуре
        }
        if (diff == 'nl') {
            x--;
            y--;
        } else if (diff == 'vp') {
            x++;
            y++;
        } else if (diff == 'np') {
            x--;
            y++;
        } else if (diff == 'vl') {
            x++;
            y--;
        } else if (diff == 'n') {
            x--
        } else if (diff == 'v') {
            x++
        } else if (diff == 'l') {
            y--
        } else if (diff == 'p') {
            y++
        }
    }
    return figures; // Массив с найденной фигурой (или пустой, если не нашли)
}
function getVHChange(piece, arrvH) {
    let pieceClass = piece.attr("class").split(" ")[0]
    let pieceClassArr = pieceClass.split("_")
    vozmoznieHodi.forEach(function (arr) {

        if (arr[1] == pieceClassArr[0] && arr[2] == pieceClassArr[1] && arr[3] == pieceClassArr[2]) {


            arr[0] = arrvH


        }
    })
}
function getVH(piece) {
    let vhPiece = null;
    let pieceClass = piece.attr("class").split(" ")[0]
    let pieceClassArr = pieceClass.split("_")
    vozmoznieHodi.forEach(function (arr) {

        if (arr[1] == pieceClassArr[0] && arr[2] == pieceClassArr[1] && arr[3] == pieceClassArr[2]) {

            vhPiece = arr;


        }
    })
    return vhPiece;
}
function findPiceHodi([startCol, startRow], diff, color) {
    let y = parseInt(startRow);
    let x = parseInt(startCol);
    let figures = [];
    if (diff == 'nl') {
        x--;
        y--;
    } else if (diff == 'vp') {
        x++;
        y++;
        //sassasa
    } else if (diff == 'np') {
        x++;
        y--;
    } else if (diff == 'vl') {
        x--;
        y++;
    } else if (diff == 'n') {
        y--
    } else if (diff == 'v') {
        y++
    } else if (diff == 'l') {
        x--
    } else if (diff == 'p') {
        x++
    }
    // console.log(x,y);

    while (y >= 1 && x <= 8 && x >= 1 && y <= 8) {
        const cell = $('#id' + x + '' + y);


        const cellClass = cell.attr('class');





        figures.push('id' + x + y);


        if (diff == 'nl') {
            x--;
            y--;
        } else if (diff == 'vp') {
            x++;
            y++;
        } else if (diff == 'np') {
            x++;
            y--;
        } else if (diff == 'vl') {
            x--;
            y++;
        } else if (diff == 'n') {
            y--
        } else if (diff == 'v') {
            y++
        } else if (diff == 'l') {
            x--
        } else if (diff == 'p') {
            x++
        }
    }

    return figures; // Массив с найденной фигурой (или пустой, если не нашли)
}
function findKingPins(aH, color) {
    const kingCell = $(".cell_" + color + "_king_1");
    const kingCellId = kingCell.attr("id");
    aH.forEach(function (arr) {

        arr[0].forEach(function (id) {


            let pos = null;
            if (id[2] == kingCellId[2] && id[3] == kingCellId[3] && arr[1] != color) {


                let attackPiece = $('.' + arr[1] + '_' + arr[2] + '_' + arr[3]);

                let attackPiecePosY = attackPiece.attr("class").split(" ")[2][4];
                let attackPiecePosX = attackPiece.attr("class").split(" ")[2][5];

                let diffx = attackPiecePosY - id[2]
                let diffy = attackPiecePosX - id[3]



                if (diffx > 0 && attackPiecePosX - id[3] > 0) {


                    pos = 'nl'


                    //Значит это либо слон либо ферзь и король ниже левее
                } else if (diffx < 0 && diffy < 0) {

                    pos = 'vp'

                    //Значит это либо слон либо ферзь и король выше правее
                } else if (diffx > 0 && diffy < 0) {
                    pos = 'np'
                    //Значит это либо слон либо ферзь и король ниже правее
                } else if (diffx < 0 && diffy > 0) {
                    pos = 'vl'
                    //Значит это либо слон либо ферзь и король выше левее
                } else if (diffx > 0 && diffy == 0) {
                    pos = 'n'
                    //Значит это либо ладья либо ферзь и король ниже
                } else if (diffx < 0 && diffy == 0) {
                    pos = 'v'
                    //Значит это либо ладья либо ферзь и король выше
                } else if (diffx == 0 && diffy > 0) {
                    pos = 'l'
                    //Значит это либо ладья либо ферзь и король левее
                } else if (diffx == 0 && diffy < 0) {
                    pos = 'p'
                    //Значит это либо ладья либо ферзь и король правее
                }


                let check = checkDiagonalCheck([attackPiecePosY, attackPiecePosX], pos, color)


                if (check.length > 0 && check.length == 2) {




                    let possibleMoves = getVH(check[1]['cell'])[0]


                    let posCM = [];


                    if (pos == 'nl' || pos == 'vp') {
                        posCM = ['nl', 'vp']
                    } else if (pos == 'np' || pos == 'vl') {
                        posCM = ['np', 'vl']
                    } else if (pos == 'n' || pos == 'v') {
                        posCM = ['n', 'v']
                    } else if (pos == 'l' || pos == 'p') {
                        posCM = ['l', 'p']
                    }

                    let defendPieceY = check[1]['cell'].attr("class").split(" ")[2][4]
                    let defendPieceX = check[1]['cell'].attr("class").split(" ")[2][5]


                    let posCMARR = []

                    posCM.forEach(function (arrCM) {

                        findPiceHodi([defendPieceY, defendPieceX], arrCM, color).forEach(function (fph) {
                            posCMARR.push(fph)
                        })

                    })





                    let heIsFind = []
                    possibleMoves.forEach(function (idVH) {

                        posCMARR.forEach(function (fph) {
                            if (idVH == fph) {

                                heIsFind.push(fph)
                            }
                        })

                    })








                    getVHChange(check[1]['cell'], heIsFind)

                }

            }
        })
    })
}

function findBlockersCheck(startCol, startRow, diff, color) {
    let y = parseInt(startRow);
    let x = parseInt(startCol);
    let figures = [];
    // if (diff == 'nl') {
    //     x--;
    //     y--;
    // } else if (diff == 'vp') {
    //     x++;
    //     y++;
    //     //sassasa
    // } else if (diff == 'np') {
    //     x--;
    //     y++;
    // } else if (diff == 'vl') {
    //     x++;
    //     y--;
    // } else if (diff == 'n') {
    //     x--
    // } else if (diff == 'v') {
    //     x++
    // } else if (diff == 'l') {
    //     y--
    // } else if (diff == 'p') {
    //     y++
    // }
    console.log(diff);


    while (y >= 1 && x <= 8 && x >= 1 && y <= 8) {
        console.log(x, y);

        const cell = $('#id' + x + '' + y);

        const cellClass = cell.attr('class');

        if (!cellClass.includes(color + '_king_1')) {

            vozmoznieHodi.forEach(function (arr) {


                arr[0].forEach(function (id) {



                    if (arr[1] == color && arr[2] != 'king' && id[2] == x && id[3] == y) {

                        figures.push([cell, color, arr[2], arr[3], x, y]);

                    }
                });
            })

        }
        if (diff == 'nl') {
            x--;
            y--;
        } else if (diff == 'vp') {
            x++;
            y++;
            //sassasa
        } else if (diff == 'np') {
            x--;
            y++;
        } else if (diff == 'vl') {
            x++;
            y--;
        } else if (diff == 'n') {
            x--
        } else if (diff == 'v') {
            x++
        } else if (diff == 'l') {
            y--
        } else if (diff == 'p') {
            y++
        }
    }
    console.log(figures);

    return figures; // Массив с найденной фигурой (или пустой, если не нашли)
}
let kingIsUnderAttack = false
function kingIsNotUnderAttack(color, vH) {
    let king = $('.' + color + '_king_1')

    let kingArr = getVH(king);

    vH.forEach(function (arrvH) {
        arrvH[0].forEach(function (idvH) {
            kingArr[0].forEach(function (kingvH) {
                if (idvH[2] == kingvH[2] && idvH[3] == kingvH[3] && arrvH[1] != color) {
                    let index = kingArr[0].indexOf(kingvH);


                    if (index !== -1) {

                        kingArr[0].splice(index, 1);
                        getVHChange(king, kingArr[0]);

                    }
                }
            })
        })
    })


    let figures = [];
    const kingCell = $(".cell_" + color + "_king_1");
    let y = parseInt(kingCell.attr("id")[2]);
    let x = parseInt(kingCell.attr("id")[3]);
    vH.forEach(function (arr) {
        arr[0].forEach(function (id) {
            if (arr[1] != color && id[2] == y && id[3] == x) {
                kingIsUnderAttack = true
                let attackCell = $('.' + arr[1] + '_' + arr[2] + '_' + arr[3]);
                let atty = attackCell.attr("class").split(" ")[2][4]
                let attx = attackCell.attr("class").split(" ")[2][5]

                let diffx = atty - id[2];
                let diffy = attx - id[3];
                if (diffx > 0 && diffy > 0) {


                    pos = 'nl'


                    //Значит это либо слон либо ферзь и король ниже левее
                } else if (diffx < 0 && diffy < 0) {

                    pos = 'vp'

                    //Значит это либо слон либо ферзь и король выше правее
                } else if (diffx > 0 && diffy < 0) {
                    pos = 'np'
                    //Значит это либо слон либо ферзь и король ниже правее
                } else if (diffx < 0 && diffy > 0) {
                    pos = 'vl'
                    //Значит это либо слон либо ферзь и король выше левее
                } else if (diffx > 0 && diffy == 0) {
                    pos = 'n'
                    //Значит это либо ладья либо ферзь и король ниже
                } else if (diffx < 0 && diffy == 0) {
                    pos = 'v'
                    //Значит это либо ладья либо ферзь и король выше
                } else if (diffx == 0 && diffy > 0) {
                    pos = 'l'
                    //Значит это либо ладья либо ферзь и король левее
                } else if (diffx == 0 && diffy < 0) {
                    pos = 'p'
                    //Значит это либо ладья либо ферзь и король правее
                }

                figures = findBlockersCheck(atty, attx, pos, color);
                // console. (pos);

            }
        });
    })


    if (kingIsUnderAttack && figures.length > 0) {
        const allFigures = $(".figure");
        allFigures.each(function (index, element) {

            let figure = $(element);
            let figureClass = figure.attr("class").split(" ")[0].split("_");




            figures.forEach(function (arr) {


                if (!(arr[1] == figureClass[0] && arr[2] == figureClass[1] && arr[3] == figureClass[2]) && figureClass[0] == color && figureClass[1] != 'king') {


                    getVHChange(figure, [])


                } else if ((arr[1] == figureClass[0] && arr[2] == figureClass[1] && arr[3] == figureClass[2]) && figureClass[0] == color && figureClass != [color, 'king', '1']) {

                    vH.forEach(function (arrVH) {
                        if (arrVH[1] == arr[1] && arrVH[2] == arr[2] && arrVH[3] == arr[3]) {
                            // $('.' + arrVH[1] + '_' + arrVH[2] + '_' + arrVH[3])
                            // arrVH[0] = ['id' + arr[4] + arr[5]]
                            console.log($('.' + arrVH[1] + '_' + arrVH[2] + '_' + arrVH[3]));

                            getVHChange($('.' + arrVH[1] + '_' + arrVH[2] + '_' + arrVH[3]), ['id' + arr[4] + arr[5]])
                            console.log(vozmoznieHodi);
                            console.log(['id' + arr[4] + arr[5]]);

                            console.log(arrVH);

                        }
                    })

                }

            })
        })
    }
    if (kingIsUnderAttack) {



        if (kingArr[0].length == 0 && figures.length == 0) {
            // console.log(figures);
            // console.log(kingArr[0]);

            console.log('mate');

        }
    }


}
function checkDiagonalCheckAttack([startCol, startRow], diff, color) {
    let y = parseInt(startRow);
    let x = parseInt(startCol);
    let figures = [];
    if (diff == 'nl') {
        x--;
        y--;
    } else if (diff == 'vp') {
        x++;
        y++;
    } else if (diff == 'np') {
        x++;
        y--;
    } else if (diff == 'vl') {
        x--;
        y++;
    } else if (diff == 'n') {
        y--
    } else if (diff == 'v') {
        y++
    } else if (diff == 'l') {
        x--
    } else if (diff == 'p') {
        x++
    }


    while (y >= 1 && x <= 8 && x >= 1 && y <= 8) {
        const cell = $('.cell' + x + y);
        const cellClass = cell.attr('class');
        if (cellClass && isCellOccupied(x, y)) {


            figures.push({ cell, cellClass, x, y });
            // break; // Остановиться на первой встреченной фигуре
        }
        if (diff == 'nl') {
            x--;
            y--;
        } else if (diff == 'vp') {
            x++;
            y++;
        } else if (diff == 'np') {
            x++;
            y--;
        } else if (diff == 'vl') {
            x--;
            y++;
        } else if (diff == 'n') {
            y--
        } else if (diff == 'v') {
            y++
        } else if (diff == 'l') {
            x--
        } else if (diff == 'p') {
            x++
        }
    }
    return figures; // Массив с найденной фигурой (или пустой, если не нашли)
}
function kingAttack(color) {
    let attacked = false
    const kingMoves = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    const kingCell = $('.cell_' + color + '_king_1');
    const king = $('.' + color + '_king_1');
    let [currentRow, currentCol] = [kingCell.attr('id')[2], kingCell.attr('id')[3]]
    kingMoves.forEach(([rowOffset, colOffset]) => {
        const newRow = parseInt(currentRow) + rowOffset;
        const newCol = parseInt(currentCol) + colOffset;


        if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {

            if (isCellOccupied(newRow, newCol)) {


                let attCell = $('#id' + newRow + '' + newCol)
                attCellClass = attCell.attr('class').split(' ')


                if (attCellClass.length > 1) {

                    let attCellClassSplit = attCellClass[1].split('_')
                    var attPiece = attPiece = $('.' + attCellClassSplit[1] + '_' + attCellClassSplit[2] + '_' + attCellClassSplit[3])




                    if (attCellClassSplit[1] != color) {

                        allHodi.forEach(function (arr) {
                            arr[0].forEach(function (id) {

                                let pos = null

                                let attPieceCell = [attPiece.attr('class').split(' ')[2][4], attPiece.attr('class').split(' ')[2][5]]
                                let defPiece = $('.' + arr[1] + '_' + arr[2] + '_' + arr[3])
                                let defPieceCell = [defPiece.attr('class').split(' ')[2][4], defPiece.attr('class').split(' ')[2][5]]

                                let diffx = defPieceCell[1] - attPieceCell[1]
                                let diffy = defPieceCell[0] - attPieceCell[0]
                                if (id[2] == attPiece.attr('class').split(' ')[2][4] && id[3] == attPiece.attr('class').split(' ')[2][5] && arr[1] != color) {


                                    if (diffx > 0 && diffy > 0) {


                                        pos = 'nl'


                                        //Значит это либо слон либо ферзь и король ниже левее
                                    } else if (diffx < 0 && diffy < 0) {

                                        pos = 'vp'


                                    } else if (diffx > 0 && diffy < 0) {
                                        pos = 'np'

                                        //Значит это либо слон либо ферзь и король ниже правее
                                    } else if (diffx < 0 && diffy > 0) {
                                        pos = 'vl'

                                        //Значит это либо слон либо ферзь и король выше левее
                                    } else if (diffx > 0 && diffy == 0) {
                                        pos = 'n'

                                        //Значит это либо ладья либо ферзь и король ниже
                                    } else if (diffx < 0 && diffy == 0) {
                                        pos = 'v'

                                        //Значит это либо ладья либо ферзь и король выше
                                    } else if (diffx == 0 && diffy > 0) {
                                        pos = 'l'

                                        //Значит это либо ладья либо ферзь и король левее
                                    } else if (diffx == 0 && diffy < 0) {
                                        pos = 'p'

                                        //Значит это либо ладья либо ферзь и король правее
                                    }

                                    let figures = []



                                    if (pos) {

                                        figures = checkDiagonalCheckAttack([defPieceCell[0], defPieceCell[1]], pos, color)



                                        if (figures[0]) {

                                            if (figures[0]['cellClass'].split(' ')[0] == attPiece.attr('class').split(' ')[0]) {
                                                attacked = true;


                                                let arrHodov = [];
                                                kingMoves.forEach(([rowOffset, colOffset]) => {
                                                    const newRow2 = parseInt(currentRow) + rowOffset;
                                                    const newCol2 = parseInt(currentCol) + colOffset;
                                                    if (!isCellOccupied(newRow2, newCol2)) {
                                                        arrHodov.push('id' + newRow2 + newCol2);
                                                    }
                                                });

                                                vozmoznieHodi.forEach((arr) => {
                                                    arr[0].forEach((id) => {
                                                        if (arrHodov.indexOf(id) != -1 && arr[1] != color) {
                                                            arrHodov.splice(arrHodov.indexOf(id), 1);
                                                        }
                                                    });
                                                });

                                                getVHChange(king, arrHodov);
                                                return;

                                            }
                                            if (figures[0]['cellClass'].split(' ')[0] != attPiece.attr('class').split(' ')[0]) {

                                                if (!attacked) {


                                                    getVHChange(king, ['id' + attPiece.attr('class').split(' ')[2][4] + attPiece.attr('class').split(' ')[2][5]]);
                                                }


                                            }






                                        }


                                    }

                                } else {
                                    if (!attacked) {
                                        getVHChange(king, ['id' + attPiece.attr('class').split(' ')[2][4] + attPiece.attr('class').split(' ')[2][5]]);
                                    }

                                }









                            })
                        })

                    }
                }

            }
        }


    });



}
function deletePiece(piece) {

    piece.remove()
    console.log(piece);

}

function promotePawnToQueen(pawn, targetCell) {
    // Получаем цвет пешки
    const pawnColor = pawn.attr("class").split("_")[0];
    console.log(`url(img/${pawnColor[0]}q.png)`);

    // Создаем нового ферзя
    const queen = $('<div>', {
        class: `${pawnColor}_queen_1 figure ${targetCell.attr('id')}`,
        css: {
            position: 'absolute',
            left: getCell(targetCell.attr('id')[3], "y") + "px",
            bottom: getCell(targetCell.attr('id')[2], "x") + "px",
            width: cellWidth + "px",
            height: cellHeight + "px",
            backgroundImage: `url(../img/${pawnColor[0]}q.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: "1"
        }
    });
    let figureName = pawnColor + '_queen_2'
    // Удаляем пешку
    pawn.remove();

    queen.on('mousedown', function (pos) {
        mouseXPos = pos.clientX
        mouseYPos = pos.clientY
        isPick = true
        pickFigure = pawnColor + '_queen_2';

        $('body').on('mousemove', function (move) {
            const mouseX = move.clientX;
            const mouseY = move.clientY;

            $('.figure').css({
                'pointer-events': 'none',
                'z-index': 9
            })
            queen.css({
                'z-index': 99999
            })
            queen.css({
                'position': 'fixed',
                'bottom': ($('body').height() - mouseY) - cellHeight / 2 + 'px',
                'left': mouseX - cellWidth / 2 + 'px',
            })
        })

        // ВСТАВЛЯЕМ ОБРАБОТЧИК mouseup
        $('body').on('mouseup', function () {
            queen.css({
                'pointer-events': 'auto',
                'position': 'absolute',
                'z-index': 1,
            })
            obrabotchikVozmoznichDvijeni()
            obrabotchikVsehDvijeni()
            kingAttack('white')
            kingIsNotUnderAttack('white', vozmoznieHodi)
            findKingPins(allHodi, 'black')
            findKingPins(allHodi, 'white')
            let nameOfFigure = figureName.split('_')
            // --- Здесь можно добавить свою логику для queen, если нужно ---
            $('.cell').each(function (index, element) {
                var figureCellCordsx = queen.attr('class').split(' ')[2][4];
                var figureCellCordsy = queen.attr('class').split(' ')[2][5];

                if ($(element).attr('id')[2] == pickCords[0] && $(element).attr('id')[3] == pickCords[1]) {


                    console.log('sadadsadsadsa');

                    if (canIMove(figureCellCordsx, figureCellCordsy, pickCords[1], pickCords[0], nameOfFigure[0], nameOfFigure[1], 2, vozmoznieHodi, queen)) {
                        playOnce()


                        if (!(figureCellCordsx == $(element).attr('id')[2] && figureCellCordsy == $(element).attr('id')[3])) {
                            // $('.cell' + $(element).attr('id')[2] + $(element).attr('id')[3]).css({
                            //     'display': 'none'
                            // });
                            deletePiece($('.cell' + $(element).attr('id')[2] + $(element).attr('id')[3]))



                            $(element).attr('class', 'cell' + ' ' + 'cell_white_' + 'queen' + '_' + (i + 1))

                            $('#id' + figureCellCordsx + figureCellCordsy).attr('class', 'cell');/////////////////////////////////////////////////////



                            queen.css({
                                'left': null,
                                'bottom': '0px',
                            })
                            queen.css({

                                'left': getCell(pickCords[1], 'x') + 'px',
                                'bottom': getCell(pickCords[0], 'y') + 'px',



                            })
                            
                            

                        } else {
                            queen.css({
                                'left': null,
                                'bottom': '0px',
                            })
                            queen.css({

                                'left': getCell(figureCellCordsy, 'x') + 'px',
                                'bottom': getCell(figureCellCordsx, 'y') + 'px',



                            })


                        }

                        yourTurn = 'black'
                        queen.attr('class', 'white_' + 'queen' + '_' + (i + 1) + ' figure' + ' cell' + pickCords[0] + pickCords[1] + ' moved')
                        
                    } else {
                        queen.css({
                            'left': null,
                            'bottom': '0px',
                        })
                        queen.css({

                            'left': getCell(figureCellCordsy, 'x') + 'px',
                            'bottom': getCell(figureCellCordsx, 'y') + 'px',



                        })
                    }

                }



            })
            $('body').off('mousemove')
            kingIsNotUnderAttack('black', vozmoznieHodi)
            findKingPins(allHodi, 'black')
            findKingPins(allHodi, 'white')
        })
    })

    // Добавляем ферзя на доску
    $("#deck").append(queen);

    // Обновляем класс целевой клетки
    targetCell.attr("class", `cell cell_${pawnColor}_queen_1`);

    // Обновляем возможные ходы
    obrabotchikVozmoznichDvijeni();

    // Воспроизводим звук превращения
    playOnce();
}

// Функция проверки возможности превращения пешки
function checkPawnPromotion(pawn, targetCell) {
    const pawnColor = pawn.attr("class").split("_")[0];
    const targetRow = parseInt(targetCell.attr('id')[2]);

    // Проверяем, достигла ли пешка последней горизонтали
    if ((pawnColor === 'white' && targetRow === 8) ||
        (pawnColor === 'black' && targetRow === 1)) {
        promotePawnToQueen(pawn, targetCell);
        return true;
    }
    return false;
}

