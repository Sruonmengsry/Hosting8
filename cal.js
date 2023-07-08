$(document).ready(function(){
    const body = $("body");
    const toggle = $("#toggle");
    const sunIcon = $(".toggle .bxs-sun");
    const moonIcon = $(".toggle .bx-moon");
    const main_cal = $(".main");

    toggle.on("change", () => {     // The onchange event occurs when the value of an HTML element is changed.
        
        if (sunIcon.hasClass("bx bxs-sun")) { // The className property sets or returns an element's class attribute.
            sunIcon.removeClass("bx bxs-sun").addClass("bx bx-sun");
            moonIcon.removeClass("bx bx-moon").addClass("bx bxs-moon");
        } else {
            sunIcon.removeClass("bx bx-sun").addClass("bx bxs-sun");
            moonIcon.removeClass("bx bxs-moon").addClass("bx bx-moon");
        }
                                            // The classList property returns the CSS classnames of an element
        if (body.hasClass("dark")) {        // contains() Returns true if the list contains a class
            body.removeClass("dark");
            main_cal.css('background-color','#a9835d');
        } else {
            body.addClass("dark");
            main_cal.css('background-color', 'rgb(44, 67, 82)');
        } 
        // body.classList.toggle("dark");
        // sunIcon.className = sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
        // moonIcon.className = moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";
    });

    const display = $('#display');
    const buttons = $('.button');
    const specialChars = ['%', '÷', '×', '.', '-', '+', '*', '/'];
    let last = '';
    let number = ['1','2','3','4','5','6','7','8','9'];

    function setupCalculator() {
      buttons.on('click', function() {
        handleInput($(this).text());
      });
    
      $(window).on('keydown', function(e) {
        if ((e.key >= '0' && e.key <= '9') || specialChars.includes(e.key)) 
        {
          handleInput(e.key);
        } 
        else if (e.keyCode === 13) { // check for Enter key by keyCode
          handleInput('=');
        }
        else if (e.keyCode === 8) { // check for Enter key by keyCode
          handleInput('DEL');
        }
        else if(e.keyCode === 46){
          display.text('0');
        }

      });
    }
    
    function handleInput(input) {
      if (specialChars.includes(last) && specialChars.includes(input)) {
        display.text(display.text().slice(0, -1));
      }

      // if (display.text() === '0' && (input !== 0 || input !== number)){
      if (display.text() === '0'){
        if (number.includes(input)) display.text('');
          
        else if(input === '0') {
          display.text(display.text().slice(0, -1));
        }
        else{
          display.text('0');
        }
      } 

      if (display.text() === '' && input === '.') input = '0.';

      if (display.text() === '0.' && input === '.'){
        display.text(display.text().slice(0, -1));
      }

      if (display.text() === 'Error') display.text('');

        switch (input) {
            case 'C':
                display.text('0');
                break;
            case 'DEL':
                if (display.text().length <= 1) display.text('0');
                else{
                  display.text(display.text().slice(0, -1));
                }
                break;
            case '=':
                try {
                    let expression = display.text().replaceAll('÷', '/').replaceAll('×', '*').replaceAll('%', '/100');
                    display.text(eval(expression));
                } catch {
                    display.text('Error');
                }
                break;
            case '+/-': 
                    display.text(display.text() * -1);
                break;
            default:
                    display.css('font-size', '40px')
                if (display.text().length >= 14) { // set the limit to 20 digits
                    display.css('font-size', '30px')
                }
                if (display.text().length >= 22) { // set the limit to 30 digits
                    break;
                }
                
                display.text(display.text() + input);
                  last = input;
                break;
        }
    }
    setupCalculator();
});