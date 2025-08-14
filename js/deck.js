
const letters = "abcdefgh";
const inters = "12345678";

const cellTemplate = $('.cell');
var countx = 1;
var county = 8;
const cellWidth = $('#deck').width() / 8;
const cellHeight = $('#deck').height() / 8;




for (const letter of letters) {

    for (const digit of inters) {

        let cellClone = cellTemplate.clone();


        cellClone.css({
            display: 'block',

            width: cellWidth + 'px',
            height: cellHeight + 'px',

        });


        cellClone.on('mouseover', function (e) {
            const el = $(e.target)
            pickCords = [el.attr('id')[2], el.attr('id')[3], pickFigure];




        })
        cellClone.attr('id', 'id' + county + '' + countx)

        $('#deck').append(cellClone);


        countx++;
    }
    countx = 1;
    county--;
}
var pickCords = [];


var isPick = false;
var pickFigure = null;
var whitePieces = [
    $("#whiteking-template"),
    $("#whitequeen-template"),
    $("#whitebishop-template"),
    $("#whiteknight-template"),
    $("#whiterook-template"),
    $("#whitepawn-template")
];

var blackPieces = [
    $("#blackking-template"),
    $("#blackqueen-template"),
    $("#blackbishop-template"),
    $("#blackknight-template"),
    $("#blackrook-template"),
    $("#blackpawn-template")
];

const figureNames = ['king', 'queen', 'bishop', 'night', 'rook', 'pawn'];
const figureCount = ['1', '1', '2', '2', '2', '8'];
var yourTurn = 'white';
var ig = 0; 
for (let figure in whitePieces) {
    const name = figureNames[figure];
    const count = figureCount[figure];
    for (let i = 0; i < count; i++) {
        let figureClone = whitePieces[figure].clone();
        const figureName = 'white_' + name + '_' + (i + 1);
        figureClone.css({
            'display': 'block',
            // 'outline': "1px solid red",
            'width': cellWidth + 'px',
            'height': cellHeight + 'px',
            'background-image': 'url("../img/w' + name[0] + '.png")',
            'background-size': '100% 100%',
            'cursor': 'grab'
        });
        if (name == 'king') cell = [1, 5];
        if (name == 'queen') cell = [1, 4];
        if (name == 'bishop') cell = [1, 3 + i * 3];
        if (name == 'night') cell = [1, 2 + i * 5];
        if (name == 'rook') cell = [1, 1 + i * 7];
        if (name == 'pawn') cell = [2, i + 1];
        figureClone.css({
            bottom: getCell(cell[0], 'x') + 'px',
            left: getCell(cell[1], 'y') + 'px'
        });

        $('#id' + cell[0] + cell[1]).attr('class', 'cell' + ' ' + 'cell_white_' + name + '_' + (i + 1));

        figureClone.attr('id', 'white_figure_' + name + '_' + i);
        figureClone.attr('class', 'white_' + name + '_' + (i + 1) + ' figure' + ' cell' + (cell[0]) + (cell[1]));
        var mouseXPos = null;
        var mouseYPos = null;
        figureClone.on('mousedown', function (pos) {
            mouseXPos = pos.clientX
            mouseYPos = pos.clientY
            isPick = true
            pickFigure = 'white_' + name + '_' + (i + 1);

            $('body').on('mousemove', function (move) {
                const mouseX = move.clientX;
                const mouseY = move.clientY;


                $('.figure').css({
                    'pointer-events': 'none',
                    'z-index': 9
                })
                figureClone.css({
                    'z-index': 99999
                })
                figureClone.css({
                    'position': 'fixed',
                    'bottom': ($('body').height() - mouseY) - cellHeight / 2 + 'px',
                    'left': mouseX - cellWidth / 2 + 'px',

                })
            })


        })
        var figurePosLeft = null;
        var figurePosTop = null;
        

        $('body').on('mouseup', function () {
            figureClone.css({
                'pointer-events': 'auto',
                'position': 'absolute',
                'z-index': 1,
            })
            obrabotchikVozmoznichDvijeni()
            obrabotchikVsehDvijeni()
            kingAttack('white')
            kingIsNotUnderAttack('white', vozmoznieHodi)
            findKingPins(allHodi,'black')
            findKingPins(allHodi,'white')
            //    -----------------------------------------------------------------------------------------------
            if (yourTurn == 'white') {
                
                if (pickCords[2]) {
                    
                    let nameCords = pickCords[2].split('_')
                    let nameOfFigure = figureName.split('_')
                    // console.log(nameCords);
                    
                    if (nameCords[0] == nameOfFigure[0] && nameCords[1] == nameOfFigure[1] && nameCords[2] == nameOfFigure[2]) {


                        if (isPick == true) {
                            
                            $('.cell').each(function (index, element) {
                                var figureCellCordsx = figureClone.attr('class').split(' ')[2][4];
                                var figureCellCordsy = figureClone.attr('class').split(' ')[2][5];

                                if ($(element).attr('id')[2] == pickCords[0] && $(element).attr('id')[3] == pickCords[1]) {




                                    if (canIMove(figureCellCordsx, figureCellCordsy, pickCords[1], pickCords[0], nameOfFigure[0], nameOfFigure[1], i, vozmoznieHodi, figureClone)) {
                                        playOnce()

                                        
                                        if (!(figureCellCordsx == $(element).attr('id')[2] && figureCellCordsy == $(element).attr('id')[3])) {
                                            // $('.cell' + $(element).attr('id')[2] + $(element).attr('id')[3]).css({
                                            //     'display': 'none'
                                            // });
                                            deletePiece($('.cell' + $(element).attr('id')[2] + $(element).attr('id')[3]))



                                            $(element).attr('class', 'cell' + ' ' + 'cell_white_' + name + '_' + (i + 1))

                                            $('#id' + figureCellCordsx + figureCellCordsy).attr('class', 'cell');/////////////////////////////////////////////////////



                                            figureClone.css({
                                                'left': null,
                                                'bottom': '0px',
                                            })
                                            figureClone.css({

                                                'left': getCell(pickCords[1], 'x') + 'px',
                                                'bottom': getCell(pickCords[0], 'y') + 'px',



                                            })
                                            
                                            ig++;
                                            console.log(ig);
                                            let x;
                                            if(pickCords[1]==1){
                                                x = 'a';
                                            }else if(pickCords[1]==2){
                                                x = 'b';
                                            }else if(pickCords[1]==3){
                                                x = 'c';
                                            }else if(pickCords[1]==4){
                                                x = 'd';
                                            }else if(pickCords[1]==5){
                                                x = 'e';
                                            }else if(pickCords[1]==6){ 
                                                x = 'f';
                                            }else if(pickCords[1]==7){
                                                x = 'g';
                                            }else if(pickCords[1]==8){
                                                x = 'h';
                                            }
                                            let move = $(`
                                                <div class="move">
                                                    <div class="move-number">${ig}</div>
                                                    <div class="move-notation">${name[0]}${x}${pickCords[0]}</div>
                                                </div>
                                            `);
                                            $('#leftMoves').append(move);
                                        } else {
                                            figureClone.css({
                                                'left': null,
                                                'bottom': '0px',
                                            })
                                            figureClone.css({

                                                'left': getCell(figureCellCordsy, 'x') + 'px',
                                                'bottom': getCell(figureCellCordsx, 'y') + 'px',



                                            })


                                        }

                                        yourTurn = 'black'
                                        figureClone.attr('class', 'white_' + name + '_' + (i + 1) + ' figure' + ' cell' + pickCords[0] + pickCords[1] + ' moved')
                                        if(name == 'pawn'){
                                            
                                            if(checkPawnPromotion(figureClone, $(element))){
                                                console.log(true);
                                            }
                                        }
                                    } else {
                                        figureClone.css({
                                            'left': null,
                                            'bottom': '0px',
                                        })
                                        figureClone.css({

                                            'left': getCell(figureCellCordsy, 'x') + 'px',
                                            'bottom': getCell(figureCellCordsx, 'y') + 'px',



                                        })
                                    }

                                }

                                

                            })
                            isPick = false
                        }


                    }

                }



            } else {
                var figureCellCordsx = figureClone.attr('class').split(' ')[2][4];
                var figureCellCordsy = figureClone.attr('class').split(' ')[2][5];
                figureClone.css({
                    'left': null,
                    'bottom': '0px',
                })
                figureClone.css({

                    'left': getCell(figureCellCordsy, 'x') + 'px',
                    'bottom': getCell(figureCellCordsx, 'y') + 'px',



                })

            }

            

            $('body').off('mousemove')


            kingIsNotUnderAttack('black', vozmoznieHodi)
            findKingPins(allHodi,'black')
            findKingPins(allHodi,'white')
            
        })
        

        $('#deck').append(figureClone);
    }
}
for (let figure in blackPieces) {
    const name = figureNames[figure];
    const count = figureCount[figure];
    // const color = 'black'
    for (let i = 0; i < count; i++) {
        let figureClone = blackPieces[figure].clone();
        const figureName = 'black_' + name + '_' + (i + 1);
        figureClone.css({
            'display': 'block',
            // 'outline': "1px solid red",
            'width': cellWidth + 'px',
            'height': cellHeight + 'px',
            'background-image': 'url("../img/b' + name[0] + '.png")',
            'background-size': '100% 100%',
            'cursor': 'grab'
        });
        if (name == 'king') cell = [8, 5];
        if (name == 'queen') cell = [8, 4];
        if (name == 'bishop') cell = [8, 3 + i * 3];
        if (name == 'night') cell = [8, 2 + i * 5];
        if (name == 'rook') cell = [8, 1 + i * 7];
        if (name == 'pawn') cell = [7, i + 1];
        figureClone.css({
            bottom: getCell(cell[0], 'x') + 'px',
            left: getCell(cell[1], 'y') + 'px'
        });

        $('#id' + cell[0] + cell[1]).attr('class', 'cell' + ' ' + 'cell_black_' + name + '_' + (i + 1));


        figureClone.attr('id', 'black_figure_' + name + '_' + i);
        figureClone.attr('class', 'black_' + name + '_' + (i + 1) + ' figure' + ' cell' + (cell[0]) + (cell[1]));
        var mouseXPos = null;
        var mouseYPos = null;
        figureClone.on('mousedown', function (pos) {

            mouseXPos = pos.clientX
            mouseYPos = pos.clientY
            isPick = true
            pickFigure = 'black_' + name + '_' + (i + 1);
            $('body').on('mousemove', function (move) {
                const mouseX = move.clientX;
                const mouseY = move.clientY;


                $('.figure').css({
                    'pointer-events': 'none',
                    'z-index': 9
                })
                figureClone.css({
                    'z-index': 99999
                })
                figureClone.css({
                    'position': 'fixed',
                    'bottom': ($('body').height() - mouseY) - cellHeight / 2 + 'px',
                    'left': mouseX - cellWidth / 2 + 'px',

                })
            })


        })
        var figurePosLeft = null;
        var figurePosTop = null;


        $('body').on('mouseup', function () {
            figureClone.css({
                'pointer-events': 'auto',
                'position': 'absolute',
                'z-index': 1,
            })
            obrabotchikVozmoznichDvijeni()
            obrabotchikVsehDvijeni()
            kingAttack('black')
            kingIsNotUnderAttack('black', vozmoznieHodi)
            findKingPins(allHodi,'black')
            findKingPins(allHodi,'white')
            //    -----------------------------------------------------------------------------------------------
            if (yourTurn == 'black') {
                if (pickCords[2]) {
                    
                    
                    let nameCords = pickCords[2].split('_')
                    let nameOfFigure = figureName.split('_')



                    if (nameCords[0] == nameOfFigure[0] && nameCords[1] == nameOfFigure[1] && nameCords[2] == nameOfFigure[2]) {
                        

                        if (isPick == true) {
                            
                            
                            $('.cell').each(function (index, element) {
                                var figureCellCordsx = figureClone.attr('class').split(' ')[2][4];
                                var figureCellCordsy = figureClone.attr('class').split(' ')[2][5];
                                
                                if ($(element).attr('id')[2] == pickCords[0] && $(element).attr('id')[3] == pickCords[1]) {
                                    
                                    


                                    if (canIMove(figureCellCordsx, figureCellCordsy, pickCords[1], pickCords[0], nameOfFigure[0], nameOfFigure[1], i, vozmoznieHodi, figureClone)) {
                                        playOnce();

                                        if (!(figureCellCordsx == $(element).attr('id')[2] && figureCellCordsy == $(element).attr('id')[3])) {
                                            // $('.cell' + $(element).attr('id')[2] + $(element).attr('id')[3]).css({
                                            //     'display': 'none'
                                            // });

                                            deletePiece($('.cell' + $(element).attr('id')[2] + $(element).attr('id')[3]))

                                            $(element).attr('class', 'cell' + ' ' + 'cell_black_' + name + '_' + (i + 1))

                                            $('#id' + figureCellCordsx + figureCellCordsy).attr('class', 'cell');/////////////////////////////////////////////////////



                                            figureClone.css({
                                                'left': null,
                                                'bottom': '0px',
                                            })
                                            figureClone.css({

                                                'left': getCell(pickCords[1], 'x') + 'px',
                                                'bottom': getCell(pickCords[0], 'y') + 'px',



                                            })
                                            let x;
                                            if(pickCords[1]==1){
                                                x = 'a';
                                            }else if(pickCords[1]==2){
                                                x = 'b';
                                            }else if(pickCords[1]==3){
                                                x = 'c';
                                            }else if(pickCords[1]==4){
                                                x = 'd';
                                            }else if(pickCords[1]==5){
                                                x = 'e';
                                            }else if(pickCords[1]==6){ 
                                                x = 'f';
                                            }else if(pickCords[1]==7){
                                                x = 'g';
                                            }else if(pickCords[1]==8){
                                                x = 'h';
                                            }
                                            let move = $(`
                                                <div class="move">
                                                    <div class="move-notation">${name[0]}${x}${pickCords[0]}</div>
                                                </div>
                                            `);
                                            $('#rightMoves').append(move);
                                        } else {
                                            figureClone.css({
                                                'left': null,
                                                'bottom': '0px',
                                            })
                                            figureClone.css({

                                                'left': getCell(figureCellCordsy, 'x') + 'px',
                                                'bottom': getCell(figureCellCordsx, 'y') + 'px',



                                            })


                                        }


                                        yourTurn = 'white'
                                        figureClone.attr('class', 'black_' + name + '_' + (i + 1) + ' figure' + ' cell' + pickCords[0] + pickCords[1])
                                    } else {
                                        figureClone.css({
                                            'left': null,
                                            'bottom': '0px',
                                        })
                                        figureClone.css({

                                            'left': getCell(figureCellCordsy, 'x') + 'px',
                                            'bottom': getCell(figureCellCordsx, 'y') + 'px',



                                        })
                                    }

                                }




                            })
                            isPick = false
                        }


                    }

                }


            } else {
                var figureCellCordsx = figureClone.attr('class').split(' ')[2][4];
                var figureCellCordsy = figureClone.attr('class').split(' ')[2][5];
                figureClone.css({
                    'left': null,
                    'bottom': '0px',
                })
                figureClone.css({

                    'left': getCell(figureCellCordsy, 'x') + 'px',
                    'bottom': getCell(figureCellCordsx, 'y') + 'px',



                })

            }
            


            $('body').off('mousemove')


            kingIsNotUnderAttack('white', vozmoznieHodi)
            findKingPins(allHodi,'black')
            findKingPins(allHodi,'white')
        })


        $('#deck').append(figureClone);
    }
}
var vozmoznieHodi = []
var allHodi = []



obrabotchikVozmoznichDvijeni()
obrabotchikVsehDvijeni()



var idCount = 0;
