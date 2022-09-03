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
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
/**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
    /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
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


function clientImagesfancybox(responseList){
  // Fancybox Config
$('[data-fancybox="gallery"]').fancybox({
  buttons: [
    "slideShow",
    "thumbs",
    "zoom",
    "fullScreen",
    "close"
  ],
  loop: false,
  protect: true,
  autoScale: false
});
   var text = ''
  var imgCnt = 0;
  for(var colIndex = 0; colIndex < responseList.length; colIndex++) {   
       $('.modal-body').append('<a href="'+responseList[imgCnt]+'" data-fancybox="group" data-srcset="large.jpg 1600w, medium.jpg 1200w, small.jpg 640w" data-caption="image"><img class="img-responsive popup" src="'+responseList[imgCnt]+'" width="200" height="200"/>'+'</a>') 
    imgCnt++;
  }
        $('#my-modal').modal('show');

}

function getOurWorkImageData(){
  $.ajax({
    url: "client_gallery",
    data: {'param': 'client-images'},
    type: "GET",
   success: function (result, textStatus, jqXHR) {
      clientImagesfancybox(result['data']);
     }
})
}

$('#ourwork').click(function(){
  $(".modal-body").children("a").remove();
  getOurWorkImageData();
})



$('#emailSubmit').click(function(){
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
    }
  });
});


 function frameURL(value){
  var folder = "../static/portfolio-images/"+value +"/";
  return folder;
 }

function fancybox(responseList, checkedId){
  $("#all").show();
  // Fancybox Config
$('[data-fancybox="gallery"]').fancybox({
  buttons: [
    "slideShow",
    "thumbs",
    "zoom",
    "fullScreen",
    "close"
  ],
  loop: false,
  protect: true
});

  var imgCnt = 0;
  for(var colIndex = 0; colIndex < responseList.length; colIndex++) {   
    $("#all").append('<a href="'+responseList[imgCnt]+'" data-fancybox="group" data-srcset="large.jpg 1600w, medium.jpg 1200w, small.jpg 640w" data-caption="imgg"><img src="'+responseList[imgCnt]+'" width="200" height="200"/>'+'</a>') 
    imgCnt++;
  }
}

getImageData('', ["all-snaps"])
function getImageData(e, listData){
  if(e){
   var val = e.id;
  }else{
    var val = listData[0]
  }
  $("#all").children("a").remove();
  var folderPath = frameURL(val)
  var selected_Id = $('input[type=radio][name=flexRadioDefault]:checked').attr('id');
  $.ajax({
     url: "gallery",
    data: {'param': val},
    type: "GET",
   success: function (result, textStatus, jqXHR) {
      fancybox(result['data'], selected_Id);
     }
}).done((o) => {
});
}

$("#filters :radio").click(function() {
  getImageData(this)
});

$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
 
     autoplay: true,
  rewind: true, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoplayTimeout: 2000,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
  });
});

})()