var CandyCrushGame = function() {
    var grid = document.querySelector('.grid');
    var width = 8;
    var score = 0;

    //CREATE A BLANK ARREY FOR DRAGGABLE DIVS
    var squareArrey = [];

    //CREATE CANDY COLORS ARREY 
    var candyColorsArrey = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ];

    //CREATE GAMEBOARD Function
    function gameboard() {
        //SET LOOP FOR CREATE SQUERS
        for (var i = 0; i < width * width; i++) {
            //CREATE SQUERS 
            var square = document.createElement('div');
            //MAKE DRAGGABLE TO ALL SQUER DIV
            //SET ATTRIBUTE 
            square.setAttribute('draggable', 'true');

            //SET ID IN ALL DRAGGABLE SQUERS FROM LOOP
            square.setAttribute('id', i);

            //APPEND MY ALL DRAGGABLE DIVS IN GRID 
            grid.appendChild(square);

            //ADD ALL SQUER in SQUAREARREY by PUSH METHOD
            squareArrey.push(square);

            //CREATE RANDOM COLORS FROM MY candyColorsArrey
            var randomColors = Math.floor(Math.random() * candyColorsArrey.length);

            //ADD BACKGROUND COLOR IN MY ALL DRAGGABLE DIV
            square.style.backgroundImage = candyColorsArrey[randomColors];

        }
    }
    gameboard(); //CREATE GAMEBOARD COMPLETED


    //ADD DRAG EVENT IN ALL SQUER DIVS
    squareArrey.forEach(square => square.addEventListener('dragstart', dragStartCandy));
    squareArrey.forEach(square => square.addEventListener('dragend', dragEndCandy));
    squareArrey.forEach(square => square.addEventListener('dragover', dragOverCandy));
    squareArrey.forEach(square => square.addEventListener('dragenter', dragEnterCandy));
    squareArrey.forEach(square => square.addEventListener('drageleave', dragLeaveCandy));
    squareArrey.forEach(square => square.addEventListener('drop', dragDropCandy));


    //CREATE VARIABLE FOR DRAG AND REPLACE MY SELECT CANDY 
    var colorSelectDraged;
    var colorSelectReplaced;
    var squareIdDraged;
    var squareIdReplaced;


    function dragOverCandy(e) {
        e.preventDefault();
    }

    function dragEnterCandy(e) {
        e.preventDefault();
    }


    //ADD DRAG START FUNCTION 


    function dragStartCandy() {
        //ACCESS BACKGROUND COLOR OF SELECTED DIV 
        colorSelectDraged = this.style.backgroundImage

        //ACCESS SELECT ID AND CONVERT IN TO INT
        squareIdDraged = parseInt(this.id);
    }


    function dragLeaveCandy() {

        this.style.backgroundImage = 'white';
    }

    //FUNCTION FOR DROP MY CANDY 
    function dragDropCandy() {
        //ACCESS ALL DIV BACKGROUND COLOR  WHERE WE DROP MY CANDY AND STORE IN COLORSELECTREPLACE
        colorSelectReplaced = this.style.backgroundImage;

        //ACCESS ALL DIV ID  WHERE WE DROP MY CANDY AND STORE IN squareIdReplaced AND CONVERT IN TO PARSE
        squareIdReplaced = parseInt(this.id)

        //REPLACED BACKGROUND COLOR BITWEEN TO SELECTED CANDY AND DROP CANDY
        this.style.backgroundImage = colorSelectDraged;

        //ADD MY SELECTED CANDY ID IN SQUAREARREY AND SET STYLE FOR REPLACED BACKGROUND COLOR INTO DROP CANDY TO SELECTED CANDY
        squareArrey[squareIdDraged].style.backgroundImage = colorSelectReplaced;
    }

    //Function FOR DRAG END MY CANDY 
    function dragEndCandy() {
        //CREATE ARREY  AND ADD SELECTED CANDY  ID AND SELECTED CANDY WIDTH 
        var validMoves = [squareIdDraged - 1, squareIdDraged - width, squareIdDraged + 1, squareIdDraged + width];


        var validSingleMove = validMoves.includes(squareIdReplaced);
        //console.log(validSingleMove);

        //CREATE IF STATEMENT FOR ID SQUAIDREPLACED AND VALIDSINGLEMOVE IS OK 
        if (squareIdReplaced && validSingleMove) {

            squareIdReplaced = null;

        } else if (squareIdReplaced && !validSingleMove) {
            squareArrey[squareIdReplaced].style.backgroundImage = colorSelectReplaced;
        } else {
            squareArrey[squareIdReplaced].style.backgroundImage = colorSelectDraged;
        }

    }

    //drop candies once some have been cleared
    function moveIntoSquarebelow() {
        for (i = 0; i < 55; i++) {
            if (squareArrey[i + width].style.backgroundImage === '') {
                squareArrey[i + width].style.backgroundImage = squareArrey[i].style.backgroundImage;
                squareArrey[i].style.backgroundImage = "";
                var firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                var isfirstRow = firstRow.includes(i)
                console.log(isfirstRow);
                if (isfirstRow && (squareArrey[i].style.backgroundImage === "")) {
                    var randomColors = Math.floor(Math.random() * candyColorsArrey.length);
                    squareArrey[i].style.backgroundImage = candyColorsArrey[randomColors]
                }

            }
        }
    }


    //CREATE Function FOR MATCHES CANDY 
    //FOUR CANDY MATCHES
    function chekMatchesCandy() {

        //CREATE LOOP FOR MATCHES
        for (var i = 0; i < 60; i++) {

            //CREATE FOR  CANDIES MATCHES 
            var rowoffour = [i, i + 1, i + 2, i + 3];

            //SELECTED CANDIES BACKGROUND COLOR STORE IN VARIABLE
            var decidedColor = squareArrey[i].style.backgroundImage

            //CREATE NEW VARIABLE ISBLANK FOR CHACK BLANK BACKGROUND IMAGE IN SELECTED CANDY 
            const isBlank = squareArrey[i].style.backgroundImage === '';

            //CREATE A NEW ARREY  FOR INVALID MATCHES &  ADD SOME NUMBER IN DEFFRENCE BITWEEN 4  
            var notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

            //CRAETE IF STATEMENT FOR  MATCHES
            if (notValid.includes(i)) continue

            //CRAETE ONE MORE IF STATEMENT FOR VALID MOVES
            if (rowoffour.every(index => squareArrey[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                showScore.innerHTML = score;
                rowoffour.forEach(index => {
                    squareArrey[index].style.backgroundImage = '';
                })
            }
        }
    }
    chekMatchesCandy()

    //for column of Four
    function checkColumnForFour() {
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squareArrey[i].style.backgroundImage
            const isBlank = squareArrey[i].style.backgroundImage === ''

            if (columnOfFour.every(index => squareArrey[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                showScore.innerHTML = score;
                columnOfFour.forEach(index => {
                    squareArrey[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkColumnForFour()

    //for row of Three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squareArrey[i].style.backgroundImage
            const isBlank = squareArrey[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squareArrey[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                showScore.innerHTML = score;
                rowOfThree.forEach(index => {
                    squareArrey[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkRowForThree()

    //for column of Three
    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2]
            let decidedColor = squareArrey[i].style.backgroundImage
            const isBlank = squareArrey[i].style.backgroundImage === ''

            if (columnOfThree.every(index => squareArrey[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                showScore.innerHTML = score;
                columnOfThree.forEach(index => {
                    squareArrey[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkColumnForThree()




    // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
    window.setInterval(function() {
        chekMatchesCandy();
        checkColumnForFour()
        moveIntoSquarebelow();
        checkRowForThree()
        checkColumnForThree()


    }, 100)



}
CandyCrushGame();