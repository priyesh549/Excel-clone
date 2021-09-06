$(document).ready(function () {
    let cellContainer = $("input-cell-container");

    for (let i = 1; i <= 100; i++) {
        let ans = ""; // store column data

        let n = i;

        while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                ans = 'Z' + ans;
                n = Math.floor(n / 26) - 1;
            }
            else {
                ans = String.fromCharCode(rem - 1 + 65) + ans;
                n = Math.floor(n / 26);
            }
        }

        let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
        $(".column-name-container").append(column);
        let row = $(`<div class="row-name id="rowId-${i}">${i}</div>`);
        $('.row-name-container').append(row);
    }


    for (let i = 0; i <= 100; i++) {
        let row = $(`<div class="cell-row"></div>`);
        for (let j = 1; j <= 100; j++) {
            let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
            let column = $(`<div class="input-cell" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"></div>`);
            row.append(column);
        }
        $(".input-cell-container").append(row);
    }


    // for selecting align-icon
    $(".align-icon").click(function () {
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected")
    });

    // for selecting any style-icon using toggle class
    $(".style-icon").click(function () {
        $(this).toggleClass("selected");
    });

    // for selecting any input cell
    // imporvising click function
    $(".input-cell").click(function (event) {
        // adding ctrl key function will check in event
        if (event.ctrlKey) {
            // we should know our place first i.e. -> id(row,col details)
            // this represents current detail
            let [rowId, colId] = getRowCol(this);
            if (rowId > 1) {
                let topCellSelected = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
                if (topCellSelected) {
                    // In this we will give the current property -> border:none
                    $(this).addClass("top-cell-selected");
                    // the one which we has selected must have orignal colour
                    $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom-cell-selected");
                }
            }
            if (rowId < 100) {
                let bottomCellSelected = $(`#row-${rowId + 1}-col-${colId}`).hasClass("selected");
                if (bottomCellSelected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowId + 1}-col-${colId}`).addClass("top-cell-selected");
                }
            }
            if (colId > 1) {
                let leftCellSelected = $(`#row-${rowId}-col-${colId - 1}`).hasClass("selected");
                if (leftCellSelected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowId}-col-${colId - 1}`).addClass("right-cell-selected");
                }
            }
            if (colId < 100) {
                let rightCellSelected = $(`#row-${rowId}-col-${colId + 1}`).hasClass("selected");
                if (rightCellSelected) {
                    $(this).addClass("right-cell-selected");
                    $(`#row-${rowId}-col-${colId + 1}`).addClass("left-cell-selected");
                }
            }
            $(this).addClass("selected");
        }
        else {
            // for single selection without control key
            $(".input-cell.selected").removeClass("selected");
            $(this).addClass("selected");
        }
    });


    // making content editable in input-cell
    $(".input-cell").dblclick(function () {
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true")
        $(this).focus();
    });

    $(".input-cell").blur(function(){
        $(this).attr("contenteditable","false");
    })

    // adding scroll properties to column and row
    $(".input-cell-container").scroll(function () {
        // for column
        $(".column-name-container").scrollLeft(this.scrollLeft);
        // for row
        $(".row-name-container").scrollTop(this.scrollTop);
        // there is no right or bottom property
    })

    
    // adding bold,italic,underline properties
    function updateCell(property, value) {
        // traversing on complete part
        $(".input-cell.selected").each(function(){
            $(this).css(property,value);
        })
    }
    
    $(".icon-bold").click(function(){
        if($(this).hasClass("selected")){
            updateCell("font-weight","");
        }
        else{
            updateCell("font-weight","bold")
        }
    })
    $(".icon-italic").click(function(){
        if($(this).hasClass("selected")){
            updateCell("font-style","");
        }
        else{
            updateCell("font-style","italic")
        }
    })
    $(".icon-underline").click(function(){
        if($(this).hasClass("selected")){
            updateCell("text-decoration","");
        }
        else{
            updateCell("text-decoration","underline")
        }
    })
})







function getRowCol(ele) {
    // attributes should be pass in string
    let idArray = $(ele).attr("id").split("-");
    let rowId = parseInt(idArray[1]);
    let colId = parseInt(idArray[3]);
    return [rowId, colId];
}


