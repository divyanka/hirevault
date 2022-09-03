(function() {
  "use strict";
  

  
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

/**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

/**
* Header fixed top on scroll
*/
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

let slideIndex = 0;
// showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  console.log(slides.length)
  // console.log(i)
  for (i = 0; i < slides.length; i++) {
  	console.log(i)
    slides[i].style.display = "none";  
  }
  slideIndex++;

  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
console.log(slides[slideIndex-1])
  // slides[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


/**
* about html page redirection
*/
	function appendAboutPage(aboutVar) {
	  var x = document.getElementById(aboutVar).src;
	  console.log("in x", x);
	  // document.getElementById("demo").innerHTML = x;
	}
  let selectAbout = select('#about')
  if(selectAbout){
  	// $("#about").load("about.html"); 
  	document.getElementById('about').src="about.html"
  	// url="/about.html"
  	// appendAboutPage(url);
  	console.log("in about", selectAbout);
  	// $('#about').load('/HireVault_Website/about.html')

  }

// var myCustomScrollbar = document.querySelector('.my-custom-scrollbar');
// var ps = new PerfectScrollbar(myCustomScrollbar);

// var scrollbarY = myCustomScrollbar.querySelector('.ps__rail-y');

// myCustomScrollbar.onscroll = function () {
//   scrollbarY.style.cssText = `top: ${this.scrollTop}px!important; height: 400px; right: ${-this.scrollLeft}px`;
// }
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


$('#emailSubmit').click(function(){
  console.log($('form').serializeArray())
  var contact_data = $('form').serializeArray()
  var mail_dict = {}
  for(var i=0; i<contact_data.length;i++){
    mail_dict[contact_data[i]['name']] = contact_data[i]['value']
  }
  $.ajax({    
    url: "sendemail/",
    dataType: 'json',
    type: "POST",
    data: mail_dict,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
    },
    success: function (result) {
      console.log("result", typeof(result))
    }
  });
});
// function sendEmail(){
//   console.log("send maillll")
// }
// var btn = document.getElementById("emailSubmit");
// btn.addEventListener("click", function() {
//   //Do something here
//   console.log("send maillll")
// }, false);

$("#filters :checkbox").click(function() {
  console.log("hello");
       // $("." + $(this).val()).hide();
      let previousClass = $("." + $(this).val())
       $("#filters :checkbox:checked").each(function(i) {
          
          console.log("iii", i)
          let currentClass = $("." + $(this).val())
                 // $("." + $(this).val()).hide();
                 console.log("previousClass", $(this).val())
                console.log("currentClass", $(this).val())
           previousClass.hide();
           currentClass.show();
           // console.log( $("." + $(this).val()).show())
       });
    });

 function frameURL(value){
  // console.log("in frameURL", value);
  var folder = "../static/portfolio-images/"+value +"/";
  // console.log("final folder path", folder)
  return folder;

 }

function createGrid(rownum, colnum, responseList) {
  console.log("responseList", responseList)
  var imgCnt = 0;
  for(var colIndex = 0; colIndex < colnum; colIndex++) {
      if(responseList[imgCnt] != undefined){
        
        $("#chair").append('<img src="'+responseList[imgCnt]+'" />');
        // $('#row' + rowIndex).append('<div class="col-lg-4 col-md-6 portfolio-item"><img src="' + responseList[imgCnt] + '" class="img-responsive" /></div>');
        imgCnt++;
        console.log("imgCnt", imgCnt)
      }
    }
  // $('#chair').append('<div class="x"></div>')
  // for (var rowIndex = 0; rowIndex < rownum; rowIndex++) {
  //   $('#chair > div.x').append('<div class="row" id="row' + rowIndex + '"></div>');
  //   for(var colIndex = 0; colIndex < colnum; colIndex++) {
  //     if(responseList[imgCnt] != undefined){
  //       console.log("sjjhj", responseList[imgCnt])
  //       $('#row' + rowIndex).append('<div class="col-lg-4 col-md-6 portfolio-item"><img src="' + responseList[imgCnt] + '" class="img-responsive" /></div>');
  //       imgCnt++;
  //     }
  //   }
  // }
};


$("#filters :radio").click(function() {
  var val = this.id;
  var folderPath = frameURL(val)
  // console.log("folderPath in radio", folderPath);
  // var folderPath1 = '/HireVault_Website/static/portfolio-images/sofas/'
//   var xhr = new XMLHttpRequest();
// xhr.open("GET", "./static/images/slides/", true);
// xhr.responseType = 'document';
// console.log("hello in xhr", xhr.responseType);
  // console.log("hello in.....", xhr.status);

// xhr.onload = () => {
//   console.log("hello in.....", xhr.status);
//   if (xhr.status === 0) {
//     var elements = xhr.response.getElementsByTagName("a");
//     for (x of elements) {
//       if ( x.href.match(/\.(jpe?g|png|gif)$/) ) { 
//           let img = document.createElement("img");
//           img.src = x.href;
//           document.body.appendChild(img);
//       } 
//     };
//   } 
//   else {
//     console.log('Request failed. Returned status of ' + xhr.status);
//   }
// }
// xhr.send()
  console.log("hello in radio");
  // var folder = "./static/portfolio-images/slide6.jpg";
  
  // console.log("folder", folder)
    // $(document).ready(function(){

  $.ajax({
    // url : folderPath1 + "3.jpg",
    // url: "../static/portfolio-images/sofas/3.jpg",
    // url:"../portfolio.py",
    // data: {param: "xyz"}, //passing some input here
    url: "gallery",
    data: {'param': val},
    type: "GET",
    // dataType: 'json',
    // contentType: 'application/json; charset=utf-8',
    // beforeSend: function (xhr) {
    //   xhr.overrideMimeType('text/plain; charset=x-user-defined');
    // },
    // contentType: 'application/json; charset=utf-8',
    // crossOrigin: null,
    // success: function (data) {
    success: function (result, textStatus, jqXHR) {
      console.log("result", typeof(result))
      console.log("result-length", result['data'])
      createGrid(2, 3, result['data']);
        // if (result.length < 1) {
        //   console.log("The thumbnail doesn't exist");
        //   return;
        // }
        // var binary = "";
        // // var responseText = jqXHR.responseText;
        // // var responseTextLen = responseText.length;
        // // console.log("responseTextLen", responseTextLen)
        // for (var i = 0; i < result.length; i++) {
        //   binary += String.fromCharCode(result.charCodeAt(i) & 255);
        // }
        // console.log("binary", btoa(binary))
        // $('#chair').html('<img src="data:image/png;base64,'+btoa(binary)+'" />');

        // $("#chair").html('<img src="'+result+'" />');

        // $('#sofa').html('<img src="data:image/png;base64,'+btoa(binary)+'" />');
    //     // that.getView().byId("sofa").setSrc("data:image/png;base64," + btoa(binary));
    //   // if(data){
    //   //   var returnedData =  data;
    //   //   console.log("returnedData", typeof(returnedData));
    //   //   console.log("returnedData", $('#sofa').html())
    //   //     $('#sofa').html('<img src="data:image/png;base64,'+returnedData+'" />');
    //   // }
    //     // console.log("data", data)
    //     // $(data).find("a").attr("href", function (i, val) {
    //     //   console.log("val",val)
    //     //     if( val.match(/\.(jpe?g|png|gif)$/) ) { 
    //     //         $(".portfolio-item").append( "<img src='"+ folder + val +"'>" );
    //     //     } 
    //     // });
    }
}).done((o) => {
   console.log(o)
});
// });
});




})()