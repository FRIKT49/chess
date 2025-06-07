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

        // Добавляем проверку для короля
        if (name === "king") {
            // Проверяем, не атакует ли пешка противника целевую клетку
            const pawnDirections = color === 'white' ?
                [[1, -1], [1, 1]] : // Для белых пешек атака снизу вверх
                [[-1, -1], [-1, 1]]; // Для черных пешек атака сверху вниз

            let isUnderPawnAttack = false;
            pawnDirections.forEach(([rowOffset, colOffset]) => {
                const checkRow = parseInt(x) + rowOffset;
                const checkCol = parseInt(y) + colOffset;

                if (checkRow >= 1 && checkRow <= 8 && checkCol >= 1 && checkCol <= 8) {
                    const targetCell = $('#id' + checkRow + checkCol);
                    const targetCellClass = targetCell.attr('class');

                    // Исправляем проверку для черных пешек
                    if (color === 'white') {
                        if (targetCellClass && targetCellClass.includes('cell_black_pawn_')) {
                            isUnderPawnAttack = true;
                        }
                    } else {
                        if (targetCellClass && targetCellClass.includes('cell_white_pawn_')) {
                            isUnderPawnAttack = true;
                        }
                    }
                }
            });

            if (isUnderPawnAttack) {
                return false;
            }

            // Существующая логика для короля
            vH.forEach(function (arr) {
                arr[0].forEach(function (id) {
                    if (arr[1] === color && arr[2] === "king") {
                        if (arr[0]) {
                            if (arr[1] == color && arr[2] == name && arr[3] == i + 1) {
                                arr[0].forEach(function (id) {
                                    if (id[2] == y && id[3] == x) {
                                        isTrue = true;
                                    }
                                });
                            }

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
                })
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